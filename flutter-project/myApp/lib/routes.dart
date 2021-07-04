import 'package:flutter/material.dart';
import './home.dart';
import './second.dart';
import './third.dart';
import './four.dart';
import './five.dart';
import './six.dart';
import './seven.dart';
import './eight.dart';
import './nine.dart';
import './ten.dart';
import './eleven.dart';
import './twelve.dart';
import './showPage/index.dart';

/// 路由表
final Map<String, WidgetBuilder> routeTable = {
  'home': (content) => MyHomePage(),
  'second_page': (content) => SecondRoute(),
  'third_page': (context) => ThirdRoute(),
  'four_page': (context) => FourRoute(),
  'five_page': (context) => FiveRoute(),
  'six_page': (context) => SixRoute(),
  'seven_page': (context) => SevenRoute(),
  'eight_page': (context) => EightRoute(),
  'nine_page': (context) => NineRoute(),
  'ten_page': (context) => TenRoute(),
  'eleven_page': (context) => ThemeTestRoute(),
  'twelve_page': (context) => HttpTestRoute(),
  'show_page': (context) => ShowRoute(),
};
