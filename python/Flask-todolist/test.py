# -*- coding: utf-8 -*-
from rethinkdb import RethinkDB
r = RethinkDB()
r.connect('localhost', 28015).repl()
r.db('test').table_create('authors').run()
r.table("authors").insert([
    { "name": "William Adama", "tv_show": "Battlestar Galactica",
      "posts": [
        {"title": "Decommissioning speech", "content": "The Cylon War is long over..."},
        {"title": "We are at war", "content": "Moments ago, this ship received..."},
        {"title": "The new Earth", "content": "The discoveries of the past few days..."}
      ]
    },
    { "name": "Laura Roslin", "tv_show": "Battlestar Galactica",
      "posts": [
        {"title": "The oath of office", "content": "I, Laura Roslin, ..."},
        {"title": "They look like us", "content": "The Cylons have the ability..."}
      ]
    },
    { "name": "Jean-Luc Picard", "tv_show": "Star Trek TNG",
      "posts": [
        {"title": "Civil rights", "content": "There are some words I've known since..."}
      ]
    }
]).run()

# cursor = r.table('authors').filter(r.row['name'] == 'William Adama').run()
# for document in cursor:
#   print(document)

cursor = r.table('authors').filter(r.row['posts'].count() > 2).run()
for document in cursor:
  print(document)

# r.db('test').table('authors').get('7644aaf2-9928-4231-aa68-4e65e31bf219').run()

r.table('authors').update({'type':'fictional'}).run()
r.table('authors').filter(r.row['name'] == 'William Adama').update({'rank':'Admiral'}).run()
r.table('authors').filter(r.row['name'] == 'Jean-Luc Picard').update({'posts': r.row['posts'].append({
  'title':'Shakespeare',
  'content':'what a piece of work is man ...'
})
}).run()

r.table('authors').filter(r.row['posts'].count()<3).delete().run()

