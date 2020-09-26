import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from "@storybook/react";
import { ReactSortable, ReactSortableProps } from "../../dist";
import "../classic.css";

export interface ULLITemplateProps {
  id: string;
  text: string;
}

export const ULLITemplate: Story<ReactSortableProps<ULLITemplateProps>> = (
  args
) => {
  const [list, setList] = React.useState<ULLITemplateProps[]>(args.list);

  return (
    <ReactSortable className="list" {...args} list={list} setList={setList}>
      {list.map(({ id, text }) => (
        <li className="item" key={id}>
          {text}
        </li>
      ))}
    </ReactSortable>
  );
};
