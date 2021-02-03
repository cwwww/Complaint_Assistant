from get_aspect import getAspect
import pandas as pd
import os
import numpy as np


class getDataset():
	def __init__(self):
		self.df = pd.read_csv('../data/consumer_complaints.csv')
		self.df = self.df[(self.df['consumer_complaint_narrative'].notnull())]

		root_path = '../aspect_data/'
		self.ss = getAspect(root_path)
		self.map = self.getAllProductMap(root_path)


		for index, row in self.df.iterrows():
			company = row['company']
			complaint = row['consumer_complaint_narrative']
			product = row['product']
			product = "_".join(product.split())

			aspects = self.ss.run(product,complaint)
			if aspects:
				for aspect in aspects:
					if company not in self.map[product][aspect].keys():
						self.map[product][aspect][company] = 0
					self.map[product][aspect][company] += 1


	def getResult(self,product,aspects,num):
		product = "_".join(product.split())
		product_map = self.map[product]
		temp = {}
		for aspect in aspects:
			aspect_dic = product_map[aspect]
			for k,v in aspect_dic.items():
				if k not in temp.keys():
					temp[k] = 0
				temp[k] += v

		ans = sorted(temp.items(),key=lambda k:k[1])
		final = [a[0] for a in ans[:num]]
		return final

	def getProduct(self):
		return list(self.map.keys())

	def getAspectName(self,product):
		product = "_".join(product.split())
		return list(self.map[product].keys())


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

	def getSingleProductMap(self,path):
		df = pd.read_csv(path)
		df_T = df.T 
		names = np.array(df_T[0:1]).tolist()[0]
		dic = {}
		for i in range(len(names)):
			name = names[i]
			dic[name] = {}
		return dic


s = getDataset()
print(s.getProduct())
print(s.getAspectName('Debt collection'))
print(s.getResult('Debt collection',['privacy','False statements'],3))




