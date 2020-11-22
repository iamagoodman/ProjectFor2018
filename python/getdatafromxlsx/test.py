from openpyxl import load_workbook

workbook = load_workbook(filename='location.xlsx')

sheet = workbook.active

cityList = sheet['A1':'E10']

print(cityList)



