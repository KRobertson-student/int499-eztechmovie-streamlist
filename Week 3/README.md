# EZ Tech Cart Assignment

This folder contains a self-contained React cart application for the Week 3 assignment.

## Live Page

[Open the EZ Tech Cart app](https://krobertson-student.github.io/int499-eztechmovie-streamlist/)

## What It Includes

- Navigation bar with Subscriptions and Cart sections
- Product catalog sourced from `src/data.js`
- Subscription rule: only one subscription can be in the cart at a time
- Accessories can be added multiple times
- Cart item count in the navigation bar
- Cart quantity controls, remove buttons, and total price summary
- Cart contents persist in local storage after page reloads
- Custom responsive CSS in `src/styles.css`
- Cart behavior tests in `src/cartLogic.test.js` and `src/App.test.jsx`

## Run The App

```bash
npm install
npm run dev
```

## Build And Test

```bash
npm test -- --run
npm run build
```
