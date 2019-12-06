import React, { useState } from "react";
import { ReactSortable } from "../../src";
import { Item, threes } from "../util";

export function SimpleList() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable list={list} setList={setList} animation={150}>
      {list.map(item => (
        <Item key={item.id}>{item.name}</Item>
      ))}
    </ReactSortable>
  );
}
