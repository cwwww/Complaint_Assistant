# Importing modules
import re
from nltk.corpus import wordnet
from get_aspect import getAspect
import pandas as pd
import os
import numpy as np
from getDataset import *

s = getDataset()
# Building a list of Keywords of products
list_products = s.getProduct()
list_syn_products = {}
for word in list_products:
  synonyms = []
  name = word.replace("_", " ").lower()
  for syn in wordnet.synsets(word):
    for lem in syn.lemmas():
      # Remove any special characters from synonym strings
      lem_name = re.sub('[^a-zA-Z0-9 \n\.]', ' ', lem.name())
      synonyms.append(lem_name)
  synonyms.append(name)


  list_syn_products[word] = set(synonyms)

print("Welcome. Which product do you prefer?")
print(list_syn_products)


user_input = input("please input the product:").lower()
for intent, pattern in list_syn_products.items():
  if user_input in pattern:
    product = intent


# keywords of aspects
list_aspects = s.getAspectName(product)
print(list_aspects)

#input the aspect
num = input("how many companies do you want?")
user_aspect = list(input("please input your aspect(Spare aspects with commas):").split(","))

print("The company recommended by the system is:",s.getResult(product,user_aspect,int(num)+1))



