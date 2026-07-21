## To run node application use the following command
npm start

## To run node application in debug mode
node --inspect server.js

# Committee API

## Setup
- Clone repo
- Run `npm install`
- Configure `.env` with DB credentials

## Endpoint to Create a Committee
- POST http://localhost:3000/api/committees
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

## Endpoint to Create Members for a Committee
- POST http://localhost:3000/api/committee-members/bulk-create
  Payload:
  ```json
  {
    "committee_name": "Housing Fund July 2026",
    "joined_by": 42,
    "members": [
      {
        "aadhaar": "123456789012",
        "name": "Santosh Kumar",
        "mobile": "9876543210",
        "email": "santosh@example.com",
        "password": "SecurePass@123",
        "relative_name": "Rajesh Kumar",
        "address": "Flat 101, Green Residency, Hyderabad",
        "pan": "ABCDE1234F"
      },
      {
        "aadhaar": "987654321098",
        "name": "Ravi Sharma",
        "mobile": "9123456780",
        "email": "ravi@example.com",
        "password": "AnotherPass@456",
        "relative_name": "Sunita Sharma",
        "address": "Plot 22, Jubilee Hills, Hyderabad",
        "pan": "PQRSX5678Z"
      }
    ]
  }

## Generate installments for the given committee_id
POST http://localhost:3000/api/installments/generate
Content-Type: application/json

Request body--

{
  "committee_id": 1
}

Response---
{
  "message": "Installments generated successfully"
}





  
