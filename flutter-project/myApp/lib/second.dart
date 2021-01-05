import 'package:flutter/material.dart';

class SecondRoute extends StatelessWidget {
  final Topic = Text("路由测试");

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    final age = 8;
    print('second.dart $age');
    var args = ModalRoute.of(context).settings.arguments;
    return Scaffold(
        appBar: AppBar(
          title: Text("第二页11"),
        ),
        body: new ListView(
          children: <Widget>[
            Center(
              child: Text('路由到此页面获取到的数据为:$args'),
            ),
            Center(
              child: Text('i am $age years old'),
            ),
            Center(
                child: IconButton(
              icon: new Icon(Icons.account_circle),
              onPressed: () => Navigator.pushNamed(context, "four_page",
                  arguments: 'gagagagaga'),
            )),
            Center(
              child: new MyButton(),
            ),
            Center(
              child: new Counter(),
            )
          ],
        ));
  }
}

class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: new Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: new BoxDecoration(
          borderRadius: new BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: new Center(
          child: new Text('Engage'),
        ),
      ),
    );
  }
}

class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return new Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return new RaisedButton(
      onPressed: onPressed,
      child: new Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => new _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Row(children: <Widget>[
      new CounterIncrementor(onPressed: _increment),
      new CounterDisplay(count: _counter),
    ]);
  }
}
