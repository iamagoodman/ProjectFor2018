#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os

# fo = open('foo.txt','r+')
# fo = open('title1.docx',mode='ab+')

# filecontent = fo.read()
# fo.write('fdajfkasjkfldjaskfsjaklfjsdklajfkls')
# print(filecontent)

# fo.close()

# os.rename('title.docx','title1.docx')
# os.mkdir('newdir1')
# os.rmdir('newdir')
# os.remove('foo.txt')
print(os.getcwd())

# 条件控制 / if嵌套也行，注意缩进
a = 1
if (a<5):
	print('a<5')
elif (a==5):
	print('a==5')
else:
	print('a>5')


# 循环语句 for , while
count = 0
while count < 5:
	print(count)
	count += 1
else:
	print(count)

for x in range(6,10):
	if x>8:
		break
	else:
		print(x*2)

for x in range(0,10,3):
	print(x)

list1 = ['google','baidu','taobao','ali','huawei']
for i in range(len(list1)):
	print(i,list1[i])

print(list(range(1,5)))
