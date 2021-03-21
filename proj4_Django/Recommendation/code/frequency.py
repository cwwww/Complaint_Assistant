import numpy as np
import pandas as pd
import nltk
import string
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from copy import deepcopy
from itertools import combinations
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

class getAspect():
	def __init__(self):
		self.contractions = pd.read_json('../data/contractions.json', typ='series')
		self.df = pd.read_csv('../data/consumer_complaints.csv')

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

	def stanford_pos_tagging(self,sentence):   
		pos_value = []
		toks = nltk.word_tokenize(sentence)
		return nltk.pos_tag(toks)

	def filter_stopwords(self,candidate_aspect_list):
		stop_words = set(stopwords.words('english'))
		new_list = ('(', ')', '.', '-', '--', '``', "'", '"', "ha", "wa", "lot")
		stop_words.update(new_list)
		aspect_list_without_stopwords = []
		for item in candidate_aspect_list:
			product_aspect = []
			for w in item:
				if w not in stop_words and w != '' and len(w) > 1:
					product_aspect.append(w)
			if product_aspect:
				aspect_list_without_stopwords.append(product_aspect)
		return aspect_list_without_stopwords

	def generate_1_itemset(self,items_in_transaction):
		C_1 = {}
		for item in items_in_transaction:
			if item not in C_1.keys():
				C_1[item] = items_in_transaction.count(item)
		return C_1

	def prune(self,candidate_aspect_list, min_sup):
		l_k = deepcopy(candidate_aspect_list)
		for key, value in list(l_k.items()):
			if value < min_sup:
				del l_k[key]
		return l_k

	def generate_2_itemset(self,L):
		C_2 = []
		for i in combinations(L, 2):
			C_2.append(list(i))
		return list(C_2)

	def scan_in_database(self,Ct):
		current_candidate = {}
		transaction = self.nouns_list_per_sentence
		for each_Ct in Ct:
			for itm in transaction:
				item = set(itm.split(','))
				if set(each_Ct).issubset(item):
					if str(each_Ct) not in current_candidate.keys():
						current_candidate[str(each_Ct)] = 1
					else:
						current_candidate[str(each_Ct)] += 1
		return current_candidate


	def asr_apriori_itemset(self):
		Lk = {}
		items_in_transaction = []
		frequent_itemsets = []
		frequent_itemsets_k = []

		number_of_sentences = len(self.raw['lemm'].tolist())

		min_sup = round(0.01*number_of_sentences)

		transaction = self.nouns_list_per_sentence
		for itm in transaction:
			for each_item in itm.split(','):
				items_in_transaction.append(each_item)

		C1 = self.generate_1_itemset(items_in_transaction)
		L1 = self.prune(C1, min_sup)
		if L1 != '':
			for key,value in L1:
				frequent_itemsets.append(key)


		C2 = self.generate_2_itemset(L1)
		Ct2 = self.scan_in_database(C2)
		Lk[2] = self.prune(Ct2, min_sup)
		if Lk[2] != '':
			for key, value in Lk[2].items():
				fq_item = str(key).strip('')
				freq_item = eval(fq_item)
				insert_value = ' '.join(freq_item)
				frequent_itemsets_k.append(insert_value)
		return frequent_itemsets,frequent_itemsets_k


	def run(out_path,product_name,aspect_name):
		#############read data#############
		
		complaints = self.df[(self.df['consumer_complaint_narrative'].notnull())][self.df['product']==product_name][self.df['issue']==aspect_name]['consumer_complaint_narrative']
		self.raw = complaints.to_frame('raw')
		#############pre processing#############

		'''remove digits'''
		self.raw['removeDigits'] = self.raw['raw'].apply(self.removeNumbers)

		'''remove punctation'''
		self.raw['removePunctuation'] = self.raw['removeDigits'].apply(self.removePunctuationsExpressions)

		'''remove contraction'''
		self.raw['removeContraction'] = self.raw['removePunctuation'].apply(self.removeContractions)

		'''remove redandunt characters'''
		self.raw['removeCharacter'] = self.raw['removeContraction'].apply(self.review_cleanup_symbols)

		'''lemmization'''
		self.raw['lemm'] = self.raw['removeCharacter'].apply(self.lemm)

		#############noun phase#############
		#JJ(形容词) NN(名词)
		chunk_reg_express = r"""NP: {<JJ>*<NN.*>}"""  
		chunk_parsar = nltk.RegexpParser(chunk_reg_express)

		noun_list_after_chunk = []

		for t in text:
			pos_tagged_content = self.stanford_pos_tagging(t)
			pos_tagged_list = eval(str(pos_tagged_content))

			chunked = chunk_parsar.parse(pos_tagged_list)

			noun_list_per_sentence = []

			for subtree in chunked.subtrees(filter=lambda chunk_label: chunk_label.label() == 'NP'): 
				noun_list_per_sentence.append(" ".join(word for word, pos in subtree.leaves() if word not in noun_list_per_sentence))

			if noun_list_per_sentence:
				noun_list_after_chunk.append(noun_list_per_sentence)

		#############filter stopwords#############
		aspect_candidates = filter_stopwords(noun_list_after_chunk)

		#############aspect candidates#############
		self.nouns_list_per_sentence = []

		for noun_set in aspect_candidates:
			if noun_set != '':
				nouns_in_sent = ''
				index = 0
				for noun in noun_set:
					if index != len(noun_set)-1:
						nouns_in_sent += noun + ','
						index += 1
					else:
						nouns_in_sent += noun
				self.nouns_list_per_sentence.append(nouns_in_sent)

		candidate_aspects = []

		for can_asp in aspect_candidates:
			if can_asp:
				for cand_asp in can_asp:
					candidate_aspects.append(cand_asp)

		#############Apriori algorithm#############
		frequent_itemsets,frequent_itemsets_k = self.asr_apriori_itemset()

		#############final candidates#############
		candidate_aspects_final = []
		for freq_1_item in frequent_itemsets:
			if freq_1_item not in candidate_aspects_final:
				candidate_aspects_final.append(freq_1_item)

		for freq_k_item in frequent_itemsets_k:
			if freq_k_item not in candidate_aspects_final:
				candidate_aspects_final.append(freq_k_item)

		#reomve some unfrequent phases
		feature_list_after_processing = []
		feature_phase = []
		feature_count_in_dict = {}

		for feature in candidate_aspects_final:
			word_in_noun_phrase = feature.split()
			if len(word_in_noun_phrase) > 1:
				feature_phase.append(feature)
			else:
				feature_list_after_processing.append(feature)

		for fp in feature_phase:
			i = 0
			for sentences in self.raw['lemm'].to_list():
				word_index_dict = {}
				for fp_word in fp.split():
					for index, word in enumerate(sentences.split()):
						if word == fp_word:
							word_index_dict[fp_word] = index

				if len(word_index_dict) > 1 and len(fp.split()) == len(word_index_dict):
					list_form = list(word_index_dict.values())
					previous_value = (list_form[0])
					current_value = (list_form[1])
					if current_value - previous_value < 2:
						i += 1
				else:
					i += 0

			if feature_count_in_dict.keys() != fp:
				feature_count_in_dict[fp] = i

		for key, value in feature_count_in_dict.items():
			if value > 400:
				feature_list_after_processing.append(key)

		#############save file#############
		dataframe = pd.DataFrame({aspect_name:feature_list_after_processing})
		product_name_str = "_".join(product_name.split())
		aspect_name_str = "_".join(aspect_name.split())
		out_name = out_path + aspect_name_str + '.csv'
		dataframe.to_csv(out_name,index=False,sep=',')
		print('done.')

