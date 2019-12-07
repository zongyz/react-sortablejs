import React, { ReactElement } from "react";
import styled, { ThemeProvider } from "styled-components";
import * as Examples from "./components";

const components = Object.entries(Examples);

function Contents() {
  return (
    <Wrapper>
      {components.map(([name, Component], index) => (
        <Container key={index}>
          <Title>
            {index + 1} -  {name}
          </Title>
          <Component key={name} />
        </Container>
      ))}
    </Wrapper>
  );
}
const Title = styled.h4`
  margin-bottom: 0.4rem;
`;

const Wrapper = styled.div`
  display: grid;
  padding: 2rem;
  margin: 0 auto;
  background-color: #eee;
  max-width: 100rem;
  gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
`;

const Container = styled.div`
  border-radius: 0.2rem;
  background-color: #ccc;
  padding: 1rem;
`;

// handle
// animations
// different types of state
// // lists, objects
// callbacks

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
