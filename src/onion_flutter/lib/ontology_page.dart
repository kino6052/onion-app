import 'package:flutter/material.dart';
import 'hierarchical_item.dart';
import 'item_component.dart';
import 'prompt.dart';

class OntologyPageProps {
  final HierarchicalItemProps hierarchicalItemProps;
  final ItemComponentProps menuProps;
  final bool isLoading;
  final PromptProps? notificationProps;

  OntologyPageProps({
    required this.hierarchicalItemProps,
    required this.menuProps,
    this.isLoading = false,
    this.notificationProps,
  });
}

class OntologyPage extends StatelessWidget {
  final HierarchicalItemProps hierarchicalItemProps;
  final ItemComponentProps menuProps;
  final bool isLoading;
  final PromptProps? notificationProps;

  const OntologyPage({
    Key? key,
    required this.hierarchicalItemProps,
    required this.menuProps,
    this.isLoading = false,
    this.notificationProps,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF333333),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (isLoading)
              Center(child: CircularProgressIndicator())
            else ...[
              Container(
                padding: EdgeInsets.all(12.0),
                decoration: BoxDecoration(
                  border:
                      Border.all(color: Colors.white, style: BorderStyle.solid),
                  color: Color(0xFF333333),
                ),
                child: ItemComponent(
                  text: menuProps.text,
                  onClick: menuProps.onClick,
                  onMenuClick: menuProps.onMenuClick,
                  menuComponent: menuProps.menuComponent,
                  isMenuOpen: menuProps.isMenuOpen,
                  promptComponent: menuProps.promptComponent,
                  child: menuProps.child,
                ),
              ),
              SizedBox(height: 16.0),
              Expanded(
                child: HierarchicalItem(
                  text: hierarchicalItemProps.text,
                  onClick: hierarchicalItemProps.onClick,
                  onMenuClick: hierarchicalItemProps.onMenuClick,
                  indent: hierarchicalItemProps.indent,
                  isCollapsed: hierarchicalItemProps.isCollapsed,
                  menuComponent: hierarchicalItemProps.menuComponent,
                  promptComponent: hierarchicalItemProps.promptComponent,
                  successors: hierarchicalItemProps.successors,
                ),
              ),
            ],
            if (notificationProps != null)
              Prompt(
                title: notificationProps!.title,
                textController: notificationProps!.textController,
                onButtonPressed: notificationProps!.onButtonPressed,
                description: notificationProps!.description,
                onCancelPressed: notificationProps!.onCancelPressed,
                onBackgroundClick: notificationProps!.onBackgroundClick,
                isNotificationOnly: true,
              ),
          ],
        ),
      ),
    );
  }
}
