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
print(random.randrange(0,10,2))
a = [1,2,3,4,5,6]
random.shuffle(a)
print(a)

list1 = [1,2,3]
list2 = [4,5,6]
list1.extend(list2)
print(list1)
a.sort()
print(a)

b = {'a':1,'b':2,'c':{'d':'fdsafdsa','e':{'f':'1232'}}}
print(b)
# b.clear()
# print(b)
c = b.copy()
print(c)





len(dict)
计算字典元素个数，即键的总数。
>>> dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
>>> len(dict)
3
2	str(dict)
输出字典，以可打印的字符串表示。
>>> dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
>>> str(dict)
"{'Name': 'Runoob', 'Class': 'First', 'Age': 7}"
3	type(variable)
返回输入的变量类型，如果变量是字典就返回字典类型。
>>> dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
>>> type(dict)
<class 'dict'>
Python字典包含了以下内置方法：

序号	函数及描述
