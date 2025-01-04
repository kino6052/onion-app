import 'package:flutter/material.dart';
import 'item_component.dart';
import 'prompt.dart';

class OntologiesPageProps {
  final bool isLoading;
  final ItemComponentProps menuProps;
  final PromptProps? notificationProps;
  final List<ItemComponentProps> ontologiesProps;

  OntologiesPageProps({
    required this.isLoading,
    required this.menuProps,
    this.notificationProps,
    required this.ontologiesProps,
  });
}

class OntologiesPage extends StatelessWidget {
  final bool isLoading;
  final ItemComponentProps menuProps;
  final PromptProps? notificationProps;
  final List<ItemComponentProps> ontologiesProps;

  const OntologiesPage({
    Key? key,
    required this.isLoading,
    required this.menuProps,
    this.notificationProps,
    required this.ontologiesProps,
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
                  text: "List of Ontologies",
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
                child: ListView.builder(
                  itemCount: ontologiesProps.length,
                  itemBuilder: (context, index) {
                    final props = ontologiesProps[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: ItemComponent(
                        text: props.text,
                        onClick: props.onClick,
                        onMenuClick: props.onMenuClick,
                        menuComponent: props.menuComponent,
                        isMenuOpen: props.isMenuOpen,
                        promptComponent: props.promptComponent,
                        child: props.child,
                      ),
                    );
                  },
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
