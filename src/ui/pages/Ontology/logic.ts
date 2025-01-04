import { HierarchicalItem } from "../../components/Item";
import { THierarchicalItemProps } from "../../components/Item/types";
import { EMenuConstant } from "../../components/Menu/constants";
import { Menu } from "../../components/Menu/Menu";
import { getOntologies } from "../../dependencies/getOntologies/dev";
import { TSaveOntology } from "../../dependencies/saveOntology/types";
import { EPage, TAppProps, TAppState, TMapStateToProps } from "../../../types";
import { getUpdateState, noop } from "../../../utils";
import { setPartial } from "../../utils/setPartial";
import { TOntologyProps } from "./types";

export const getMapStateToProps =
  ({
    mapStateToHierarchicalItemProps,
    saveOntology,
  }: {
    mapStateToHierarchicalItemProps: TMapStateToProps<
      TAppState,
      THierarchicalItemProps
    >;
    saveOntology: TSaveOntology;
  }) =>
  (
    state: TAppState<EPage.Ontology>,
    setState: (cb: (state: TAppState) => TAppState) => void
  ): TAppProps => {
    if (state.pageType !== EPage.Ontology) {
      throw Error("Invalid page type");
    }

    return {
      pageType: EPage.Ontology,
      pageProps: {
        message: state.pageState.message,

        isLoading: state.pageState.isLoading,
        notificationProps: state.pageState.hasError
          ? {
              buttonProps: {
                onClick: () => {
                  setPartial(
                    {
                      pageState: {
                        hasError: false,
                        message: undefined,
                      },
                    },
                    setState,
                    EPage.Ontology
                  );
                },
                children: "OK",
              },
              description: state.pageState.message ?? "An error occurred",
              onBackgrounClick: () => {
                setPartial(
                  {
                    pageState: {
                      hasError: false,
                      message: undefined,
                    },
                  },
                  setState,
                  EPage.Ontology
                );
              },
              title: "Error",
              isNotificationOnly: true,
            }
          : undefined,

        hierarchicalItemProps: mapStateToHierarchicalItemProps(state, setState),
        menuProps: {
          id: "menu",
          onClick: noop,
          onMenuClick: () => {
            setPartial(
              {
                pageState: {
                  isMenuOpen: !state.pageState.isMenuOpen,
                },
              },
              setState,
              EPage.Ontology
            );
          },
          text: state.pageState.name ?? "Ontology",
          menuProps: {
            isOpen: state.pageState.isMenuOpen,
            Component: Menu,
            id: "menu",
            itemsProps: [
              {
                id: EMenuConstant.Save,
                text: "Save",
                onClick: () => {
                  if (!state.pageState.id) throw new Error("No id provided");

                  setPartial(
                    {
                      pageState: {
                        isLoading: true,
                      },
                    },
                    setState,
                    EPage.Ontology
                  );

                  saveOntology(
                    state.pageState.id,
                    {
                      name: state.pageState.name ?? "New Ontology",
                      map: state.pageState.tree,
                    },
                    true
                  ).then(() => {
                    setPartial(
                      {
                        pageState: {
                          isLoading: false,
                        },
                      },
                      setState,
                      EPage.Ontology
                    );
                  });
                },
                onMenuClick: noop,
              },
              {
                id: EMenuConstant.GoBack,
                text: "Go Back",
                onClick: () => {
                  if (!state.pageState.id) throw new Error("No id provided");

                  setPartial(
                    {
                      pageState: {
                        isLoading: true,
                      },
                    },
                    setState,
                    EPage.Ontology
                  );

                  getOntologies().then((ontologies) => {
                    setState(() => ({
                      pageState: {
                        list: ontologies,
                        isLoading: false,
                        id: state.pageState.id,
                      },
                      pageType: EPage.Ontologies,
                    }));
                  });
                },
                onMenuClick: noop,
              },
            ],
            onBackgroundClick: () => {
              setPartial(
                {
                  pageState: {
                    isMenuOpen: false,
                  },
                },
                setState,
                EPage.Ontology
              );
            },
          },
        },
      },
    };
  };

export const converter = (props: TOntologyProps): TOntologyProps => {
  return getUpdateState(props)((_props) => {
    _props.ItemComponent = HierarchicalItem;
  });
};
