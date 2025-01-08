import 'package:flutter/material.dart';

class ItemComponentProps {
  final String text;
  final VoidCallback onClick;
  final bool isMenuOpen;
  final Widget? menuComponent;

  ItemComponentProps({
    required this.text,
    required this.onClick,
    required this.isMenuOpen,
    this.menuComponent,
  });
}

class ItemComponent extends StatefulWidget {
  final ItemComponentProps props;

  const ItemComponent({super.key, required this.props});

  @override
  _ItemComponentState createState() => _ItemComponentState();
}

class _ItemComponentState extends State<ItemComponent> {
  OverlayEntry? _overlayEntry;

  @override
  void initState() {
    super.initState();
    if (widget.props.isMenuOpen && widget.props.menuComponent != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _showMenu();
      });
    }
  }

  @override
  void dispose() {
    _hideMenu();
    super.dispose();
  }

  void _showMenu() {
    _overlayEntry = _createOverlayEntry();
    Overlay.of(context).insert(_overlayEntry!);
    print("Overlay inserted");
  }

  void _hideMenu() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    print("Overlay removed");
  }

  OverlayEntry _createOverlayEntry() {
    return OverlayEntry(
      builder: (context) => Positioned(
        top: 100.0, // Adjust this value to position the menu vertically
        left: 100.0, // Adjust this value to position the menu horizontally
        child: widget.props.menuComponent ?? SizedBox.shrink(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: widget.props.onClick,
      child: Container(
        padding: EdgeInsets.all(8.0),
        child: Text(
          widget.props.text,
          style: theme.textTheme.bodyMedium,
        ),
      ),
    );
  }
}
