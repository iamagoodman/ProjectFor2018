#!/usr/bin/python
# -*- coding: UTF-8 -*-
import json
import sys
from functools import reduce

data = [{'a':1,'b':2,'c':3,'d':4,'e':5}]

print(data)

data2 = json.dumps(data, sort_keys=True,indent=4,separators=(',', ': '))

print (data2)

# jsonData = "{'a':1,'name':'frank','type':true,'hoby':[{'eat':'水果'}]}"
# jsonData = "{'a':1,'name':'frank','type':true}"
#
# text = json.loads(jsonData)
# 错误滴，不能在最外层用双""
# print text

jsonData = '{"a":1,"b":2,"c":3,"d":4,"e":5,"type":true}'

text = json.loads(jsonData)
print(text)

exa = 'fdsafsafsa'
print (type(exa))

print(type([1,2]))

def Foo(x):
    if (x==1):
        return 1
    else:
        return x+Foo(x-1)

print(Foo(4))

for i in range(1,5):
	for j in range(1,5):
		for k in range(1,5):
			if(i==j) and (j==k) and (i==k):
				print (i, j, k)

for i in sys.argv:
	print (i)
print (sys.path)

for i in 'fuck':
	print (i)

items = [1,2,3,4,5]
squared = []
for i in items:
	squared.append(i*2)

print(squared)

squarad2 = list(map(lambda x:x*3,items))
squarad3 = list(map(lambda x:x**3,items))

print(squarad2)
print(squarad3)

def f1(x):
	return x*2+1
squarad4 = list(map(f1,items))
print(squarad4)


items2 = range(1,10)
items3 = [1,2,3,4,5,6,7,8,9]
print(items2)
def f2(x,y):
	return x+y
result = reduce(f2,items2)
result3 = reduce(f2,items3)
print(result)
print(result3)

zidian = {'one':1,'two':2}

for key in zidian:
	print(key)
	print(zidian[key])