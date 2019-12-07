import React, { useState } from "react";
import { ReactSortable } from "../../src";
import { Item, threes } from "../util";
import styled from "styled-components";

function createState() {
  return threes().map((item, index) => ({ ...item, filter: index === 2 }));
}

export function Filter() {
  const [list, setList] = useState(createState);
  return (
    <ReactSortable
      filter=".filter"
      list={list}
      setList={setList}
      animation={150}
    >
      {list.map(item => (
        <CustomItem className={item.filter ? "filter" : ""} key={item.id}>
          {item.name}
        </CustomItem>
      ))}
    </ReactSortable>
  );
}

const CustomItem = styled(Item)`
  &.filter {
    background-color: #f33a;
  }
`;
