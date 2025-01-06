import 'dart:math';

import 'package:flutter/material.dart';
import 'package:onion_flutter/hierarchical_item.dart';
import 'package:onion_flutter/item_component.dart';
import 'package:onion_flutter/menu_component.dart';
import 'package:onion_flutter/note_page.dart';
import 'package:onion_flutter/ontologies_page.dart';
import 'package:onion_flutter/ontology_page.dart';
import 'package:onion_flutter/prompt.dart';
import 'package:onion_flutter/word_component.dart';
import 'login_page.dart';
import "types.dart";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = ThemeData(
      primarySwatch: Colors.blue,
      textTheme: const TextTheme(
        bodyMedium: TextStyle(fontSize: 16.0, color: Colors.white),
      ),
    );

    return MaterialApp(
      title: 'Flutter Demo',
      theme: theme,
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

Map<String, HierarchicalItem> hierarchicalItems = {
  'ROOT': HierarchicalItem(
    collapsed: false,
    id: 'ROOT',
    isMenuOpen: false,
    name: 'ROOT',
    successors: ["1", "2"],
  ),
  '1': HierarchicalItem(
    collapsed: false,
    id: '1',
    isMenuOpen: false,
    name: 'Item 1',
    successors: ["1.1"],
  ),
  '1.1': HierarchicalItem(
    collapsed: false,
    id: '1.1',
    isMenuOpen: false,
    name: 'Item 1.1',
    successors: [],
  ),
  '2': HierarchicalItem(
    collapsed: false,
    id: '2',
    isMenuOpen: false,
    name: 'Item 2',
    successors: [],
  ),
};

class OntologyState extends TDefaultPageState {
  final Map<String, HierarchicalItem> tree;

  OntologyState({
    required String id,
    required bool isLoading,
    required bool hasError,
    required bool isMenuOpen,
    required String message,
    required String name,
    required this.tree,
  }) : super(
          id: id,
          isLoading: isLoading,
          hasError: hasError,
          isMenuOpen: isMenuOpen,
          message: message,
          name: name,
        );

  @override
  OntologyState copyWith({
    String? id,
    bool? isLoading,
    bool? hasError,
    bool? isMenuOpen,
    String? message,
    String? name,
    Map<String, HierarchicalItem>? tree,
  }) {
    return OntologyState(
      id: id ?? this.id,
      isLoading: isLoading ?? this.isLoading,
      hasError: hasError ?? this.hasError,
      isMenuOpen: isMenuOpen ?? this.isMenuOpen,
      message: message ?? this.message,
      name: name ?? this.name,
      tree: tree ?? this.tree,
    );
  }
}

class _MyHomePageState extends State<MyHomePage> {
  OntologyState state = OntologyState(
      id: 'id',
      isLoading: false,
      hasError: false,
      isMenuOpen: true,
      message: '',
      name: 'test',
      tree: hierarchicalItems);

  HierarchicalItemProps mapHierarchyItemToProps(
      HierarchicalItem item, int indent) {
    return HierarchicalItemProps(
      text: item.name,
      indent: indent,
      onClick: () {
        setState(() {
          state.tree[item.id]?.collapsed =
              !(state.tree[item.id]?.collapsed ?? false);
        });
      },
      isCollapsed: item.collapsed,
      successors: item.successors.map((id) {
        return mapHierarchyItemToProps(hierarchicalItems[id]!, indent + 1);
      }).toList(),
    );
  }

  OntologyPageProps mapStateToProps(OntologyState state) {
    return OntologyPageProps(
      hierarchicalItemProps: mapHierarchyItemToProps(state.tree['ROOT']!, 0),
      menuProps: ItemComponentProps(
        text: state.message ?? 'menu',
        onClick: () {
          setState(() {
            state = state.copyWith(isMenuOpen: true);
          });
        },
        isMenuOpen: state.isMenuOpen ?? false,
        menuComponent: Menu(
          props: MenuProps(
            itemsProps: [
              ItemComponentProps(
                isMenuOpen: false,
                onClick: () {
                  setState(() {
                    setState(() {
                      state.message = (Random().nextInt(100) + 1).toString();
                    });
                  });
                },
                text: "option1",
              ),
              ItemComponentProps(
                isMenuOpen: false,
                onClick: () {
                  print("Hey2!");
                },
                text: "option2",
              ),
            ],
            onBackgroundClick: () {},
          ),
        ),
      ),
      isLoading: state.isLoading,
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget ontologyPage = OntologyPage(props: mapStateToProps(state));

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: ontologyPage,
    );
  }
}

class TDefaultPageState {
  String id;
  bool isLoading;
  bool hasError;
  bool isMenuOpen;
  String message;
  String name;

  TDefaultPageState({
    required this.id,
    required this.isLoading,
    required this.hasError,
    required this.isMenuOpen,
    required this.message,
    required this.name,
  });

  TDefaultPageState copyWith({
    String? id,
    bool? isLoading,
    bool? hasError,
    bool? isMenuOpen,
    String? message,
    String? name,
  }) {
    return TDefaultPageState(
      id: id ?? this.id,
      isLoading: isLoading ?? this.isLoading,
      hasError: hasError ?? this.hasError,
      isMenuOpen: isMenuOpen ?? this.isMenuOpen,
      message: message ?? this.message,
      name: name ?? this.name,
    );
  }
}
