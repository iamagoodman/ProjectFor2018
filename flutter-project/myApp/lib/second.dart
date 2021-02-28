import 'package:flutter/material.dart';

class SecondRoute extends StatelessWidget {
  final Topic = Text("路由测试");

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    final age = 8;
    String icons = '';
    icons += '\uE914';
    icons += '\uE000';
    icons += '\uE90D';
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
            ),
            Text(
              'Hello World! I am Frank!' * 4,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(color: Colors.blueAccent),
            ),
            Text.rich(TextSpan(children: [
              TextSpan(text: 'gagag'),
              TextSpan(
                  text: 'http://localhost:8088',
                  style: TextStyle(color: Colors.blueGrey))
            ])),
            DefaultTextStyle(
                style: TextStyle(color: Colors.red, fontSize: 20.0),
                child: Column(
                  children: <Widget>[
                    Text('hello mother fucker'),
                    Text('i am your father'),
                    Text(
                      'i am jack',
                      style: TextStyle(inherit: false, color: Colors.grey),
                    )
                  ],
                )),
            Text(
              icons,
              style: TextStyle(
                  fontFamily: 'MaterialIcons',
                  fontSize: 24.0,
                  color: Colors.green),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  Icons.accessible,
                  color: Colors.green,
                ),
                Icon(
                  Icons.error,
                  color: Colors.green,
                ),
                Icon(
                  Icons.fingerprint,
                  color: Colors.green,
                ),
                new SwitchAndCheckBoxTestRoute(),
                // Row(
                //   children: <Widget>[
                //     Column(
                //       children: <Widget>[
                //         TextField(
                //           // autofocus: true,
                //           decoration: InputDecoration(
                //               labelText: '用户名',
                //               hintText: '用户名或邮箱',
                //               prefixIcon: Icon(Icons.person)),
                //         ),
                //         TextField(
                //           decoration: InputDecoration(
                //               labelText: '密码',
                //               hintText: '您的登陆密码',
                //               prefixIcon: Icon(Icons.lock)),
                //           obscureText: true,
                //         )
                //       ],
                //     )
                //   ],
                // ),
              ],
            )
          ],
        ));
  }
}

class SwitchAndCheckBoxTestRoute extends StatefulWidget {
  @override
  _SwitchAndCheckBoxTestRouteState createState() =>
      new _SwitchAndCheckBoxTestRouteState();
}

class _SwitchAndCheckBoxTestRouteState
    extends State<SwitchAndCheckBoxTestRoute> {
  bool _switchSelected = true;
  bool _checkboxSelected = true;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Switch(
          value: _switchSelected,
          activeColor: Colors.amber,
          onChanged: (value) {
            setState(() {
              _switchSelected = value;
            });
          },
        ),
        Checkbox(
          value: _checkboxSelected,
          activeColor: Colors.red,
          onChanged: (value) {
            setState(() {
              _checkboxSelected = value;
            });
          },
        )
      ],
    );
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
