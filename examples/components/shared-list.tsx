import React, { PropsWithChildren, useState } from "react";
import { ReactSortable } from "../../src/index";
import { Item, threes } from "./shared";
import styled from "styled-components";
import { Item, threes } from "../util";

export function SharedList() {
  const [list1, setList1] = useState(threes);
  const [list2, setList2] = useState(threes);
  return (
    <Flex>
      <List list={list1} setList={setList1} />
      <List list={list2} setList={setList2} />
    </Flex>
  );
}

const Flex = styled.div`
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

function List<T extends ID>(props: PropsWithChildren<ListProps<T>>) {
  const { children, ...rest } = props;
  const { list } = props;
  const defaultChildren = list.map(item => (
    <Item key={item.id}>{item.name}</Item>
  ));
  return (
    <ReactSortable animation={150} group="shared-group-name" {...rest}>
      {children || defaultChildren}
    </ReactSortable>
  );
}

interface ListProps<T extends ID> {
  list: T[];
  setList: (newList: T[]) => void;
}

interface ID {
  id: string | number;
  name: string;
  [property: string]: any;
}
