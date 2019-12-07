import React, { useState } from "react";
import { ReactSortable } from "../../src";
import { Item, threes } from "../util";
import styled from "styled-components";

export function Grid() {
  const [list, setList] = useState(() =>
    threes().concat(...threes(), ...threes())
  );
  return (
    <StyledReactSortable list={list} setList={setList} animation={150}>
      {list.map(item => (
        <GridItem key={item.id}>
          <p>{item.id}</p>
        </GridItem>
      ))}
    </StyledReactSortable>
  );
}

const StyledReactSortable = styled(ReactSortable)`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 0.5rem;
`;

const GridItem = styled(Item)`
  height: 2rem;
  & > * {
    margin: auto
  }
  /* width: 100px; */
`;
