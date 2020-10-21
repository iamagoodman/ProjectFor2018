# _*_ coding: utf-8 _*_
import os
import glob
import re
print (os.getcwd())
print (213)
path = os.path.join('myproject','AI')
print (path)
# print (os.listdir('C:'))
# files = os.listdir('./')
# for item in files:
#     print (item, os.path.isdir(item))


files1 = os.scandir()
for item in files1:
    print(item.name,item.path,item.is_dir(),item.is_file())

for root, dirs, files in os.walk('.', topdown=True):
	for name in files:
		print(os.path.join(root,name))
	for name in dirs:
		print(name)

print(glob.glob('*.py'))
print(re.findall(r'\bf[a-z]*','whiich foot or hand fell fastest'))
'''
    os 文件模块
    getcwd() 获取当前路径
    path.join(path1,path2)  自动拼接路径，不需要加\ / python会根据系统不同 自动拼接
    相对路径  ./path1
    绝对路径  window: C:/user/...     mac:  /usr/...
    listdir()  接受一个参数，路径 可以是绝对 也可以相对
    path.isdir(path)  判断是否是文件夹
'''