import React, { useState } from "react";
import { ReactSortable } from "../../src";
import styled from "styled-components";
import { threes, Item } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <CustomItem key={item.id}>
          <FontAwesomeIcon className="handle" icon="grip-lines" />
          <Span>{item.name}</Span>
        </CustomItem>
      ))}
    </ReactSortable>
  );
}

const CustomItem = styled(Item)`
  align-items: center;
  & > * {
    margin: auto unset;
  }
`;

const Span = styled.span`
  margin-left: .5rem;
`;
