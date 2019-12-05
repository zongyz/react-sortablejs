import React, { useState } from "react";
import { ReactSortable } from "../../src";

export function Basic() {
  const [list, setList] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "donkey" }
  ]);
  return  (
    <ReactSortable animation={150} list={list} setList={setList}>
      {list.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
}
