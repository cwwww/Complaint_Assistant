import pandas as pd 
import os
import numpy as np
from PyDictionary import PyDictionary

def getSingleProductMap(path):
	print(path)
	s = getSynonym()
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
		final = s.run(listt)
		dic[name] = final

	return dic

def getAllProductMap(path):
	products = os.listdir(path)
	dic = {}
	for product in products:
		product_path = path + product
		print(product_path)
		product_name = product.split('.')[0]
		if not os.path.isfile(product_path):
			continue
		dic[product_name] = getSingleProductMap(product_path)
	return dic

class getSynonym():
	def __init__(self):
		self.dictionary=PyDictionary()

	def run(self,array):
		ans = set()
		for a in array:
			print(a)
			if len(a.split()) > 1:
				ans.add(a)
			else:
				if self.dictionary.synonym(a):
					ans = ans.union(set(self.dictionary.synonym(a)))
				else:
					ans.add(a)
		return list(ans)


root_path = '../final/'
dic = getAllProductMap(root_path)
for key,value in dic.items():
	print(key)
	dataframe = pd.DataFrame.from_dict(value,orient='index')
	out_path = '../aspect_data/' + key + '.csv'
	dataframe.to_csv(out_path,sep=',')

