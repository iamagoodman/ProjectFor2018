#!/usr/bin/python
# -*- coding: UTF-8 -*-
# set PYTHONPATH=/usr/local/lib/python
import time
import math
import os
import socket
import sys
from my_package.my1 import run1
from my_package.my2 import run2


print(time.time())

sum = lambda arg1, arg2: arg1 + arg2

print(sum(10,20))

total = 0
def sum( arg1, arg2 ):
	total = arg1 + arg2
	print(total)
	return

sum( 20, 20 )
print(total)


Money = 2000
def AddMoney():
	global Money
	Money = Money + 1

print(Money)
AddMoney()
print(Money)

# content = dir(math)
# print (content)
# print(globals())
# print(locals())

# run1()
# run2()

# str = raw_input('请输入:')
# print '你输入的内容是：', str

# str2 = input('请输入：')
# print '你输入的内容是：', str2

fo = open('foo.txt','r+')
# fo.write(str)
filecontent = fo.read()
print(filecontent)

# print '文件名：', fo.name
# print '是否已关闭：', fo.closed
# print '访问模式：', fo.mode
# print '末尾是否强制加空格：', fo.softspace

fo.close()

# os.remove('foo.txt')

# os.mkdir('newdir')

try:
	fh = open('testfile','w')
	fh.write('测试问发动机可撒了')
except IOError:
	print('没有找到文件，或写入失败')
else:
	print('写入成功')
	fh.close()


class Employee:
	'所有员工的基类'
	empCount = 0
	def __init__(self, name, salary):
		self.name = name
		self.salary = salary
		Employee.empCount += 1
	def displayCount(self):
		print('total employee',  Employee.empCount)
	def displayEmployee(self):
		print('name:', self.name, 'salary:', self.salary)

xiaohong = Employee('xiaohong','fdafdsa')
xiaohong.displayCount()
xiaohong.displayEmployee()

xiaoqiang = Employee('xiaoqiang','fdsgd')
xiaoqiang.displayCount()
xiaoqiang.name = 'jack'
xiaoqiang.displayEmployee()


print(Employee.__name__)
print(Employee.__dict__)
print(Employee.__doc__)
print(Employee.__module__)
print(Employee.__bases__)



# class Point:
# 	'测试类的销毁'
# 	def __init__(self, x=0, y=0):
# 		self.x = x
# 		self.y = y
# 	def __del__(self):
# 		class_name = self.__class__.__name__
# 		print class_name, '销毁'
#
#
# pt1 = Point()
# pt2 = pt1
# pt3 = pt2
# print id(pt1), id(pt2), id(pt3)
#
# class Point2:
#    def __init__( self, x=0, y=0):
#       self.x = x
#       self.y = y
#    def __del__(self):
#       class_name = self.__class__.__name__
#       print class_name, "销毁"
#
# pt11 = Point2()
# pt21 = pt11
# pt31 = pt11
# print id(pt11), id(pt21), id(pt31) # 打印对象的id



# class Parent:
# 	'父类'
# 	def __init__(self):
# 		print '调用父类构造函数'
# 	def parentMethod(self):
# 		print '父类方法调用'
# 	def setAttr(self, attr):
# 		self.parentAttr = attr
# 	def getAttr(self):
# 		print self.parentAttr
#
# class Child(Parent):
# 	def __init__(self):
# 		print '调用子类构造函数'
# 	def childMethod(self):
# 		print '子类方法调用'
#
# c = Child()
# c.childMethod()
# c.parentMethod()
# c.setAttr(300)
# c.getAttr()
#
# print issubclass(Child,Parent)
# print isinstance(Child,Parent)
# print isinstance(c,Parent)

# class Vector:
#    def __init__(self, a, b):
#       self.a = a
#       self.b = b
#
#    def __str__(self):
#       return 'Vector (%d, %d)' % (self.a, self.b)
#
#    def __add__(self,other):
#       return Vector(self.a + other.a, self.b + other.b)
#
# v1 = Vector(2,10)
# v2 = Vector(5,-2)
# print v1 + v2

class Counter:
	'测试私有属性和公有属性'
	publicCount = 0
	__selfCount = 1
	def count(self):
		print('私有属性：', self.__selfCount, '公有属性：', self.publicCount)
counter1 = Counter()
counter1.count()
print(counter1.publicCount)
# print counter1.__selfCount
print(counter1._Counter__selfCount)



