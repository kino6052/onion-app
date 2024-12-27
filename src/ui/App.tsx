import { LoginPage } from "./pages/Login/LoginPage";
import { NotePage } from "./pages/Note";
import { OntologyPage } from "./pages/Ontology";
import { EPage, TAppProps } from "./types";

export const App: React.FC<TAppProps> = ({ pageProps, pageType }) => {
  if (pageType === EPage.Login) return <LoginPage {...pageProps} />;
  if (pageType === EPage.Ontology) return <OntologyPage {...pageProps} />;
  if (pageType === EPage.Note) return <NotePage {...pageProps} />;
  return null;
};
