import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu } from "../../components/Menu/Menu";
import { getOntology } from "../../../dependencies/getOntology/dev";
import { logout } from "../../../dependencies/logout/dev";
import { EPage, TAppProps, TAppState } from "../../../types";
import { getMapStateToOntologiesProps } from "./logic";
import { OntologiesPage } from "./OntologiesPage";
import { TOntologiesProps } from "./types";
import { uniqueId } from "../../../libs/lodash";
import { removeOntology } from "../../../dependencies/removeOntology/dev";
import { saveOntology } from "../../../dependencies/saveOntology/dev";

const state001 = {
  pageType: EPage.Ontologies,
  pageState: {
    isLoading: false,
    list: [
      {
        id: "one",
        text: "Hierarchy 1",
      },
      {
        id: "two",
        text: "Hierarchy 2",
      },
      {
        id: "three",
        text: "Hierarchy 3",
      },
    ],
  },
} satisfies TAppState<EPage.Ontologies>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Ontologies",
  component: ({}) => {
    const [state, setState] = useState(state001);
    return <OntologiesPage {...({} as TOntologiesProps)} />;
  },
} satisfies Meta<React.FC<{ props: TAppProps; state: TAppState<EPage> }>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _001Initial: Story = {
  args: {
    state: state001,
    props: getMapStateToOntologiesProps({
      Menu,
      logout,
      getOntology,
      getUniqueId: uniqueId,
      removeOntology,
      saveOntology,
    })(state001, () => {}),
  },
};
