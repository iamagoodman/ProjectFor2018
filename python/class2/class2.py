# _*_ coding: utf-8 _*_
import os
import glob
import fnmatch
import time
# print(glob.glob('/'))
print(glob.glob('*.txt'))

print(fnmatch.fnmatch('mackben','ma*an'))
print(fnmatch.fnmatch('mackben','ma*n'))

currenttime = ''
# for file in os.scandir():
#     print(file.stat())
#     currenttime = file.stat().st_mtime
#     print(currenttime)
# print(time.ctime(currenttime))

print(os.stat('test.txt'))
