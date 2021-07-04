# 第好几个方法实例

import requests #先导入爬虫的库，不然调用不了爬虫的函数

response = requests.get( "http://www.zhihu.com")  #第一次访问知乎，不设置头部信息

print( "第一次,不设头部信息,状态码:",response.status_code )# 没写headers，不能正常爬取，状态码不是 200

#下面是可以正常爬取的区别，更改了User-Agent字段

headers = {

		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"

}#设置头部信息,伪装浏览器

response = requests.get( "http://www.zhihu.com" , headers=headers )  #get方法访问,传入headers参数，

print( response.status_code ) # 200！访问成功的状态码

print( response.text )
