# -*- coding: utf-8 -*-
# http://config.mail.163.com/settings/imap/index.jsp?uid=13929244742@163.com

from imbox import Imbox
import keyring

password = keyring.get_password('yagmail','13929244742@163.com')

with Imbox('imap.163.com','13929244742@163.com',password, ssl=True) as imbox:
    all_inbox_messages = imbox.messages(flagged=True)
    for uid,message in all_inbox_messages:
        print(message.attachments)