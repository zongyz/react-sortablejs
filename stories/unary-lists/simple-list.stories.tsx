// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react";
import { ReactSortableProps, ReactSortable } from "../../src";
import { ULLITemplate, ULLITemplateProps } from "../templates/ul-li";

export default {
  title: "Example/Simple List",
  component: ReactSortable,
  args: {
    animation: 200,
    list: [
      {
        id: "1",
        text: "Hello, World!",
      },
      {
        id: "2",
        text: "Hello, Earth!",
      },
      {
        id: "3",
        text: "Goodbye, World!",
      },
    ],
  },
} as Meta<ReactSortableProps<ULLITemplateProps>>;

export const Primary = ULLITemplate.bind({});
Primary.args = {
  tag: "ul",
};
