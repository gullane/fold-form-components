# Form components

This project was created using create-react-app
```
npx create-react-app fold-form-components
```
Other modules were subsequently loaded - notably for testing :

```
npm install @hapi/joi styled-components
```
joi is used to describe and validate data

This approach seems appropriate for large projects where the graphist is given free rein. Libraries for themeing input elements can't be used in this case.
Libraries like Formik are excellent but :
rather opaque in their approach - a little hard to understand and change things as needed
This approach seems to cover most cases and remains easy to understand and change to suit the particular needs of a form.