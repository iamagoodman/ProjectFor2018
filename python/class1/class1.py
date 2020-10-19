# _*_ coding: utf-8 _*_
import os

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
    print (item.name,item.path,item.isdir)
'''
    os 文件模块
    getcwd() 获取当前路径
    path.join(path1,path2)  自动拼接路径，不需要加\ / python会根据系统不同 自动拼接
    相对路径  ./path1
    绝对路径  window: C:/user/...     mac:  /usr/...
    listdir()  接受一个参数，路径 可以是绝对 也可以相对
    path.isdir(path)  判断是否是文件夹
'''