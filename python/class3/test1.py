# _*_ coding: utf-8 _*_
import os
import shutil
if not os.path.exists('新文件夹'):
    os.mkdir('新文件夹')

if os.path.exists('新文件夹'):
    if not os.path.exists('新文件夹/测试文佳佳'):
        os.makedirs('新文件夹/测试文佳佳')

# shutil.copy('file1.txt','新文件夹')

shutil.copytree('copy','新文件夹/')