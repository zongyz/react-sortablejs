import React, { useState } from "react";
import styled from "styled-components";
import { ReactSortable, Sortable, Swap } from "../../src";
import { Item, threes } from "../util";

Sortable.mount(new Swap());

export function SwapExample() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable swap list={list} setList={setList} animation={150}>
      {list.map(item => (
        <SwapItem key={item.id}>{item.name}</SwapItem>
      ))}
    </ReactSortable>
  );
}

const SwapItem = styled(Item)`
  &.sortable-swap-highlight {
    background-color: #fa0a;
  }
`;
