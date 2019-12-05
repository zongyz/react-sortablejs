import React, { useState } from "react";
import { ReactSortable } from "../../src";
import styled from "styled-components";

export function WithHandle() {
  const [list, setList] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "donkey" }
  ]);

  return (
    <ReactSortable
      handle=".handle"
      animation={150}
      list={list}
      setList={setList}
    >
      {list.map(item => (
        <Container key={item.id}>
          <Handle className="handle" />
          <div>{item.name}</div>
        </Container>
      ))}
    </ReactSortable>
  );
}

const Handle = styled.div`
  width: 4rem;
  height: 1rem;
  background: #ffff;
  margin-right: 1rem;
  border-radius: 0.4rem;
  :hover {
    background-color: #fffa;
  }
`;

const Container = styled.div`
  display: flex;
`;
