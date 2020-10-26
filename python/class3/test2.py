# _*_ coding:utf-8 _*_
import zipfile

# with zipfile.ZipFile('fadsfsa.zip','r') as zipobj:
#     print(zipobj.namelist())
#
# with zipfile.ZipFile('fadsfsa.zip','r') as zipobj:
#     zipobj.extract('fadsfsa/text111.txt')

ziplist = ['file1.txt','file2.txt']
with zipfile.ZipFile('新的压缩包.zip','w') as zipobj:
    for item in ziplist:
        zipobj.write(item)