import React, { useState } from "react";
import { ReactSortable } from "../../src";
import styled from "styled-components";
import { threes, Item } from "./shared";

export function WithHandle() {
  const [list, setList] = useState(threes);

  return (
    <ReactSortable
      handle=".handle"
      animation={150}
      list={list}
      setList={setList}
    >
      {list.map(item => (
        <Item key={item.id}>
          <Handle className="handle" />
          <span>{item.name}</span>
        </Item>
      ))}
    </ReactSortable>
  );
}

const Handle = styled.div`
  width: 1.5rem;
  height: inherit;
  background: #ffff;
  margin-right: 1rem;
  border-radius: 0.4rem;
  :hover {
    background-color: #fffa;
  }
`;
