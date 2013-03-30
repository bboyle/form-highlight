This script sets a class `active` on 'questions' within a form when they have focus.
This class can be used as a styling hook to show where the user is up to.

Classes will be applied to elements matching `.questions > li` and `.group` selectors.
Ancestors of the current question will also be highlighted, so you can track nested questions.
