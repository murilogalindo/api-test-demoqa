# API Test Automation - DemoQA

This project is a simple and effective **API test automation suite** using **Jest** and **Supertest** to validate RESTful endpoints. It serves as a reference for structuring and running automated API tests using Node.js.

---

## Goals

- Validate public or local API endpoints
- Ensure response status, body, and headers match expected values
- Promote a clean and scalable architecture using test best practices

---

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [ESLint](https://eslint.org/) (optional, for linting and code quality)

---

## Project Structure

api-test-demoqa/
├── tests/
│ ├── fixtures/
│ ├── integration/
│ │ └── app/
| |   └── app.test.js # Test example
│ └── utils/
│ └── request.js # Supertest setup
├── .gitignore
├── package.json
└── README.md


---

##  Installation

1. **Clone the repository:**

```bash
git clone https://github.com/murilogalindo/api-test-demoqa.git
cd api-test-demoqa

    Install dependencies:

npm install
Running Tests
Run all tests:

npm test

Run a specific file:

npx jest tests/integration/app/app.test.js

    Make sure your target API is running and accessible before executing the tests.

Example Test (Jest + Supertest)

const request = require('../../utils/request');

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const res = await request.get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

Base URL Configuration

The request.js file sets up the base URL for your API:

const request = require('supertest');
const baseURL = 'https://your-api-url.com'; // <-- change this
module.exports = request(baseURL);

Notes

    You can easily plug this setup into any public API or your own back-end.

    Good for integrating with CI/CD pipelines or backend deployments.

    You may expand the structure to include mocks, fixtures, or test data helpers.

Author

Murilo Galindo
[LinkedIn](https://www.linkedin.com/in/murilogalindo/)
murilomag.galindo@gmail.com
