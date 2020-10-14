#!/usr/bin/python
# -*- coding: UTF-8 -*-
import time
ages = [1,2,'a']
print(ages)

for age in ages:
	print age

nums = [1,2,3,4,5,6,7,8]
for index in range(len(nums)):
	print index
	print nums[index]

for num in range(10,20):
	if num%2 == 0:
		print '我魔怔了'
	else:
		print '我没魔'

yuanzu = (1,2,3,4,5,6)
print yuanzu

print time