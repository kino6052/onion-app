import { LoginPage } from "./pages/Login";
import { NotePage } from "./pages/Note";
import { OntologyPage } from "./pages/Ontology";
import { EPage, TAppProps } from "./types";
import { findFirst } from "./utils";

export const App: React.FC<TAppProps> = (pageProps) =>
  findFirst(
    [
      pageProps.pageType === EPage.Login && <LoginPage {...pageProps} />,
      pageProps.pageType === EPage.Ontology && <OntologyPage {...pageProps} />,
      pageProps.pageType === EPage.Note && <NotePage {...pageProps} />,
    ],
    null
  );
