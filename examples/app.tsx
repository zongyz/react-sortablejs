import React, { ReactElement } from "react";
import styled, { ThemeProvider } from "styled-components";
import * as Examples from "./components";

const components = Object.entries(Examples);

function Contents() {
  return (
    <div>
      {components.map(([name, Component]) => (
        <Component key={name} />
      ))}
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <Contents />
    </AppProvider>
  );
}

function AppProvider({ children }: { children?: ReactElement }) {
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>;
}
