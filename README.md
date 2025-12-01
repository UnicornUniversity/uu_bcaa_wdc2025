# Transaction Management System

A full-stack web application for managing financial transactions and categories, built with React and Express.js.

## Project Overview

This application provides a complete solution for tracking financial transactions with the following features:
- View, create, update, and delete transactions
- Manage transaction categories
- Form validation and error handling
- Responsive user interface
- RESTful API backend

## Project Structure

```
uun_bcaa_wdc2025/
├── client/          # React frontend application
├── server/          # Express.js backend API
└── README.md        # This file
```

## Technology Stack

### Frontend (Client)
- React 19.2.0
- React Bootstrap 2.10.10
- Bootstrap 5.3.8
- Material Design Icons

### Backend (Server)
- Node.js
- Express.js 5.1.0
- AJV (JSON Schema Validation)
- JSON file-based storage

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone or navigate to the project directory**

2. **Install server dependencies:**
```bash
cd server
npm install
```

3. **Install client dependencies:**
```bash
cd ../client
npm install
```

### Running the Application

1. **Start the server** (in one terminal):
```bash
cd server
node index.js
```
Server will run on `http://localhost:8000`

2. **Start the client** (in another terminal):
```bash
cd client
npm start
```
Client will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## Features

### Transaction Management
- ✅ List all transactions with category information
- ✅ Create new transactions via modal form
- ✅ Update existing transactions
- ✅ Form validation (required fields, date constraints)
- ✅ Real-time list refresh
- ✅ Error handling and user feedback

### Category Management
- ✅ List all categories
- ✅ Category-based transaction organization
- ✅ Category validation

### User Interface
- ✅ Responsive Bootstrap design
- ✅ Material Design Icons
- ✅ Czech language interface
- ✅ Modal dialogs for forms
- ✅ Loading indicators
- ✅ Formatted dates and numbers

## API Endpoints

### Transactions
- `GET /transaction/list` - Get all transactions
- `POST /transaction/create` - Create new transaction
- `GET /transaction/get?id=<id>` - Get single transaction
- `POST /transaction/update` - Update transaction
- `POST /transaction/delete` - Delete transaction

### Categories
- `GET /category/list` - Get all categories
- `POST /category/create` - Create new category
- `GET /category/get?id=<id>` - Get single category
- `POST /category/update` - Update category
- `POST /category/delete` - Delete category

## Documentation

For detailed documentation, see:
- [Client Documentation](./client/README.md) - Frontend application details
- [Server Documentation](./server/README.md) - Backend API details

## Development

### Project Architecture

The project follows a clean architecture pattern:

**Client:**
- Component-based React architecture
- Context API for state management
- Provider pattern for data fetching

**Server:**
- Layered architecture (Controller → ABL → DAO)
- JSON schema validation
- File-based data persistence

### Data Storage

Data is stored in JSON files:
- `server/dao/storage/Transaction.json` - Transaction data
- `server/dao/storage/Category.json` - Category data

⚠️ **Note**: For production use, consider migrating to a proper database.

## Configuration

### Client Configuration
- Proxy: Configured to forward API requests to `http://localhost:8000`
- Port: 3000 (default React development server)

### Server Configuration
- Port: 8000
- CORS: Not enabled by default (add if needed)

## Testing

### Manual Testing
1. Start both server and client
2. Use the web interface to test all CRUD operations
3. Verify form validation
4. Test error scenarios

### API Testing
Use tools like Postman or cURL to test API endpoints directly. See [Server README](./server/README.md) for example requests.

## Troubleshooting

### Common Issues

**Port conflicts:**
- Server: Change port in `server/index.js`
- Client: Change port with `PORT=3001 npm start`

**API connection errors:**
- Ensure server is running on port 8000
- Check proxy configuration in `client/package.json`
- Verify CORS settings if making direct requests

**Module not found errors:**
- Run `npm install` in both client and server directories
- Clear `node_modules` and reinstall if needed

## Future Enhancements

Potential improvements:
- [ ] Database integration
- [ ] User authentication
- [ ] Transaction filtering and search
- [ ] Date range filtering
- [ ] Export functionality (CSV, PDF)
- [ ] Transaction statistics and charts
- [ ] Category management UI
- [ ] Delete transaction UI
- [ ] Unit and integration tests
- [ ] API documentation (Swagger)

## License

ISC

## Author

uun-project

---

For more details, see the individual README files in the `client/` and `server/` directories.

