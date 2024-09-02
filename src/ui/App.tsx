import { LoginPage } from "./pages/Login";
import { NotePage } from "./pages/Note";
import { OntologyPage } from "./pages/Ontology";
import { EPage, TAppProps } from "./types";

const map = {
  [EPage.Login]: LoginPage,
  [EPage.Note]: NotePage,
  [EPage.Ontology]: OntologyPage,
};

export const App: React.FC<TAppProps<EPage>> = ({ page, pageProps }) => {
  const Component = map[page];

  return <Component {...pageProps} />;
};
