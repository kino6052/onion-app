import 'package:flutter/material.dart';
import 'custom_button.dart';

class PromptProps {
  final String title;
  final TextEditingController? textController;
  final VoidCallback onButtonPressed;
  final String? description;
  final VoidCallback? onCancelPressed;
  final VoidCallback? onBackgroundClick;
  final bool isNotificationOnly;

  PromptProps({
    required this.title,
    this.textController,
    required this.onButtonPressed,
    this.description,
    this.onCancelPressed,
    this.onBackgroundClick,
    this.isNotificationOnly = false,
  });
}

class Prompt extends StatelessWidget {
  final String title;
  final TextEditingController? textController;
  final VoidCallback onButtonPressed;
  final String? description;
  final VoidCallback? onCancelPressed;
  final VoidCallback? onBackgroundClick;
  final bool isNotificationOnly;

  const Prompt({
    super.key,
    required this.title,
    this.textController,
    required this.onButtonPressed,
    this.description,
    this.onCancelPressed,
    this.onBackgroundClick,
    this.isNotificationOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onBackgroundClick,
      child: Container(
        color: Color(0xFF333333),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Color(0xFF333333),
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(color: Colors.white),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  if (description != null) ...[
                    SizedBox(height: 8.0),
                    Text(
                      description!,
                      style: TextStyle(fontSize: 16.0, color: Colors.white),
                    ),
                  ],
                  if (!isNotificationOnly && textController != null) ...[
                    SizedBox(height: 8.0),
                    TextField(
                      controller: textController,
                      maxLines: 3,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.white),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.white),
                        ),
                      ),
                    ),
                  ],
                  SizedBox(height: 16.0),
                  CustomButton(
                    onPressed: onButtonPressed,
                    label: 'Ok',
                  ),
                  if (onCancelPressed != null) ...[
                    SizedBox(height: 8.0),
                    CustomButton(
                      onPressed: onCancelPressed!,
                      label: 'Cancel',
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
