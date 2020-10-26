# -*- loding: utf-8 -*-
from openpyxl import load_workbook
from openpyxl.drawing.image import Image

workbook = load_workbook(filename='new.xlsx')
sheet = workbook.active

logo = Image('每颗豆.png')
logo.height = 100
logo.width = 100

sheet.add_image(logo, 'C1')
workbook.save(filename='new.xlsx')