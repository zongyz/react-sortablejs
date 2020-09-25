# Contributing

Thank you in advance for contributing to this project.

Here is how I go about contributing to this project. They're all required, unless otherwised indicated via a quote.

## Workflow

We use `husky` with other tools to ensure the guidelines are met.
The only thing we can't check is if you're repo is up to date.

At a high level, this is what is required:

- Fork this repository and clone it onto your machine.
- Make your changes on a per commit basis. One bug/feature/docs change per commit.
- Add commits using `yarn commit` instead of `git commit` to ensure you're commits are formatted correctly
- Adds tests if applicable
  - Unit tests via jest
  - Browser tests via Cypress
- Tests will be ran on pull and on push.

### Developing

> We recommend using the GitHub CLI, so use `gh repo fork waynevanson/react-sortablejs` and accepting the prompts.
>
> We also recommend using ssh. If you know you use SSH, run `gh config set git_protocol ssh`.
> This allows you use gh cli without having to login every time.
