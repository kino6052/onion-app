import 'package:flutter/material.dart';
import 'item_component.dart';
// Assuming you have a Loader component
import 'prompt.dart';
import 'word_component.dart';

class NotePageProps {
  final ItemComponentProps itemProps;
  final bool isLoading;
  final WordProps wordTreeProps;
  final PromptProps? notificationProps;
  final PromptProps? editTextPrompt;

  NotePageProps({
    required this.itemProps,
    this.isLoading = false,
    required this.wordTreeProps,
    this.notificationProps,
    this.editTextPrompt,
  });
}

class NotePage extends StatelessWidget {
  final ItemComponentProps itemProps;
  final bool isLoading;
  final WordProps wordTreeProps;
  final PromptProps? notificationProps;
  final PromptProps? editTextPrompt;

  const NotePage({
    super.key,
    required this.itemProps,
    this.isLoading = false,
    required this.wordTreeProps,
    this.notificationProps,
    this.editTextPrompt,
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
                child: ItemComponent(props: itemProps),
              ),
              SizedBox(height: 16.0),
              Expanded(
                child: Word(
                  props: wordTreeProps,
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
            if (editTextPrompt != null)
              Prompt(
                title: editTextPrompt!.title,
                textController: editTextPrompt!.textController,
                onButtonPressed: editTextPrompt!.onButtonPressed,
                description: editTextPrompt!.description,
                onCancelPressed: editTextPrompt!.onCancelPressed,
                onBackgroundClick: editTextPrompt!.onBackgroundClick,
                isNotificationOnly: editTextPrompt!.isNotificationOnly,
              ),
          ],
        ),
      ),
    );
  }
}
