from django.shortcuts import render

# Create your views here.
from rest_framework.mixins import Response
from rest_framework.views import APIView
from .testBert import Classification

import os
import proj4_Django.QAModule.qaBase as qa
import proj4_Django.Recommendation.code.chatbox2 as cb
from .models import Bankqa


def response_success_200(res={}):
    """
    返回请求成功
    :param data_dict:
    :return: response(dict)
    """
    response = dict()
    response['msg'] = '请求成功'
    response['result'] = res
    response['code'] = 200
    return Response(response, status=200)


def response_failed_400():
    """
    返回请求失败
    :return: response(dict)
    """
    response = dict()
    response['msg'] = '请求参数错误'
    response['result'] = dict()
    response['code'] = 400
    return Response(response, status=400)


class DialogManager(object):
    def __init__(self):

        self.answerer = qa.Answerer(Bankqa)
        self.rulebase = cb.solution()

    def getResponse(self,sentence):
        success = False
        retry = 0
        titles = responses = sims = []
        # rb_res = self.rulebase.recommend(sentence,1)
        # print("[Debug]rb_res:",rb_res)
        while not success and retry < 3:
            # try:
                titles, responses, sims = self.answerer.getResponse(sentence)
                success = True
            # except Exception as ex:
            #     print("[Debug]:",ex)
            #     print("[Network Error]:Connect to SQL ERROR -- Retry {}/3".format(retry + 1))
            #     retry += 1

        return titles, responses, sims

dm = DialogManager()
print ("[DEBUG]:Response_",dm.getResponse("I want to find my favorite product"))


class sendResponse(APIView):
    def post(self, request):
        utterance = request.data['content']
        titles, responses, sims = dm.getResponse(utterance)
        res = responses[0] if responses else "Sorry, I don't understand what you mean "
        return response_success_200(res)

def writeFile(filePath, file):
    with open(filePath, "wb") as f:
        if file.multiple_chunks():
            for content in file.chunks():
                f.write(content)
        else:
            data=file.read() ###.decode('utf-8')
            f.write(data)

class receiveUploadedExcel(APIView):
    def post(self,request):
        if request.method == "POST":
            fileDict = request.FILES.items()
            # 获取上传的文件，如果没有文件，则默认为None
            if not fileDict:
                return Response({'msg': 'no file upload'})
            for (k, v) in fileDict:
                print("dic[%s]=%s" % (k, v))
                fileData = request.FILES.getlist(k)
                for file in fileData:
                    fileName = file._get_name()
                    filePath = os.path.join('uploadFile/', fileName)
                    print('filepath = [%s]' % filePath)
                    try:
                        writeFile(filePath, file)
                        Classfi = Classification(filePath)
                        Classfi.run_process()
                    except  Exception as e:
                        print(e)
                        return response_failed_400('file write failed')
            return response_success_200('success')

