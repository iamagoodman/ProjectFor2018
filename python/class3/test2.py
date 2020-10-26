import math
import random
# import modf
# print(math)
# print(max(1,2,3))
# print(math.modf(3.4))
# print(math.pow(2,3))
# print(round(3.54654,3))
# print(math.sqrt(9))
# print(random.choice(range(0,10)))
# print(random.choice([3,4,5,6,7,9,0]))
# print(random.random())
# print(random.randrange(0,10,2))
# a = [1,2,3,4,5,6]
# random.shuffle(a)
# print(a)
#
# list1 = [1,2,3]
# list2 = [4,5,6]
# list1.extend(list2)
# print(list1)
# a.sort()
# print(a)
#
# b = {'a':1,'b':2,'c':{'d':'fdsafdsa','e':{'f':'1232'}}}
# print(b)
# b.clear()
# print(b)
# c = b.copy()
# print(c)
# testset = set(('baidu','alibaba','tengxun','wangyi'))
# print(testset)
# testset.add('pingduoduo')
# print(testset)
# testset.clear()
# print(testset)
# testset2 = testset.copy()
# print(testset2)
# testset3 = set(('baidu','alibaba'))
# print(testset2.difference(testset3))
# testset2.difference_update(testset3)
# print(testset2)
# testset.discard('baidu')
# print(testset)
# print(testset.intersection(testset3))
#
# list = [1,2,3,4]
# it = iter(list)
# for x in it:
# 	print(x, end=" ")

stack = [3,4,5]
stack.append(6)
stack.append(7)
print(stack)
stack.pop()
print(stack)
stack.pop()
stack.pop()
stack.pop()
print(stack)

dict = {'name':'frank','sex':'男','age':28,'say':'hello mother fucker'}
for key,val in dict.items():
	print(key,val)

while