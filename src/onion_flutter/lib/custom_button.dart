import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final VoidCallback onPressed;
  final bool? isDisabled;
  final bool? hasIcon;
  final Widget? icon;
  final String label;

  const CustomButton({
    Key? key,
    required this.onPressed,
    this.isDisabled = false,
    this.hasIcon = false,
    this.icon,
    required this.label,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isDisabled! ? null : onPressed,
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.white,
        padding: hasIcon! ? EdgeInsets.all(24) : EdgeInsets.all(12),
        backgroundColor: Colors.transparent,
        side: BorderSide(color: Colors.white),
        textStyle: TextStyle(
          fontFamily: 'monospace',
          fontSize: 16,
        ),
        minimumSize: Size(0, 48),
        maximumSize: Size(double.infinity, 48),
        alignment: Alignment.center,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.zero,
        ),
        visualDensity: VisualDensity.adaptivePlatformDensity,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (hasIcon! && icon != null) ...[
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white),
              ),
              child: icon,
            ),
            SizedBox(width: 12),
          ],
          Text(label),
        ],
      ),
    );
  }
}
