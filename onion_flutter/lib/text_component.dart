import 'package:flutter/material.dart';

class TextComponentProps {
  final Widget children;
  final bool isSelected;
  final VoidCallback onClick;
  final VoidCallback? onMouseOver;

  TextComponentProps({
    required this.children,
    required this.isSelected,
    required this.onClick,
    this.onMouseOver,
  });
}

class TextComponent extends StatelessWidget {
  final Widget children;
  final bool isSelected;
  final VoidCallback onClick;
  final VoidCallback? onMouseOver;

  const TextComponent({
    super.key,
    required this.children,
    required this.isSelected,
    required this.onClick,
    this.onMouseOver,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onClick();
      },
      // onHover: () {
      //   // if (hovering && onMouseOver != null) {
      //   onMouseOver!();
      //   // }
      // },
      child: Container(
        color:
            isSelected ? Color.fromRGBO(255, 255, 0, 0.5) : Colors.transparent,
        child: children,
      ),
    );
  }
}
