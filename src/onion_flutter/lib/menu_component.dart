import 'package:flutter/material.dart';
import 'item_component.dart';

class MenuProps {
  final List<ItemComponentProps> itemsProps;
  final VoidCallback onBackgroundClick;

  MenuProps({
    required this.itemsProps,
    required this.onBackgroundClick,
  });
}

class Menu extends StatelessWidget {
  final MenuProps props;

  const Menu({Key? key, required this.props}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        props.onBackgroundClick();
      },
      child: Container(
        color: Colors.transparent,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Color(0xFF333333),
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(color: Colors.white),
              ),
              child: Column(
                children: props.itemsProps.map((itemProps) {
                  return ItemComponent(
                    text: itemProps.text,
                    onClick: itemProps.onClick,
                    onMenuClick: itemProps.onMenuClick,
                    menuComponent: itemProps.menuComponent,
                    isMenuOpen: itemProps.isMenuOpen,
                    promptComponent: itemProps.promptComponent,
                    child: itemProps.child,
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
