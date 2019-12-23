import React, { useState } from "react";
import { ReactSortable } from "../../src";
import { Item, threes } from "../util";

export function SimpleList() {
  const [list, setList] = useState(threes);
  return (
    <ReactSortable
      id="simple-list"
      list={list}
      setList={setList}
      animation={150}
    >
      {list.map((item, index) => (
        <Item className="test" id={`simple-item-${item.id}`} key={item.id}>
          {item.name}
        </Item>
      ))}
    </ReactSortable>
  );
}
