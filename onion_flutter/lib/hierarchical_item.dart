import 'package:flutter/material.dart';

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

class HierarchicalItemComponent extends StatelessWidget {
  final HierarchicalItemProps props;

  const HierarchicalItemComponent({super.key, required this.props});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: EdgeInsets.only(left: (props.indent ?? 0) * 12.0),
          decoration: BoxDecoration(
            border: props.indent != null
                ? Border(
                    left: BorderSide(
                        color: Colors.white, style: BorderStyle.solid))
                : null,
          ),
          child: Column(
            children: [
              if (props.menuComponent != null) props.menuComponent!,
              GestureDetector(
                onTap: () {
                  props.onClick();
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
                      if (props.menuComponent != null)
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
                          props.text + (props.isCollapsed ? " (...)" : ""),
                          style: TextStyle(fontSize: 16.0, color: Colors.white),
                        ),
                      ),
                      if (props.menuComponent != null)
                        GestureDetector(
                          onTap: () {
                            props.onMenuClick?.call();
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
              if (!props.isCollapsed && props.successors != null)
                ...props.successors!
                    .map((successorProps) => HierarchicalItemComponent(
                          props: successorProps,
                        )),
            ],
          ),
        ),
        if (props.promptComponent != null) props.promptComponent!,
      ],
    );
  }
}
