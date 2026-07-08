# Analytics Dashboard API

A REST API for storing and analyzing business records built with
Node.js, Express.js and MongoDB.

## Features
- Full CRUD for business records
- Pagination on listing route
- Aggregation reports by category, region, and month
- Overview statistics endpoint
- Joi validation and global error handling
- MongoDB indexes for performance

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /records                    - Create a record
- GET    /records                    - Get all records (paginated)
- GET    /records/:id                - Get a record by ID
- PUT    /records/:id                - Update a record
- DELETE /records/:id                - Delete a record
- GET    /records/summary/category   - Revenue by category
- GET    /records/summary/region     - Revenue by region
- GET    /records/summary/monthly    - Monthly revenue report
- GET    /records/summary/top5       - Top 5 highest records
- GET    /records/summary/overview   - Overall statistics