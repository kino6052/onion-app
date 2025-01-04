import 'package:flutter/material.dart';
import 'package:onion_flutter/item_component.dart';
import 'package:onion_flutter/ontologies_page.dart';
import 'package:onion_flutter/prompt.dart';
import 'custom_button.dart';
import 'login_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
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
    Widget login = LoginPage(
      message: 'You have pushed the button $_counter times!',
      onLoginPressed: _incrementCounter,
    );

    Widget ontologiesPage = OntologiesPage(
        isLoading: false,
        menuProps: ItemComponentProps(
            text: 'test',
            onClick: () {},
            onMenuClick: () {},
            isMenuOpen: false),
        ontologiesProps: [
          ItemComponentProps(
              text: 'test',
              onClick: () {},
              onMenuClick: () {},
              isMenuOpen: false),
          ItemComponentProps(
              text: 'test',
              onClick: () {},
              onMenuClick: () {},
              isMenuOpen: false),
          ItemComponentProps(
              text: 'test',
              onClick: () {},
              onMenuClick: () {},
              isMenuOpen: false)
        ],
        notificationProps: PromptProps(
          title: 'title',
          onButtonPressed: () {},
          description: 'description',
        ));

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: ontologiesPage);
  }
}
