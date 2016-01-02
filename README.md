[![bitHound Overall Score](https://www.bithound.io/github/bboyle/form-highlight/badges/score.svg)](https://www.bithound.io/github/bboyle/form-highlight)
[![bitHound Dev Dependencies](https://www.bithound.io/github/bboyle/form-highlight/badges/devDependencies.svg)](https://www.bithound.io/github/bboyle/form-highlight/master/dependencies/npm)

This script sets a class `active` on 'questions' within a form when they have focus.
This class can be used as a styling hook to show where the user is up to.

Classes will be applied to elements matching `.questions > li` and `.group` selectors.
Ancestors of the current question will also be highlighted, so you can track nested questions.
