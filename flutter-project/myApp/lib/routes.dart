import 'package:flutter/material.dart';
import './home.dart';
import './second.dart';
import './third.dart';
import './four.dart';

/// 路由表
final Map<String, WidgetBuilder> routeTable = {
  'home': (content) => MyHomePage(),
  'second_page': (content) => SecondRoute(),
  'third_page': (context) => ThirdRoute(),
  'four_page': (context) => FourRoute(),
};
