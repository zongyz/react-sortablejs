import styled from "styled-components";
import { ItemInterface } from "../src";

let id = 0;

export const createId = () => id++;

const defs = { chosen: false, filtered: false, selected: false };

/** Generates uniquie id's for each item when generated */
export const threes = (): ItemInterface[] => [
  { id: id++, name: "shrek", ...defs },
  { id: id++, name: "fiona", ...defs },
  { id: id++, name: "donkey", ...defs, selected: true },
  { id: id++, name: "Lord Faarquad", ...defs }
];

export const Item = styled.div`
  display: flex;
  padding: 0.3rem;
  border-radius: 0.2rem;
  background-color: #fff6;
  margin-bottom: 0.3rem;

  &.sortable-ghost {
    background-color: #c8ebfb;
  }
`;
