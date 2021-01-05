import 'package:flutter/material.dart';
import './home.dart';
import './routes.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: '路由测试',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: routeTable,
      // initialRoute: '/',
      home: MyHomePage(title: 'kaka'),
    );
  }
}
