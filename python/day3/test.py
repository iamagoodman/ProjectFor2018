import xlwings as xw
import sys
# wb = xw.Book('./test.xlsx')
#
# sht = wb.sheets['Sheet1']

# print(wb.fullname)
# print(sht.name)
# shtdata = sht.range('a1').expand().value
# sht.range('A1').value = 'xlwings'
# print(sht.range('A1').row)
# print(sht.range('A1').column)
# print(sht.range('A1').row_height)
# print(sht.range('A1').column_width)
# result = []
# for item in shtdata:
# 	title = shtdata[0]
# 	for titleItem in title:
# 		itemdata = {
# 			title[0]: item[0],
# 			title[1]: item[1],
# 			title[2]: item[2],
# 			title[3]: item[3]
# 		}
# 		result.append(itemdata)
#
# print(result)
# fo = open('foo.txt','w')
# fo.write(str(result))
# fo.close()

test1 = 1
test1 += 1
print(test1)

a = 'abc'
b = a
print(a,b)

a = 'xyz'
print(a,b)

c = {'name':'frank','sex':'男'}
d = c
print(c,d)
# c = {'name':'jack','sex':'女'}
c['name'] = 'jack'
print(c,d)

print(sys.path)