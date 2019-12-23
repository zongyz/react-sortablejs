import React, { useState } from "react";
import styled from "styled-components";
import { MultiDrag, ReactSortable, Sortable } from "../../src";
import { Item, threes, createId } from "../util";

Sortable.mount(new MultiDrag());

export function MultiDragExample() {
  const [list, setList] = useState(threes);
  const [list1, setList1] = useState(threes);

  return (
    <Column>
      <ReactSortable
        multiDrag
        list={list}
        setList={setList}
        animation={150}
        group={{ name: "shrek", pull: "clone" }}
        clone={item => ({ ...item, id: createId() })}
      >
        {list.map(item => (
          <MultiDragItem key={item.id}>{item.name}</MultiDragItem>
        ))}
      </ReactSortable>
      <ReactSortable
        multiDrag
        list={list1}
        setList={setList1}
        animation={150}
        group="shrek"
      >
        {list1.map(item => (
          <MultiDragItem key={item.id}>{item.name}</MultiDragItem>
        ))}
      </ReactSortable>
    </Column>
  );
}

const Column = styled.div`
  display: flex;
  width: inherit;
  & > * {
    width: 100%;
    margin-left: 0.3rem;
    :first-child() {
      margin-left: 0rem;
    }
  }
`;

const MultiDragItem = styled(Item)`
  &.sortable-selected {
    background-color: #0a0a;
  }
`;
