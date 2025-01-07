import 'package:flutter/material.dart';
import 'package:onion_flutter/menu_component.dart';
import 'prompt.dart';

class WordProps {
  final VoidCallback onClick;
  final VoidCallback onMenuClick;
  final List<WordProps> childrenProps;
  final bool isCollapsible;
  final bool isOpen;
  final String text;
  final PromptProps? promptProps;
  final MenuProps? menuProps;
  final String id;
  final EditProps? editProps;

  WordProps({
    required this.onClick,
    required this.onMenuClick,
    required this.childrenProps,
    this.isCollapsible = false,
    this.isOpen = false,
    required this.text,
    this.promptProps,
    this.menuProps,
    required this.id,
    this.editProps,
  });
}

class EditProps {
  final VoidCallback removeButtonProps;
  final TextEditingController inputProps;
  final VoidCallback confirmButtonProps;
  final VoidCallback rejectButtonProps;

  EditProps({
    required this.removeButtonProps,
    required this.inputProps,
    required this.confirmButtonProps,
    required this.rejectButtonProps,
  });
}

class Word extends StatefulWidget {
  final WordProps props;

  const Word({super.key, required this.props});

  @override
  _WordState createState() => _WordState();
}

class _WordState extends State<Word> {
  final Offset _menuPosition = Offset(100, 100);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          // _menuPosition = e.localPosition;
        });
        widget.props.onClick();
      },
      child: Container(
        color: Colors.transparent,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () {},
                    child: Text(
                      widget.props.text,
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
                if (widget.props.isCollapsible)
                  IconButton(
                    icon: Icon(Icons.menu),
                    onPressed: widget.props.onMenuClick,
                  ),
              ],
            ),
            if (widget.props.isOpen)
              Column(
                children: widget.props.childrenProps.map((props) {
                  return Word(props: props);
                }).toList(),
              ),
            if (widget.props.menuProps != null)
              Positioned(
                left: _menuPosition.dx,
                top: _menuPosition.dy,
                child: Menu(props: widget.props.menuProps!),
              ),
            if (widget.props.promptProps != null)
              Prompt(
                title: widget.props.promptProps!.title,
                textController: widget.props.promptProps!.textController,
                onButtonPressed: widget.props.promptProps!.onButtonPressed,
                description: widget.props.promptProps!.description,
                onCancelPressed: widget.props.promptProps!.onCancelPressed,
                onBackgroundClick: widget.props.promptProps!.onBackgroundClick,
                isNotificationOnly:
                    widget.props.promptProps!.isNotificationOnly,
              ),
          ],
        ),
      ),
    );
  }
}
