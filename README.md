# Playwright REST API Test Suite

## Overview
This project contains automated tests for the https://api.restful-api.dev API using Playwright and TypeScript. The tests cover CRUD operations:
- Get all objects
- Add an object
- Get a single object
- Update an object
- Delete an object
- Verify deleted object cannot be fetched

## Prerequisites
- Node.js
- npm (comes with Node.js)

## Setup Instructions

1. **Clone the repository or copy the project files**

2. **Install dependencies**

```
npm install
```

3. **Install Playwright browsers**

```
npx playwright install
```

4. **Run the tests**

```
npx playwright test
```

This will execute all tests in the `tests` folder.

## File Structure
- `tests/api.spec.ts`: Contains all API tests.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.

