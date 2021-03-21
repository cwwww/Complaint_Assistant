# -*- coding: utf-8 -*-
"""
Created on Wed Jan 27 14:21:01 2021

@author: haidai
"""
import numpy as np
import pandas as pd
import torch
from transformers import BertTokenizer
from os import getcwd, chdir
from transformers import BertForSequenceClassification
fpath = getcwd()
chdir(fpath) 

class Bert:

    def __init__(self):
        print('Loading BERT tokenizer...')
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=True)
        
        ##### model parameter path
        self.weight_file = "proj4_Django/model_bert_ft_cola.pth"
        self.model = BertForSequenceClassification.from_pretrained(
                        "bert-base-uncased", 
                        num_labels = 11, 
                        output_attentions = False,
                        output_hidden_states = False, 
                    )
        self.model.load_state_dict(torch.load(self.weight_file,map_location='cpu')['model_state_dict'])
        print(self.model)


    def pre_processing(self,sent):
        attention_masks = []
        encoded_dict = self.tokenizer.encode_plus(
                            sent,                      # Sentence to encode.
                            add_special_tokens = True, # Add '[CLS]' and '[SEP]'
                            max_length = 64,           # Pad & truncate all sentences.
                            truncation = True,
                            padding = 'max_length',
                            return_attention_mask = True,   # Construct attn. masks.
                            return_tensors = 'pt',     # Return pytorch tensors.
                       )
        
        # Add the encoded sentence to the list.    
        input_ids = encoded_dict['input_ids']
        
        # And its attention mask (simply differentiates padding from non-padding).
        attention_masks = encoded_dict['attention_mask']
        # Convert the lists into tensors.
        
        # print(input_ids)
        # print(attention_masks)
        
        return input_ids,attention_masks


##### Init with input file path

class Classification:
    
    def __init__(self,path):
        self.label_dict = {4: 'Debt collection', 6: 'Mortgage', 1: 'Consumer Loan', 3: 'Credit reporting', 
                           2: 'Credit card', 0: 'Bank account or service', 10: 'Student loan', 8: 'Payday loan', 
                           5: 'Money transfers', 7: 'Other financial service', 9: 'Prepaid card'}
        # self.label_dic = 
        self.path = path
        self.df = pd.read_csv(path)[:50]
        print(self.df.head())
        self.bert = Bert()
        
        
    # return output file  path  
    def run_process(self):
        input_ids = []
        input_masks = []
        
        # input_ids, input_masks = zip(*self.df[lambda df: df.columns[-1]].apply(lambda x:self.bert.pre_processing(x)))
        input_ids, input_masks = zip(*self.df['Consumer complaint narrative'].apply(lambda x:self.bert.pre_processing(x)))
        
        print(input_ids[0])
        print(input_masks[0])
        print(len(input_ids))
        self.bert.model.eval()
        preds = []    
        with torch.no_grad():
            for i in range(len(input_ids)):
                outputs = self.bert.model(input_ids[i], token_type_ids=None, attention_mask= input_masks[i])
                logic = outputs[0]
                pred = np.argmax(logic,axis=1).item()
                pred = self.label_dict[pred]
                preds.append(pred)
        self.df['Product'] = preds
        
        output_path = self.path.split('.csv')[0] + '_output.csv'
        self.df.to_csv(output_path,index=False)
        df = pd.read_csv(output_path)
        print(df.head())
        print(output_path)
        return output_path 



##### Init with input file path    
# Classfi = Classification('./data/test_for_class.csv')
# Classfi.run_process()


# df = pd.read_csv('./data/test.csv')['Consumer complaint narrative']
# df.to_csv('./data/test_for_class.csv')
# df = pd.read_csv('./data/test.csv')['Consumer complaint narrative']
# print(df.head())

        # self.label_dic = 

# df = pd.read_csv(fpath+'\\data\\test.csv')[['Product','Consumer complaint narrative']]

# df['Product'] = df['Product'].replace(label_dict)


# test = 'I had   XXXX   XXXX   and  2 i nsurance companies. They should have been communicating with each other to settle the debt.'
# bert = Bert()
# b_input_id, b_input_mask = bert.pre_processing(test)
# print(b_input_mask)

# input_ids = []
# input_masks = []

# input_ids, input_masks = zip(*df['Consumer complaint narrative'].apply(lambda x:bert.pre_processing(x)))
# print(input_ids[0])
# print(input_masks[0])
# print(len(input_ids))
# for text in df['Consumer complaint narrative']  :
#        ids,masks = bert.pre_processing(text)
#        input_ids.append(ids)
#        input_masks.append(masks)
    
# bert.model.eval()

# with torch.no_grad():
#     outputs = bert.model(b_input_id, token_type_ids=None, attention_mask= b_input_mask)
#     logic = outputs[0]
    
# label_dict = dict((v,k) for k,v in label_dict.items())    
# pred = np.argmax(logic,axis=1).item()
# print(pred)
# print(label_dict[pred])
# preds = []    
# with torch.no_grad():
#     for i in range(len(input_ids)):
#         outputs = bert.model(input_ids[i], token_type_ids=None, attention_mask= input_masks[i])
#         logic = outputs[0]
#         label_dict = dict((v,k) for k,v in label_dict.items())    
#         pred = np.argmax(logic,axis=1).item()
#         preds.append(pred)

# from sklearn.metrics import classification_report
# true = df['Product'].values
# target_names = ['Bank account or service', 'Consumer Loan', 
#                 'Credit card','Credit reporting','Debt collection','Money transfers','Mortgage','Other financial service',
#                 'Payday loan','Prepaid card','Student loan']

# print(classification_report(true, preds, target_names=target_names))


