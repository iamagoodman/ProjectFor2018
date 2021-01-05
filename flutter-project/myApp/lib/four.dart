import 'package:flutter/material.dart';

class FourRoute extends StatelessWidget {
  // final Topic = Text("路由测试");
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context).settings.arguments;
    // TODO: implement build
    return Scaffold(
        appBar: AppBar(
          title: Text("第四页"),
        ),
        body: new ListView(
          children: <Widget>[
            Center(
              child: Text("this is four page"),
            ),
            Center(
              child: Text(args),
            ),
            Center(
                child: IconButton(
              icon: new Icon(Icons.access_alarm),
              onPressed: () => Navigator.pushNamed(context, 'third_page'),
            ))
          ],
        ));
  }
}
