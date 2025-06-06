import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";

import "./i18n";
import routes from "./routes";

import Loader from "./components/Loader";

import ThemeProvider from "./contexts/ThemeProvider";
import SidebarProvider from "./contexts/SidebarProvider";
import LayoutProvider from "./contexts/LayoutProvider";
import ChartJsDefaults from "./utils/ChartJsDefaults";

import AuthProvider from "./contexts/JWTProvider";
import AuthGuard from "./components/guards/AuthGuard";
import FirmProvider from "./contexts/FirmProvider";
// import AuthProvider from "./contexts/FirebaseAuthProvider";
// import AuthProvider from "./contexts/Auth0Provider";
// import AuthProvider from "./contexts/CognitoProvider";

const App = () => {
  const content = useRoutes(routes);

  return (
    <HelmetProvider>
      <AuthProvider>
        <FirmProvider>
          <Helmet
            titleTemplate="%s | AppStack - React Admin & Dashboard Template"
            defaultTitle="AppStack - React Admin & Dashboard Template"
          />
          <Suspense fallback={<Loader />}>
            <Provider store={store}>
              <ThemeProvider>
                <SidebarProvider>
                  <LayoutProvider>
                    <ChartJsDefaults />
                    {content}
                  </LayoutProvider>
                </SidebarProvider>
              </ThemeProvider>
            </Provider>
          </Suspense>
        </FirmProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
