import re
from nltk.corpus import wordnet
import sys,os

# sys.path.append(os.getcwd())
# from get_aspect import getAspect
import pandas as pd
import os
import numpy as np
from .getDataset import *

class solution():
  def __init__(self):
    self.s = getDataset()

  def recommend(self,initial_input,num):
    # get product
    def get_product(user_input):
      # product0 = 'start'
      list_syn_products = show_product()
      for intent, pattern in list_syn_products.items():
        if user_input in pattern:
          product0 = intent

      list_aspects = self.s.getAspectName(product0)
      print("these are the aspects of this product:", list_aspects)
      return product0

    def get_aspect(product, num, user_aspect):
      list_syn_products = show_product()
      for intent, pattern in list_syn_products.items():
        if product in pattern:
          product0 = intent
      if product is None:
        print("please choose the product:")
      else:
        print("The company recommended by the system is:", self.s.getResult(product0, user_aspect, int(num) + 1))

    def show_product():
      # Building a list of Keywords of products
      list_products = self.s.getProduct()
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
      return list_syn_products

    pattern = re.compile('favorite product')
    pattern2 = re.compile('product name')
    pattern3 = re.compile('aspect name')
    match = pattern.search(initial_input)
    match2 = pattern2.search(initial_input)
    match3 = pattern3.search(initial_input)
    while True:
      if match != None:
        results = show_product()
        print(results)
        break
      if match2 != None:
        a = re.findall(r"the product name is (.*).", initial_input)
        product = get_product(a[0].lower())
        break
      if match3 != None:
        pname = re.findall(r"the product you chose is (.*) and", initial_input)
        product_name = pname[0]
        aname = re.findall(r"the aspect name is/are (.*).", initial_input)
        aspect_name = aname[0].split(',')
        get_aspect(product_name,num,aspect_name)
        break
      else:
        return None

s = solution()
# s.recommend('the product you chose is consumer loan and the aspect name is/are unable to pay.',1)
