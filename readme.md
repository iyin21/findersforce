finders force - a multi user HRM system built with Vite and documented with storybookjs

#### To install

checkout of master into <devname-branchName> and run `yarn install`


### GIT

Commits not inline with conventional commits would be rejected.

### Note

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the features folder, which should contain different feature-based things. Every feature folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files. [bulletProofReact](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)


# Note
Write tests.