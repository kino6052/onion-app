import classNames from "classnames/bind";
import { LoginPage } from "./pages/Login";
import { NotePage } from "./pages/Note";
import { OntologyPage } from "./pages/Ontology";
import styles from "./styles.scss";
import { EPage, TAppProps } from "./types";
import { withState } from "./utils/withState";
import { BehaviorSubject, tap } from "rxjs";
import { TLoginProps } from "./pages/Login/types";
import { produce } from "immer";
import { TOntologyProps } from "./pages/Ontology/types";
import { EConstant } from "./constants";

const cn = classNames.bind(styles);

const initialProps = {
  page: EPage.Login,
  pageProps: {
    buttonProps: {},
  },
};

const stateSubject = new BehaviorSubject<Partial<TAppProps<EPage>>>(
  initialProps
);

type TSubject = BehaviorSubject<Partial<TAppProps<EPage>>>;

const update = (nextProps: Partial<TAppProps<EPage>>, subject: TSubject) => {
  subject.next(nextProps);
};

const getDispatch =
  (subject: TSubject) =>
  (cb: (subject: TSubject) => Partial<TAppProps<EPage>>) => {
    subject.next(cb(subject));
  };

const createElement =
  (childId: string, parentId: string) => (subject: TSubject) =>
    produce(subject.getValue(), (_state) => {
      const tree = (_state.pageProps as TOntologyProps).tree;

      const parentNode = tree[parentId];

      parentNode.isCollapsed = false;
      parentNode.successors.push(childId);

      tree[childId] = {
        id: childId,
        indent: (parentNode.indent += 1),
        isCollapsed: true,
        successors: [],
        text: "New Node",
      };
    });

const navigateToOntology = (subject: TSubject) => {
  const dispatch = getDispatch(subject);

  return produce(subject.getValue(), (_state) => {
    _state.page = EPage.Ontology;
    _state.pageProps = {
      menuProps: {
        onClick: () => alert("Test"),
      },
      tree: {
        [EConstant.Root]: {
          id: EConstant.Root,
          text: "Root",
          successors: [],
          onClick: () => {
            dispatch(createElement("new", EConstant.Root));
          },
        },
      },
    } as TOntologyProps;
  });
};

const initializeProps = (
  subject: BehaviorSubject<Partial<TAppProps<EPage>>>
) => {
  const dispatch = getDispatch(subject);

  return produce(subject.getValue(), (_state) => {
    if (_state.page === EPage.Login) {
      const props = _state.pageProps as TLoginProps;
      props.buttonProps.onClick = () => {
        dispatch(navigateToOntology);
      };
    }
  });
};

const map = {
  [EPage.Login]: LoginPage,
  [EPage.Note]: NotePage,
  [EPage.Ontology]: OntologyPage,
};

// TODO: Move to composition root initialization
const dispatch = getDispatch(stateSubject);
dispatch(initializeProps);

export const App: React.FC<TAppProps<EPage>> = withState(stateSubject)(({
  page,
  pageProps,
}) => {
  const Component = map[page];

  return <Component {...pageProps} />;
});

stateSubject.pipe(tap(console.warn)).subscribe();
