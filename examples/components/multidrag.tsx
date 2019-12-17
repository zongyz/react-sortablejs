import React, { useState } from "react";
import styled from "styled-components";
import { MultiDrag, ReactSortable } from "../../src";
import { Item, threes } from "../util";

export function MultiDragExample() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable
      multiDrag
      plugins={[new MultiDrag()]}
      list={list}
      setList={setList}
      animation={150}
    >
      {list.map(item => (
        <MultiDragItem key={item.id}>{item.name}</MultiDragItem>
      ))}
    </ReactSortable>
  );
}

const MultiDragItem = styled(Item)`
  &.sortable-selected {
    background-color: #0a0a;
  }
`;
