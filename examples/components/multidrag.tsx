import React, { useState } from "react";
import { ReactSortable } from "../../src";
import { Item, threes } from "../util";

export function MultiDrag() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable multiDrag list={list} setList={setList} animation={150}>
      {list.map(item => (
        <Item key={item.id}>{item.name}</Item>
      ))}
    </ReactSortable>
  );
}
    