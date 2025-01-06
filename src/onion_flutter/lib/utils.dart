import 'dart:math';

import 'package:flutter/material.dart';
import 'package:onion_flutter/hierarchical_item.dart';
import 'package:onion_flutter/item_component.dart';
import 'package:onion_flutter/menu_component.dart';
import 'package:onion_flutter/ontology_page.dart';
import 'package:onion_flutter/types.dart';
import 'main.dart'; // Adjust the import as necessary

HierarchicalItemProps mapHierarchyItemToProps(
    HierarchicalItem item, int indent, OntologyState state, Function setState) {
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
      return mapHierarchyItemToProps(
          hierarchicalItems[id]!, indent + 1, state, setState);
    }).toList(),
  );
}

OntologyPageProps mapStateToProps(OntologyState state, Function setState) {
  return OntologyPageProps(
    hierarchicalItemProps:
        mapHierarchyItemToProps(state.tree['ROOT']!, 0, state, setState),
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
                  state.message = (Random().nextInt(100) + 1).toString();
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
