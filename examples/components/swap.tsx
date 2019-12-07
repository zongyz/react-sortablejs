import React, { useState } from "react";
import styled from "styled-components";
import { Swap, ReactSortable } from "../../src";
import { Item, threes } from "../util";

export function SwapExample() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable
      swap
      plugins={[new Swap()]}
      list={list}
      setList={setList}
      animation={150}
    >
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
