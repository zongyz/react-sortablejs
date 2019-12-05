import styled from "styled-components";

let id = 0;
export const threes = () => [
  { id: id++, name: "shrek" },
  { id: id++, name: "fiona" },
  { id: id++, name: "donkey" }
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
