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
            )),
            Center(
              child: Image.network(
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=155468531,1129895523&fm=26&gp=0.jpg',
                width: double.infinity,
              ),
            )
          ],
        ));
  }
}
