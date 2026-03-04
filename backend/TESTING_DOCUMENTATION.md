# Movie Recommendation API - Testing Documentation

## Table of Contents
1. [Overview](#overview)
2. [Testing Environment](#testing-environment)
3. [Unit Testing Cases](#unit-testing-cases)
4. [Integration Testing Cases](#integration-testing-cases)
5. [Beta Testing Cases](#beta-testing-cases)
6. [Testing Approaches & Methods](#testing-approaches--methods)

---

## Overview

This document outlines the comprehensive testing strategy for the Movie Recommendation API. The application is built using Express.js with Passport.js authentication, PostgreSQL database, and various route modules for handling movie data.

### Application Architecture
- **Backend Framework**: Express.js
- **Authentication**: Passport.js (Google OAuth 2.0, Local Strategy)
- **Database**: PostgreSQL
- **Data Storage**: JSON files (CustomData directory)
- **API Documentation**: Swagger UI
- **Session Management**: cookie-session, express-session

### Key Modules Under Test
1. Authentication Routes (`/auth`)
2. Movie Data Routes (trending, upcoming, recommended, toprated, searchpages)
3. Carousel Routes (carousel1-5)
4. Filter Routes (`/filter`)
5. Server Configuration & Middleware

---

## Testing Environment

### Required Dependencies
```
json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.3.0",
    "mongodb-memory-server": "^8.0.0",
    "faker": "^5.5.3"
  }
}
```

### Test Configuration
- **Test Port**: 5001 (to avoid conflict with production port 5000)
- **Test Database**: Separate test instance or mock data
- **Test Framework**: Jest with Supertest for HTTP assertions

---

## Unit Testing Cases

Unit testing focuses on testing individual components and functions in isolation.

### 1. Authentication Module (`routes/auth.js`)

#### Test Cases:

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| AUTH-UT-01 | Test `login/success` returns 200 when user exists | Status 200, success: true, user object returned |
| AUTH-UT-02 | Test `login/failed` returns 401 when user doesn't exist | Status 401, success: false, failure message |
| AUTH-UT-03 | Test `logout` clears session and redirects | Session null, redirect to CLIENT_URL |
| AUTH-UT-04 | Test `google` OAuth redirect | Redirects to Google OAuth URL |
| AUTH-UT-05 | Test `google/callback` success redirect | Redirects to CLIENT_URL on success |
| AUTH-UT-06 | Test `google/callback` failure redirect | Redirects to /login/failed on failure |
| AUTH-UT-07 | Test Google OAuth scope includes profile | Request includes correct scope |
| AUTH-UT-08 | Test session regeneration on request | Session has regenerate and save methods |

### 2. Movie Data Routes

#### 2.1 Trending Routes (`routes/trending.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| TREND-UT-01 | Test GET `/trending` returns 200 status | Status 200 |
| TREND-UT-02 | Test response has success: true | success field is true |
| TREND-UT-03 | Test response contains trending movie data | data array is not empty |
| TREND-UT-04 | Test GET `/trending` handles server error | Status 500, success: false |
| TREND-UT-05 | Test data structure contains required fields | All movie objects have id, title, etc. |

#### 2.2 Upcoming Routes (`routes/upcoming.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| UPC-UT-01 | Test GET `/upcoming` returns 200 status | Status 200 |
| UPC-UT-02 | Test response contains upcoming movies | data array populated |
| UPC-UT-03 | Test error handling for corrupted JSON | Status 500, proper error message |

#### 2.3 Recommended Routes (`routes/recommended.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| REC-UT-01 | Test GET `/recommended` returns 200 | Status 200 |
| REC-UT-02 | Test recommended movies are returned | data array not empty |
| REC-UT-03 | Test empty data handling | Proper response structure |

#### 2.4 Top Rated Routes (`routes/toprated.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| TOP-UT-01 | Test GET `/toprated` returns 200 | Status 200 |
| TOP-UT-02 | Test movies sorted by rating | Ratings in descending order |

#### 2.5 Search Pages Routes (`routes/searchpages.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| SEARCH-UT-01 | Test GET `/searchpages` returns 200 | Status 200 |
| SEARCH-UT-02 | Test search results structure | Correct data format |

### 3. Carousel Routes (`routes/carousel1-5.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| CAR-UT-01 | Test GET `/carousel1` returns 200 | Status 200 |
| CAR-UT-02 | Test GET `/carousel2` returns 200 | Status 200 |
| CAR-UT-03 | Test GET `/carousel3` returns 200 | Status 200 |
| CAR-UT-04 | Test GET `/carousel4` returns 200 | Status 200 |
| CAR-UT-05 | Test GET `/carousel5` returns 200 | Status 200 |
| CAR-UT-06 | Test each carousel returns unique data | Different carousel content |
| CAR-UT-07 | Test carousel data format | Proper image/title structure |

### 4. Filter Routes (`routes/filter.js`)

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| FILT-UT-01 | Test GET `/filter` returns 200 | Status 200 |
| FILT-UT-02 | Test filter options are returned | Filter data present |
| FILT-UT-03 | Test filter data structure | Proper genre/year filters |

### 5. Server Configuration Tests

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| SERV-UT-01 | Test server starts on correct port | Server listens on PORT 5000 |
| SERV-UT-02 | Test root route returns API info | Welcome message with endpoints |
| SERV-UT-03 | Test Swagger docs accessible | /api-docs returns HTML |
| SERV-UT-04 | Test CORS middleware configured | Proper CORS headers |
| SERV-UT-05 | Test session middleware configured | Session cookie set |
| SERV-UT-06 | Test passport initialized | Authentication available |

---

## Integration Testing Cases

Integration testing verifies that different modules work together correctly.

### 1. Authentication Flow Integration Tests

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| AUTH-IT-01 | Complete Google OAuth flow | User authenticated, redirected to home |
| AUTH-IT-02 | Failed OAuth login flow | User redirected to failure page |
| AUTH-IT-03 | Session persists across requests | Session maintained after login |
| AUTH-IT-04 | Logout clears all session data | User logged out completely |
| AUTH-IT-05 | Protected route without auth | Redirect to login |

### 2. API Endpoint Integration Tests

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| API-IT-01 | Test all movie endpoints respond | All routes return 200 |
| API-IT-02 | Test data consistency across endpoints | No duplicate data issues |
| API-IT-03 | Test endpoint response time | Response < 500ms |
| API-IT-04 | Test concurrent requests handling | Multiple requests handled |
| API-IT-05 | Test error responses across all routes | Consistent error format |

### 3. Database Integration Tests

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| DB-IT-01 | Test PostgreSQL connection | Successful connection |
| DB-IT-02 | Test user data retrieval | User data returned correctly |
| DB-IT-03 | Test database query performance | Queries execute efficiently |
| DB-IT-04 | Test database error handling | Proper error messages |
| DB-IT-05 | Test connection pooling | Multiple connections handled |

### 4. Middleware Integration Tests

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| MID-IT-01 | Test CORS with valid origin | Request allowed |
| MID-IT-02 | Test CORS with invalid origin | Request blocked |
| MID-IT-03 | Test session middleware | Session created |
| MID-IT-04 | Test passport session | User serialized/deserialized |
| MID-IT-05 | Test Swagger integration | API docs load correctly |

### 5. End-to-End User Flows

| Test ID | Test Case Description | Expected Result |
|---------|----------------------|------------------|
| E2E-IT-01 | User login → Browse movies → Logout | Complete flow works |
| E2E-IT-02 | Access carousel data → Filter movies | Data displays correctly |
| E2E-IT-03 | Search movies → View results | Search works properly |
| E2E-IT-04 | API documentation access | Docs load and function |

---

## Beta Testing Cases

Beta testing involves real-world testing with potential users in a production-like environment.

### 1. Functional Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-FT-01 | User registration and login | Manual | Users can create accounts and login |
| BETA-FT-02 | Google OAuth login | Manual | Users can login with Google |
| BETA-FT-03 | Browse trending movies | Manual | Trending movies display correctly |
| BETA-FT-04 | Browse upcoming movies | Manual | Upcoming movies display correctly |
| BETA-FT-05 | Browse recommended movies | Manual | Recommendations are relevant |
| BETA-FT-06 | Browse top rated movies | Manual | Top rated list displays properly |
| BETA-FT-07 | Search functionality | Manual | Search returns accurate results |
| BETA-FT-08 | Filter movies by genre | Manual | Filters work correctly |
| BETA-FT-09 | View carousel content | Manual | All 5 carousels display properly |
| BETA-FT-10 | Logout functionality | Manual | User logged out successfully |

### 2. Performance Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-PT-01 | API response time | Load Testing | < 200ms average response |
| BETA-PT-02 | Concurrent user handling | Load Testing | 100+ simultaneous users |
| BETA-PT-03 | Memory usage | Profiling | < 200MB memory usage |
| BETA-PT-04 | CPU utilization | Profiling | < 50% CPU under load |
| BETA-PT-05 | Database query performance | Profiling | < 100ms per query |

### 3. Security Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-ST-01 | SQL injection prevention | Security Testing | No injection possible |
| BETA-ST-02 | XSS prevention | Security Testing | Scripts blocked |
| BETA-ST-03 | CSRF protection | Security Testing | Tokens validated |
| BETA-ST-04 | Session hijacking prevention | Security Testing | Secure sessions |
| BETA-ST-05 | CORS configuration | Security Testing | Only allowed origins |
| BETA-ST-06 | API rate limiting | Security Testing | Requests throttled |
| BETA-ST-07 | Password encryption | Security Testing | Passwords hashed |
| BETA-ST-08 | OAuth security | Security Testing | Proper token validation |

### 4. Usability Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-UT-01 | API documentation clarity | User Feedback | Easy to understand |
| BETA-UT-02 | Error message clarity | User Feedback | Messages are helpful |
| BETA-UT-03 | Response format consistency | Code Review | Consistent JSON structure |
| BETA-UT-04 | Swagger UI accessibility | User Feedback | Easy to navigate |

### 5. Compatibility Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-CT-01 | Browser compatibility | Cross-browser | Works on Chrome, Firefox, Safari |
| BETA-CT-02 | Mobile device access | Mobile Testing | Responsive on mobile |
| BETA-CT-03 | Different screen sizes | Responsive | UI adapts correctly |
| BETA-CT-04 | PostgreSQL versions | Compatibility | Works with PostgreSQL 12+ |
| BETA-CT-05 | Node.js versions | Compatibility | Works with Node.js 14+ |

### 6. Regression Beta Tests

| Test ID | Test Case Description | Test Method | Success Criteria |
|---------|----------------------|-------------|------------------|
| BETA-RT-01 | Authentication still works | Automated | No auth breaks |
| BETA-RT-02 | All endpoints respond | Automated | No 404 errors |
| BETA-RT-03 | Data integrity maintained | Automated | No data corruption |
| BETA-RT-04 | Session management | Automated | No session leaks |
| BETA-RT-05 | API backward compatibility | Automated | No breaking changes |

---

## Testing Approaches & Methods

### 1. Unit Testing Approaches

#### Mocking Strategy
- **JSON Data Mocking**: Mock the JSON data files for route testing
- **Database Mocking**: Use mock database responses
- **Session Mocking**: Mock express-session for auth tests
- **Passport Mocking**: Mock passport strategies

#### Testing Libraries
```
javascript
// Example test setup with Jest and Supertest
const request = require('supertest');
const app = require('../server');

// Mock data
const mockTrendingData = require('../CustomData/Trendingdata.json');

// Unit test example
describe('GET /trending', () => {
  it('should return trending movies', async () => {
    const response = await request(app)
      .get('/trending')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });
});
```

### 2. Integration Testing Approaches

#### Test Database Setup
- Use separate test database instance
- Seed with test data
- Clean up after each test

#### HTTP Integration Testing
```
javascript
// Integration test example
describe('API Integration Tests', () => {
  let authToken;
  
  beforeAll(async () => {
    // Setup test database
    await setupTestDatabase();
  });
  
  afterAll(async () => {
    // Cleanup
    await cleanupTestDatabase();
  });
  
  it('should authenticate user and return token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    
    expect(response.status).toBe(200);
    authToken = response.body.token;
  });
  
  it('should access protected route with token', async () => {
    const response = await request(app)
      .get('/recommended')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
  });
});
```

### 3. Beta Testing Methods

#### Manual Testing Checklist
- [ ] Complete user flows
- [ ] Edge case handling
- [ ] Error message verification
- [ ] UI/UX feedback collection

#### Automated Beta Testing
```
javascript
// Beta test automation script
const axios = require('axios');

async function runBetaTests() {
  const results = [];
  
  // Performance test
  const startTime = Date.now();
  await axios.get('http://localhost:5000/trending');
  const duration = Date.now() - startTime;
  results.push({ test: 'Performance', duration, passed: duration < 200 });
  
  // Load test
  const loadResults = await Promise.all(
    Array(100).fill().map(() => axios.get('http://localhost:5000/trending'))
  );
  results.push({ test: 'Load Test', passed: loadResults.every(r => r.status === 200) });
  
  return results;
}
```

### 4. Testing Tools & Frameworks

| Tool | Purpose | Type |
|------|---------|------|
| Jest | Unit & Integration Testing | Framework |
| Supertest | HTTP Assertions | Library |
| Postman | API Testing | Manual Tool |
| JMeter | Load Testing | Performance |
| OWASP ZAP | Security Testing | Security |
| Selenium | E2E Testing | Automation |

### 5. Test Coverage Goals

| Module | Target Coverage |
|--------|-----------------|
| Authentication | 90%+ |
| Movie Routes | 85%+ |
| Filter/Search | 80%+ |
| Middleware | 75%+ |
| Server Config | 70%+ |

### 6. CI

```
yaml
/CD Integration# .github/workflows/test.yml
name: Test Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm run test:unit
      - name: Run integration tests
        run: npm run test:integration
      - name: Generate coverage
        run: npm run test:coverage
```

---

## Test Execution Guidelines

### Running Tests

```
bash
# Install test dependencies
npm install --save-dev jest supertest

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage

# Run specific test file
npx jest tests/auth.test.js
```

### Test Environment Variables

```
env
# .env.test
NODE_ENV=test
APP_PORT=5001
DATABASE_URL=postgresql://test:test@localhost:5432/testdb
SESSION_SECRET=test-secret
GOOGLE_CLIENT_ID=test-client-id
GOOGLE_CLIENT_SECRET=test-client-secret
```

---

## Appendix

### A. Response Format Standards

All API responses should follow this format:
```
json
{
  "success": true/false,
  "data": {},
  "error": "Error message (optional)"
}
```

### B. HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

### C. Testing Best Practices

1. **Isolation**: Each test should be independent
2. **Repeatability**: Tests should produce consistent results
3. **Clarity**: Test names should be descriptive
4. **Coverage**: Aim for high code coverage
5. **Automation**: Automate where possible
6. **Documentation**: Document all test cases

---

*Document Version: 1.0*
*Last Updated: 2024*
*Author: Development Team*
