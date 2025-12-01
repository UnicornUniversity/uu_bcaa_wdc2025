# Transaction Management Server

Express.js REST API server for managing financial transactions and categories.

## Overview

This is a Node.js backend application that provides RESTful API endpoints for:
- Managing financial transactions (CRUD operations)
- Managing transaction categories (CRUD operations)
- Data validation and business logic enforcement
- JSON file-based data storage

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **AJV 8.17.1** - JSON schema validation
- **ajv-formats 3.0.1** - Additional validation formats (dates, etc.)

## Architecture

The server follows a layered architecture pattern:

```
server/
├── index.js                    # Application entry point
├── controller/                 # Route handlers
│   ├── transaction-controller.js
│   └── category-controller.js
├── abl/                        # Application Business Logic
│   ├── transaction/
│   │   ├── create-abl.js
│   │   ├── get-abl.js
│   │   ├── list-abl.js
│   │   ├── update-abl.js
│   │   └── delete-abl.js
│   └── category/
│       ├── create-abl.js
│       ├── get-abl.js
│       ├── list-abl.js
│       ├── update-abl.js
│       └── delete-abl.js
├── dao/                        # Data Access Object
│   ├── transaction-dao.js
│   ├── category-dao.js
│   └── storage/                # JSON file storage
│       ├── Transaction.json
│       └── Category.json
└── package.json
```

### Layer Responsibilities

1. **Controller Layer** (`controller/`)
   - Defines HTTP routes
   - Delegates to ABL layer
   - Handles HTTP request/response

2. **ABL Layer** (`abl/`)
   - Business logic validation
   - Input validation using JSON schemas
   - Business rule enforcement
   - Calls DAO layer

3. **DAO Layer** (`dao/`)
   - Data persistence operations
   - File I/O operations
   - Data transformation

## API Endpoints

### Transaction Endpoints

#### Create Transaction
```
POST /transaction/create
Content-Type: application/json

Request Body:
{
  "counterparty": "string (required, max 150 chars)",
  "amount": "number (required)",
  "date": "string (required, format: YYYY-MM-DD)",
  "note": "string (optional, max 250 chars)",
  "categoryId": "string (required)"
}

Response: 200 OK
{
  "id": "string",
  "counterparty": "string",
  "amount": number,
  "date": "string",
  "note": "string",
  "categoryId": "string",
  "cts": "ISO timestamp"
}

Error Responses:
- 400: Validation error or business rule violation
- 500: Server error
```

#### Get Transaction
```
GET /transaction/get?id=<transactionId>

Response: 200 OK
{
  "id": "string",
  "counterparty": "string",
  "amount": number,
  "date": "string",
  "note": "string",
  "categoryId": "string",
  "cts": "ISO timestamp"
}

Error Responses:
- 400: Transaction not found or invalid ID
- 500: Server error
```

#### List Transactions
```
GET /transaction/list

Response: 200 OK
[
  {
    "id": "string",
    "counterparty": "string",
    "amount": number,
    "date": "string",
    "note": "string",
    "categoryId": "string",
    "cts": "ISO timestamp"
  },
  ...
]
```

#### Update Transaction
```
POST /transaction/update
Content-Type: application/json

Request Body:
{
  "id": "string (required, 16 chars)",
  "counterparty": "string (optional)",
  "amount": "number (optional)",
  "date": "string (optional, format: YYYY-MM-DD)",
  "note": "string (optional)",
  "categoryId": "string (optional)"
}

Response: 200 OK
{
  "id": "string",
  "counterparty": "string",
  "amount": number,
  "date": "string",
  "note": "string",
  "categoryId": "string",
  "cts": "ISO timestamp"
}

Error Responses:
- 400: Validation error, transaction not found, or business rule violation
- 500: Server error
```

#### Delete Transaction
```
POST /transaction/delete
Content-Type: application/json

Request Body:
{
  "id": "string (required)"
}

Response: 200 OK
{}

Error Responses:
- 400: Transaction not found or invalid ID
- 500: Server error
```

### Category Endpoints

#### Create Category
```
POST /category/create
Content-Type: application/json

Request Body:
{
  "name": "string (required)"
}

Response: 200 OK
{
  "id": "string",
  "name": "string",
  "cts": "ISO timestamp"
}
```

#### Get Category
```
GET /category/get?id=<categoryId>

Response: 200 OK
{
  "id": "string",
  "name": "string",
  "desc": "string (optional)",
  "cts": "ISO timestamp (optional)"
}
```

#### List Categories
```
GET /category/list

Response: 200 OK
[
  {
    "id": "string",
    "name": "string",
    "desc": "string (optional)",
    "cts": "ISO timestamp (optional)"
  },
  ...
]
```

#### Update Category
```
POST /category/update
Content-Type: application/json

Request Body:
{
  "id": "string (required)",
  "name": "string (optional)"
}

Response: 200 OK
{
  "id": "string",
  "name": "string",
  "cts": "ISO timestamp"
}
```

#### Delete Category
```
POST /category/delete
Content-Type: application/json

Request Body:
{
  "id": "string (required)"
}

Response: 200 OK
{}
```

## Business Rules

### Transaction Rules
1. **Date Validation**: Transaction date must be today or in the past (cannot be future date)
2. **Category Validation**: `categoryId` must reference an existing category
3. **Required Fields**: `counterparty`, `amount`, `date`, and `categoryId` are required for creation
4. **ID Format**: Transaction ID must be exactly 16 characters (hexadecimal)

### Category Rules
1. **Name Required**: Category name is required
2. **Unique Names**: Category names should be unique (enforced by business logic)

## Data Storage

The application uses JSON files for data persistence:
- `dao/storage/Transaction.json` - Stores all transactions
- `dao/storage/Category.json` - Stores all categories

### Transaction Schema
```json
{
  "id": "string (16 chars, hex)",
  "counterparty": "string (max 150 chars)",
  "amount": "number",
  "date": "string (YYYY-MM-DD)",
  "note": "string (max 250 chars, optional)",
  "categoryId": "string",
  "cts": "ISO timestamp"
}
```

### Category Schema
```json
{
  "id": "string (hex)",
  "name": "string",
  "desc": "string (optional)",
  "cts": "ISO timestamp (optional)"
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

### Running the Server

Start the server:
```bash
node index.js
```

The server will start on port 8000. You should see:
```
Example app listening on port 8000
```

### Development

For development with auto-reload, you can use `nodemon`:
```bash
npm install -g nodemon
nodemon index.js
```

## Configuration

### Port Configuration
The server port is configured in `index.js`:
```javascript
const port = 8000;
```

### CORS
If you need to enable CORS for cross-origin requests, you can add:
```javascript
const cors = require('cors');
app.use(cors());
```

## Validation

The server uses AJV (Another JSON Schema Validator) for request validation:

### Transaction Create Schema
```javascript
{
  type: "object",
  properties: {
    counterparty: { type: "string", maxLength: 150 },
    amount: { type: "number" },
    date: { type: "string", format: "date" },
    note: { type: "string", maxLength: 250 },
    categoryId: { type: "string" }
  },
  required: ["counterparty", "amount", "date", "categoryId"],
  additionalProperties: false
}
```

### Transaction Update Schema
```javascript
{
  type: "object",
  properties: {
    id: { type: "string", minLength: 16, maxLength: 16 },
    counterparty: { type: "string" },
    amount: { type: "number" },
    date: { type: "string", format: "date" },
    note: { type: "string" },
    categoryId: { type: "string" }
  },
  required: ["id"]
}
```

## Error Handling

The server returns structured error responses:

### Validation Errors
```json
{
  "errorMessage": "validation of input failed",
  "params": { ... },
  "reason": [ ... ]
}
```

### Business Logic Errors
```json
{
  "code": "errorCode",
  "message": "Human-readable error message"
}
```

### Common Error Codes
- `invalidDate` - Transaction date is in the future
- `categoryDoesNotExist` - Referenced category ID doesn't exist
- `transactionNotFound` - Transaction with given ID doesn't exist

## Testing

### Manual Testing with cURL

Create a transaction:
```bash
curl -X POST http://localhost:8000/transaction/create \
  -H "Content-Type: application/json" \
  -d '{
    "counterparty": "Tesco",
    "amount": -1500,
    "date": "2025-11-30",
    "categoryId": "0e16b70bf887420e",
    "note": "nákup"
  }'
```

List transactions:
```bash
curl http://localhost:8000/transaction/list
```

## Data Management

### Initial Data
The server comes with:
- Pre-populated categories in `dao/storage/Category.json`
- Sample transactions in `dao/storage/Transaction.json`

### Backup
Before making significant changes, consider backing up the JSON files:
```bash
cp dao/storage/Transaction.json dao/storage/Transaction.json.backup
cp dao/storage/Category.json dao/storage/Category.json.backup
```

## Security Considerations

⚠️ **Note**: This is a development server. For production use, consider:
- Authentication and authorization
- Input sanitization
- Rate limiting
- HTTPS/TLS encryption
- Database instead of JSON files
- Environment variable configuration
- Proper error logging
- Request validation middleware

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process or change port in index.js
```

### JSON File Errors
If JSON files become corrupted:
- Restore from backup
- Ensure valid JSON syntax
- Check file permissions

### Validation Errors
- Verify request body matches schema
- Check required fields are present
- Ensure date format is YYYY-MM-DD
- Verify categoryId exists

## Future Enhancements

Potential improvements:
- Database integration (MongoDB, PostgreSQL, etc.)
- Authentication/authorization
- Pagination for list endpoints
- Filtering and sorting
- Transaction statistics endpoints
- Export functionality
- Logging and monitoring
- Unit and integration tests
- API documentation (Swagger/OpenAPI)

