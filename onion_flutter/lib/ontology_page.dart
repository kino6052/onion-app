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
  final OntologyPageProps props;

  const OntologyPage({
    super.key,
    required this.props,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF333333),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (props.isLoading)
              Center(child: CircularProgressIndicator())
            else ...[
              Container(
                padding: EdgeInsets.all(12.0),
                decoration: BoxDecoration(
                  border:
                      Border.all(color: Colors.white, style: BorderStyle.solid),
                  color: Color(0xFF333333),
                ),
                child: ItemComponent(props: props.menuProps),
              ),
              SizedBox(height: 16.0),
              Expanded(
                child: HierarchicalItemComponent(
                  props: HierarchicalItemProps(
                    text: props.hierarchicalItemProps.text,
                    onClick: props.hierarchicalItemProps.onClick,
                    onMenuClick: props.hierarchicalItemProps.onMenuClick,
                    indent: props.hierarchicalItemProps.indent,
                    isCollapsed: props.hierarchicalItemProps.isCollapsed,
                    menuComponent: props.hierarchicalItemProps.menuComponent,
                    promptComponent:
                        props.hierarchicalItemProps.promptComponent,
                    successors: props.hierarchicalItemProps.successors,
                  ),
                ),
              ),
            ],
            if (props.notificationProps != null)
              Prompt(
                title: props.notificationProps!.title,
                textController: props.notificationProps!.textController,
                onButtonPressed: props.notificationProps!.onButtonPressed,
                description: props.notificationProps!.description,
                onCancelPressed: props.notificationProps!.onCancelPressed,
                onBackgroundClick: props.notificationProps!.onBackgroundClick,
                isNotificationOnly: true,
              ),
          ],
        ),
      ),
    );
  }
}
