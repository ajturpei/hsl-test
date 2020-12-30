import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";
import client from "./graphql/client";
import Header from "./components/Header";
import GlobalContextComponent from "./components/GlobalContextComponent";
import GeoLocate from "./components/GeoLocate";
import MapOverlay from "./components/Map/MapOverlay";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="HSL-test-page">
        <ApolloProvider client={client}>
          <GlobalContextComponent>
            <GeoLocate>
              <Header />
              <MapOverlay />
            </GeoLocate>
          </GlobalContextComponent>
        </ApolloProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
