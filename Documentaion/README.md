## To run node application use the following command
npm start

## To run node application in debug mode
node --inspect server.js

# Committee API

## Setup
- Clone repo
- Run `npm install`
- Configure `.env` with DB credentials

## Endpoints
- POST http://localhost:3000/api/committees → Create a committee
  Payload:
  ```json
  {
    "committee_name": "Housing Fund July 2026",
    "cycle_frequency": "monthly",
    "installment_amount": 5000.00,
    "start_date": "2026-07-20",
    "end_date": "2027-07-20",
    "created_by": "Santosh"
  }
