# -*- coding: utf-8 -*-
import yagmail

yag = yagmail.SMTP(user='13929244742@163.com',host='smtp.163.com')
contents = ['正文内容11111111111',
            '正文内容22222222222',
            '<a href="https://baidu.com">去百度</a>']

yag.send('13929244742@163.com','第一个测试邮件',contents)
