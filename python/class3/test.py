# _*_ coding: utf-8 _*_
# open()  readlines()  close()
from tempfile import TemporaryFile
from tempfile import TemporaryDirectory

f = open('file1.txt','r',encoding='utf-8')
text = f.readlines()
print(text)
f.close()

with open('file1.txt','r',encoding='utf-8') as f:
    text = f.read()
    print(text)

with open('file2.txt','w',encoding='utf-8') as f:
    text = 'fdksajkljf\nfdsalkjklfdj\n485674864546'
    f.write(text)

with open('file1.txt','a',encoding='utf-8') as f:
    text = '添加添加天机\n添加添加天机\n485674864546'
    f.write(text)

with TemporaryFile('w+') as f:
    f.write('fuck fuck!')
    f.seek(0)
    data = f.readlines()
    print(data)

with TemporaryDirectory() as tmp_floder:
    print(f'临时文件夹{tmp_floder}')