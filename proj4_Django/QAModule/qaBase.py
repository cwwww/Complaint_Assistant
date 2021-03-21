# coding=utf-8

import json
import logging
import os

from .match import *
from .responsesEvaluate import Evaluator


class Answerer(object):

    def __init__(self,bankqa):

        self.general_questions = []

        self.path = os.path.dirname(__file__)
        self.bankqa = bankqa
        self.qList = list(self.bankqa.objects.values_list("question"))
        self.matcher = getMatcher(titles=self.qList,matcherType="bm25")
        # self.fuzzy_matcher = getMatcher(titles=qlist,matcherType="Fuzzy")

        self.evaluator = Evaluator()
        print("[Debug]:Answerer initialized")



    def getResponse(self, sentence, api_key=None):

        if api_key is None:
            # response = self.getGeneralQA(sentence)
            response = self.getGeneralQA_SQL(sentence)
        else:
            response = self.getCustomQA(sentence,api_key)
        return response

    def getGeneralQA(self,query,threshold=0):

        titles,indexes = self.matcher.match(query)
        
        # print('title: ',titles," index: ",indexes)

        sims = self.matcher.getSimilarity()

        if sims[-1] < threshold:
            return None,None,[0]
        else:
            replies=[]
            for index in indexes:
                res = json.load(open(os.path.join(self.path+"/data/processed/reply",str(int(index/1000))+'.json'),
                                'r',encoding='utf-8'))
                targetId = index % 1000
                candiates = self.evaluator.getBestResponse(res[targetId],topk=10)
                # print("candidate list: ",candiates)
                reply = self.randomPick(candiates)
                replies.append(reply)
            # print("QA reply: ",reply)
            # print("sim in getResponse: ", sims)
            return titles,replies,sims

    def getGeneralQA_SQL(self, query, threshold=0):
        print("query in getQA:",query)
        titles, indexes = self.matcher.match(query)

        print('title: ', titles, " index: ", indexes)
        sims = self.matcher.getSimilarity()

        if sims[-1] < threshold:
            return None, None, [0]
        else:
            replies = []
            for title in titles:
                try:
                    candiates = self.bankqa.objects.get(question=title)
                    print("candidate list: ",candiates)
                    # reply = self.randomPick_SQL(candiates)
                    reply = candiates.answer
                    replies.append(reply)
                except Exception as e:
                    print("[Debug]GetQA:",e)
            # print("QA reply: ",reply)
            # print("sim in getResponse: ", sims)
            return titles, replies, sims

    def randomPick(self, answers):

        try:
            answer = answers[random.randrange(0,len(answers))][0]
        except:
            answer = None
        return answer

    def randomPick_SQL(self, answers):

        try:
            answer = answers[random.randrange(0, len(answers))]
        except:
            answer = None
        return answer

    def getCustomQA(self, sentence, api_key, threshold=50):

        #TODO GET USER'S QA BY api_key
        #FIXME REPLACE TESTING DATA TO FORMAL ONE(GET BY DATABASE).
        #i.e IMPLEMENT getUserQA(api_key)
        #customqa_list = json.loads(getUserQA(api_key))

        data = '[{"question": "你好吗?","answers": ["很好","不太好"]},{"question": "吃饱了没?","answers": ["正要吃","刚吃饱"]}]'
        customqa_list = json.loads(data)

        # Load question to a list.
        q_list = [qa["question"] for qa in customqa_list]

        #TODO 1.  customized threshold.

        #NOTICE: Always choose fuzzy matcher for custom matching.
        title,index = self.fuzzy_matcher.match(sentence,custom_title=q_list)
        sim = self.fuzzy_matcher.getSimilarity()
        if sim < threshold:
            return None,0
        return customqa_list[index]["answers"][random.randrange(0,len(customqa_list[index]["answers"]))],sim
