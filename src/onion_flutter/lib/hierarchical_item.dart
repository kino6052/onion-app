import 'package:flutter/material.dart';
import 'item_component.dart';

class HierarchicalItemProps {
  final String text;
  final VoidCallback onClick;
  final VoidCallback? onMenuClick;
  final int? indent;
  final bool isCollapsed;
  final Widget? menuComponent;
  final Widget? promptComponent;
  final List<HierarchicalItemProps>? successors;
  final Widget? Component;

  HierarchicalItemProps(
      {required this.text,
      required this.onClick,
      this.onMenuClick,
      this.indent,
      this.isCollapsed = false,
      this.menuComponent,
      this.promptComponent,
      this.successors,
      this.Component});
}

class HierarchicalItem extends StatelessWidget {
  final String text;
  final VoidCallback onClick;
  final VoidCallback? onMenuClick;
  final int? indent;
  final bool isCollapsed;
  final Widget? menuComponent;
  final Widget? promptComponent;
  final List<HierarchicalItemProps>? successors;

  const HierarchicalItem({
    Key? key,
    required this.text,
    required this.onClick,
    this.onMenuClick,
    this.indent,
    this.isCollapsed = false,
    this.menuComponent,
    this.promptComponent,
    this.successors,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: EdgeInsets.only(left: (indent ?? 0) * 12.0),
          decoration: BoxDecoration(
            border: indent != null
                ? Border(
                    left: BorderSide(
                        color: Colors.white, style: BorderStyle.solid))
                : null,
          ),
          child: Column(
            children: [
              if (menuComponent != null) menuComponent!,
              GestureDetector(
                onTap: () {
                  onClick();
                },
                child: Container(
                  padding: EdgeInsets.all(12.0),
                  decoration: BoxDecoration(
                    border: Border.all(
                        color: Colors.white, style: BorderStyle.solid),
                    color: Color(0xFF333333),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      if (menuComponent != null)
                        Container(
                          width: 24.0,
                          height: 24.0,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white),
                          ),
                        ),
                      SizedBox(width: 12.0),
                      Expanded(
                        child: Text(
                          text + (isCollapsed ? " (...)" : ""),
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
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              if (!isCollapsed && successors != null)
                ...successors!.map((successorProps) => HierarchicalItem(
                      text: successorProps.text,
                      onClick: successorProps.onClick,
                      onMenuClick: successorProps.onMenuClick,
                      indent: successorProps.indent,
                      isCollapsed: successorProps.isCollapsed,
                      menuComponent: successorProps.menuComponent,
                      promptComponent: successorProps.promptComponent,
                      successors: successorProps.successors,
                    )),
            ],
          ),
        ),
        if (promptComponent != null) promptComponent!,
      ],
    );
  }
}
