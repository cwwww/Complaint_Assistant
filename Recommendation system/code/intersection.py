import os
import pandas as pd 

root_path = '../result/'
products = os.listdir(root_path)

def read_single_csv(path):
	df = pd.read_csv(path)
	name = df.columns.tolist()[0]
	df_set = set(df[name].tolist())
	return df_set,name


for product in products:
	product_path = root_path + product + '/'
	if not os.path.isdir(product_path):
		continue
	issues = os.listdir(product_path)
	files = []
	names = []
	new = []
	for issue in issues:
		issue_path = product_path + issue
		if not os.path.isfile(issue_path):
			continue
		df_set,name = read_single_csv(issue_path)
		files.append(df_set)
		names.append(name)
	
		for i in range(len(files)):
			all_s = set()
			for j in range(len(files)):
				if i == j:
					continue
				inter = files[i] & files[j]
				all_s = all_s | inter
			new.append(files[i] - all_s)

		dic = {}
		for i in range(len(new)):
		  dic[names[i]] = new[i]
		dataframe = pd.DataFrame.from_dict(dic,orient='index')
		product_str = "_".join(product.replace('/','').split())
		out_path = product_path + product_str + '.csv'
		dataframe.to_csv(out_path,sep=',')



