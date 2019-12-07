import React from "react";
import styled from "styled-components";

/** @todo */
export function Nested() {
  return (
    <div>
      <P>
        This can be done, but you can't drag from one list to another. Dragging
        items that are not descendants/ancestors of each other is the only way that works.
        I'll build an exmaple on what does work later on.
      </P>
      <P>
        Last time I tried to make one of these work correctly like the example,
        it didn't work out too well.
      </P>
      <P>
        I understand how the hooks work now so when I get another chance I'll
        figure this out.
      </P>
    </div>
  );
}

const P = styled.p`
  margin-bottom: 0.5rem;
`;
