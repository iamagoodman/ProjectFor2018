# -*- coding:utf-8 -*-

import schedule
import time

def job():
    print('我在干活呢！')

# schedule.every(10).minutes.do(job)
# schedule.every(10).hour.do(job)
# schedule.every().day.at('10:30').do(job)
# schedule.every().monday().do(job)
schedule.every().minute.at(':30').do(job)

while True:
    schedule.run_pending()
    time.sleep(1)