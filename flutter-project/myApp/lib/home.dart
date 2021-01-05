import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    final randomword = new WordPair.random();
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              child: Text(
                "携带参数打开新页面 $randomword",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              textColor: Colors.blue,
              onPressed: () {
                //导航到一个新的路由页面
                Navigator.of(context)
                    .pushNamed("second_page", arguments: "参数测试777");
                // print(routeTable);
              },
            ),
            Center(
              child: Image.asset('assets/images/background.jpg'),
            )
          ],
        ),
      ),
    );
  }
}
