import { LoginPage } from "./pages/Login/LoginPage";
import { NotePage } from "./pages/Note/NotePage";
import { OntologiesPage } from "./pages/Ontologies/OntologiesPage";
import { OntologyPage } from "./pages/Ontology/OntologyPage";
import { EPage, TAppProps } from "./types";

const pageComponents = {
  [EPage.Login]: LoginPage,
  [EPage.Ontologies]: OntologiesPage,
  [EPage.Ontology]: OntologyPage,
  [EPage.Note]: NotePage,
};

export const App: React.FC<TAppProps> = ({ pageProps, pageType }) => {
  const PageComponent = pageComponents[pageType];
  // @ts-expect-error
  return PageComponent ? <PageComponent {...pageProps} /> : null;
};
