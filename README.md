# Aspect mining
## 0. structure of this branch

- `./code/`

  - `frequency.py`
  - `get_aspect.py`
  - `getDataset.py`
  - `getFinalAspect.py`
  - `intersection.py`
  - `main.py`

- `./data/`

  a bit huge so i put in into the [google drive](https://drive.google.com/drive/folders/1IxG46eOVxLowdCQvmi_edkQwtpdCYV98?usp=sharing)

  - `consumer_complaints.csv`

    original dataset

  - `contractions.json`

    dictionary to remove contractions

  - `test.csv`

    test dataset

- `./aspect_data/`

  final csv files containing maps between aspects to key words(each product one csv file)

## 1. extract aspects and key words from data

- `main.py`

  对每一类product分别进行aspect mining -- refer to `frequency.py`

  - `frequency.py`
    1. 取出数据集中所有complaints值不为空的行
    2. 对每一个complaint进行去处数字、标点符号、缩写、非单词的处理后，进行lemmization的处理得到最后的文本
    3. 对处理后的文本根据斯坦福的POS tagger找出名词即名词词组
    4. 取出找到的名词/词组里的stopwords
    5. 利用apriori algo找到出现频率高的名词和名词词组（此处频率的阈值选为400）
    6. 最后得到key words（每一类product的每一个aspect有一列key words）

- `intersection.py`

  对每一类product的所有aspect查找交集，然后获得最终每个aspect的key words（原来的key words减去差集）

- `getFinalAspect.py`

  对`intersection.py`得到的结果使用PyDictionary库来找同义词，加入每个aspect的key words中

## 2. given product and complaints, predict aspects

`get_aspect.py`

给定product名称，预测该complaint吐槽了哪些方面

**Use this class as follows:**

```python
product = 'Debt collection'
product = "_".join(product.split())
complaint = "I have contacted the collection company many times but they are failed to provide necessary documentation that will prove that this account is mine. Please remove this account on my credit report because it's affecting my credit score." 

root_path = '../aspect_data/'
s = getAspect(root_path)
aspects = s.run(product,complaint)
if not aspects:
	aspects.append('Others')
print(aspects)
```

## 3. form a product-aspect-dataset map

`getDataset.py`

对数据集中的所有complaints进行预测aspects，每条complaint对应的公司的预测出来的aspects分数➕1，分数越高代表该公司在这个aspect上表现越差。



**Use this class as follows:**

```python
s = getDataset()
print(s.getProduct()) #to get the products in our dataset
print(s.getAspectName('Debt collection')) #to get the aspects of one particular product
print(s.getResult('Debt collection',['privacy','False statements'],3)) #to get the 3(can be changed) best performing companies in specific Aspects of a specific Product
```

