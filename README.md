# My React + Typescript + Vite Project

This project is a simple React application built with Typescript and Vite. It demonstrates routing and navigation using React Router DOM.

The project was developed as a test task to showcase my ability to work with React Router DOM, Json-server and create multi-page applications without using external state managment libraries.

## Features

- Multi-Page navigation using React Router DOM.
- Props-drilling for passing data between components.
- Minimal and responsive design.
- Created using Vite for fast development and build performance.

## Technologies Used

- React
- Typescript
- Vite
- React Router DOM
- TailWind CSS
- Json-server

## Challenges Faced

In this project, I used props-drilling for state management due to the specific requirements of only using React Router DOM. While this approach works for smaller projects, I acknowledge that a state management library like Redux Toolkit or Context API would make the code more scalable and maintainable.

## Future Improvements

- Implement Redux Toolkit or Context API to reduce props-drilling.
- Add dynamic data fetching from an API.
- Improve styling with animations or transitions.
- Write unit and integration tests for better code quality.
- Improve responsive design

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

````bash
GITHUB EXAMPLE
2. cd ./სატესტო პროექტი bookShop
3. install dependencies: npm run dev
4. start json-server: json-server --watch db.json
5. Open your browser and navigate to: http://localhost:5173


## Conclusion
This project represents my first steps into React, TypeScript, and Vite. It demonstrates routing and navigation concepts while following the given constraints. I look forward to improving the code based on feedback and learning more advanced techniques.


```js
export default tseslint.config({
languageOptions: {
  // other options...
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
  },
},
})
````

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
