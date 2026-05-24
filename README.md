# committee-api

## Setup

```bash
npm install
npm start
```

## Member Search Endpoints

GET /api/members/id/5 → returns member with ID 5

GET /api/members/aadhaar/123456789012 → returns single member

GET /api/members/pan/ABCDE1234F → returns single member

GET /api/members/email/ravi.kumar@example.com → returns single member

GET /api/members/name/Ravi Kumar → returns array of members with that name