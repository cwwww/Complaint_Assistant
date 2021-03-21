import numpy as np
import pandas as pd
import nltk
import string
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from copy import deepcopy
from itertools import combinations
import os
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

class getAspect():
	def __init__(self,path):
		self.Aspect_dic = self.getAllProductMap(path)
		parent_dir = os.path.split(os.path.dirname(__file__))[0]
		self.contractions = pd.read_json(parent_dir+'/data/contractions.json', typ='series')

	def getMap(self):
		return self.Aspect_dic

	def getSingleProductMap(self,path):
		df = pd.read_csv(path)
		df_T = df.T 
		names = np.array(df_T[0:1]).tolist()[0]
		df_T.columns = names
		df_T = df_T[1:]

		dic = {}
		for i in range(len(names)):
			name = names[i]
			listt = df_T[name].tolist()
			listt = [a_ for a_ in listt if a_ == a_]
			dic[name] = listt
		return dic

	def getAllProductMap(self,path):
		products = os.listdir(path)
		dic = {}
		for product in products:
			product_path = path + product
			product_name = product.split('.')[0]
			if not os.path.isfile(product_path):
				continue
			dic[product_name] = self.getSingleProductMap(product_path)
		return dic

	def removeNumbers(self,item):
		res = ''.join([i.lower() for i in item if not i.isdigit()])
		item = res
		return item

	def removePunctuationsExpressions(self,item):
		exclude = set(string.punctuation)
		item = ''.join(ch for ch in item if ch not in exclude)
		return item

	def removeContractions(self,item):
		contractred = item.split()
		new_text = []
		for word in contractred:
			if word in self.contractions:
				new_text.append(self.contractions[word])
			else:
				new_text.append(word)
		item = " ".join(new_text)
		return item

	def review_cleanup_symbols(self,review_sentences):
		"""
		正则匹配
		"""
		reg_exp_main = re.compile('[^A-Za-z0-9^\n^\.^\"^\'^\- ]+', re.IGNORECASE | re.DOTALL)
		review_filtered_main = re.sub(reg_exp_main, '', review_sentences)
		reg_exp_next = re.compile('x+')
		review_filtered_main = re.sub(reg_exp_next, '', review_filtered_main)
		return review_filtered_main

	def lemm(self,sentence):
		lemmatizer = WordNetLemmatizer()
		sentence_after_lemmatization = []
		for words in sentence.split():
		    lemma_word = lemmatizer.lemmatize(words)
		    sentence_after_lemmatization.append(lemma_word)
		return ' '.join(sentence_after_lemmatization)

	def run(self,product,complaint):
		product_dic = self.Aspect_dic[product]
		ans = set()

		complaint = self.removeNumbers(complaint)
		complaint = self.removePunctuationsExpressions(complaint)
		complaint = self.removeContractions(complaint)
		complaint = self.review_cleanup_symbols(complaint)
		complaint = self.lemm(complaint)

		for k,v in product_dic.items():
			for tok in complaint.split():
				if tok in v:
					ans.add(k)

		return list(ans)

'''
product = 'Debt collection'
product = "_".join(product.split())
complaint = "I have contacted the collection company many times but they are failed to provide necessary documentation that will prove that this account is mine. Please remove this account on my credit report because it's affecting my credit score." 
root_path = '../aspect_data/'
s = getAspect(root_path)
aspects = s.run(product,complaint)
if not aspects:
	aspects.append('Others')
print(aspects)
'''
