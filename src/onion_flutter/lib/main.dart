import 'package:flutter/material.dart';
import 'package:onion_flutter/hierarchical_item.dart';
import 'package:onion_flutter/item_component.dart';
import 'package:onion_flutter/note_page.dart';
import 'package:onion_flutter/ontologies_page.dart';
import 'package:onion_flutter/ontology_page.dart';
import 'package:onion_flutter/prompt.dart';
import 'package:onion_flutter/word_component.dart';
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

    Widget notePage = NotePage(
      itemProps: ItemComponentProps(
          text: 'test', onClick: () {}, onMenuClick: () {}, isMenuOpen: false),
      isLoading: false,
      wordTreeProps: WordProps(
          onClick: () {},
          onMenuClick: () {},
          childrenProps: [
            WordProps(
                onClick: () {},
                onMenuClick: () {},
                childrenProps: [
                  WordProps(
                      onClick: () {},
                      onMenuClick: () {},
                      childrenProps: [],
                      isOpen: true,
                      text: 'test',
                      id: 'test')
                ],
                isOpen: true,
                text: 'test',
                id: 'test')
          ],
          isOpen: true,
          text: 'test',
          id: 'test'),
      notificationProps: PromptProps(
        title: 'title',
        onButtonPressed: () {},
        description: 'description',
      ),
      editTextPrompt: PromptProps(
        title: 'title',
        onButtonPressed: () {},
        description: 'description',
      ),
    );

    Widget ontologyPage = OntologyPage(
      hierarchicalItemProps:
          HierarchicalItemProps(text: 'test', onClick: () {}, successors: [
        HierarchicalItemProps(
            text: 'test',
            indent: 1,
            onClick: () {},
            successors: [
              HierarchicalItemProps(
                  text: 'test', indent: 2, onClick: () {}, successors: [])
            ]),
        HierarchicalItemProps(
          text: 'test',
          indent: 1,
          onClick: () {},
          successors: [],
        ),
        HierarchicalItemProps(
            text: 'test', indent: 1, onClick: () {}, successors: [])
      ]),
      menuProps:
          ItemComponentProps(text: 'test', onClick: () {}, isMenuOpen: false),
      isLoading: false,
    );

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: notePage);
  }
}
