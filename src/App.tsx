import { LoginPage } from "./pages/Login/LoginPage";
import { NotePage } from "./pages/Note/NotePage";
import { OntologiesPage } from "./pages/Ontologies/OntologiesPage";
import { OntologyPage } from "./pages/Ontology/OntologyPage";
import { EPage, TAppProps } from "./types";

export const App: React.FC<TAppProps> = ({ pageProps, pageType }) => {
  if (pageType === EPage.Login) return <LoginPage {...pageProps} />;
  if (pageType === EPage.Ontologies) return <OntologiesPage {...pageProps} />;
  if (pageType === EPage.Ontology) return <OntologyPage {...pageProps} />;
  if (pageType === EPage.Note) return <NotePage {...pageProps} />;
  return null;
};
