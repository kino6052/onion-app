import 'package:flutter/material.dart';
import 'custom_button.dart';

class LoginPage extends StatelessWidget {
  final String message;
  final VoidCallback onLoginPressed;

  const LoginPage({
    Key? key,
    required this.message,
    required this.onLoginPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF333333),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Onion Notes',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontFamily: 'monospace',
                        color: Colors.white,
                      ),
                ),
                SizedBox(height: 24),
                Text(
                  'App for making ontologies and summaries',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontFamily: 'monospace',
                        color: Colors.white,
                      ),
                ),
                SizedBox(height: 24),
                Text(
                  message,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontFamily: 'monospace',
                        color: Colors.white,
                      ),
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Login options',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontFamily: 'monospace',
                        color: Colors.white,
                      ),
                ),
                SizedBox(height: 24),
                CustomButton(
                  label: 'Login with Github',
                  onPressed: onLoginPressed,
                  hasIcon: true,
                  icon: Icon(Icons.login, color: Colors.black),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
