import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "/examples/Sidenav";
import theme from "/assets/theme";
import themeDark from "/assets/theme-dark";
import routes from "/routes";

import {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
} from "/context";

//Contexto de los datos de usuario
import { AuthProvider, useAuth } from '../context/AuthContext'

// Images
import favicon from "/assets/images/favicon.png";
import appleIcon from "/assets/images/apple-icon.png";
import brandWhite from "/assets/images/logo-ct.png";
import brandDark from "/assets/images/logo-ct-dark.png";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

function Main({ Component, pageProps }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useRouter();

  const { user, setUser } = useAuth()

  console.log(user);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const brandIcon =
    (transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite;

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <Component {...pageProps} />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brandIcon}
              brandName="Material Dashboard PRO"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <MaterialUIControllerProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href={favicon.src} />
          <link rel="apple-touch-icon" sizes="76x76" href={appleIcon.src} />
          <title>Next Material Dashboard 2 PRO</title>
        </Head>
        <Main Component={Component} pageProps={pageProps} />
      </CacheProvider>
    </MaterialUIControllerProvider>
  );
}

export default MyApp;
