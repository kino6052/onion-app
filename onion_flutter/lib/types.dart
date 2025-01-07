enum EPage {
  Login,
  Ontology,
  Note,
  Ontologies,
}

class TWithId {
  final String id;

  TWithId(this.id);
}

class TPageTypeState<TPageType extends EPage> {
  final TPageType pageType;

  TPageTypeState(this.pageType);
}

class TIsLoadingState {
  final bool isLoading;

  TIsLoadingState(this.isLoading);
}

class TMessageState {
  final String message;

  TMessageState(this.message);
}

class THasErrorState {
  final bool hasError;

  THasErrorState(this.hasError);
}

class TCoordinates {
  final double x;
  final double y;

  TCoordinates(this.x, this.y);
}

class TPromptState {
  final String text;
  final bool? isNotificationOnly;
  final String? type;

  TPromptState({
    required this.text,
    this.isNotificationOnly,
    this.type,
  });
}

class TDefaultPageState extends TIsLoadingState {
  String? message;
  bool? hasError;
  bool? isMenuOpen;
  String? name;
  String id;

  TDefaultPageState({
    required bool isLoading,
    this.message,
    this.hasError,
    this.isMenuOpen,
    this.name,
    required this.id,
  }) : super(isLoading);
}

class TPageState<T> {
  final TDefaultPageState defaultPageState;
  final T pageState;

  TPageState({
    required this.defaultPageState,
    required this.pageState,
  });
}

typedef TSetState<T> = void Function(T Function(T) cb);

typedef TMapStateToProps<TState, TProps> = TProps Function(
    TState state, TSetState<TState> setState);

class TPageStateMap {
  final TPageState<TDefaultPageState> login;
  final TPageState<TDefaultPageState> ontology;
  final TPageState<TDefaultPageState> note;
  final TPageState<TDefaultPageState> ontologies;

  TPageStateMap({
    required this.login,
    required this.ontology,
    required this.note,
    required this.ontologies,
  });
}

typedef TAppState<TPage extends EPage> = TPageStateMap Function(TPage);

class HierarchicalItem {
  String id;
  String name;
  bool collapsed;
  bool isMenuOpen;
  List<String> successors;
  PromptState? promptState;

  HierarchicalItem({
    required this.id,
    required this.name,
    required this.collapsed,
    required this.isMenuOpen,
    required this.successors,
    this.promptState,
  });
}

class PromptState {
  bool isPromptVisible;
  String promptMessage;

  PromptState({
    required this.isPromptVisible,
    required this.promptMessage,
  });
}
