import 'package:flutter/material.dart';

// Define the interface
class ItemComponentProps {
  final String text;
  final VoidCallback onClick;
  final VoidCallback? onMenuClick;
  final Widget? menuComponent;
  final bool isMenuOpen;
  final Widget? promptComponent;
  final Widget? child;

  ItemComponentProps({
    required this.text,
    required this.onClick,
    this.onMenuClick,
    this.menuComponent,
    this.isMenuOpen = false,
    this.promptComponent,
    this.child,
  });
}

class ItemComponent extends StatelessWidget implements ItemComponentProps {
  @override
  final String text;
  @override
  final VoidCallback onClick;
  @override
  final VoidCallback? onMenuClick;
  @override
  final Widget? menuComponent;
  @override
  final bool isMenuOpen;
  @override
  final Widget? promptComponent;
  @override
  final Widget? child;

  const ItemComponent({
    Key? key,
    required this.text,
    required this.onClick,
    this.onMenuClick,
    this.menuComponent,
    this.isMenuOpen = false,
    this.promptComponent,
    this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        GestureDetector(
          onTap: () {
            onClick();
          },
          child: Container(
            padding: EdgeInsets.all(12.0),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white, style: BorderStyle.solid),
              color: Color(0xFF333333),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: 24.0,
                  height: 24.0,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white),
                  ),
                  child: Icon(Icons.circle, size: 24.0, color: Colors.white),
                ),
                SizedBox(width: 12.0),
                Expanded(
                  child: Text(
                    text,
                    style: TextStyle(fontSize: 16.0, color: Colors.white),
                  ),
                ),
                if (menuComponent != null)
                  GestureDetector(
                    onTap: () {
                      onMenuClick?.call();
                    },
                    child: Container(
                      width: 24.0,
                      height: 24.0,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.white),
                      ),
                      child: menuComponent,
                    ),
                  ),
                if (promptComponent != null) promptComponent!,
              ],
            ),
          ),
        ),
        if (child != null) child!,
      ],
    );
  }
}
