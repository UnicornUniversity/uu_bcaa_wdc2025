# Transaction Management Client

React-based frontend application for managing financial transactions and categories.

## Overview

This is a single-page application built with React that provides a user interface for:
- Viewing a list of transactions
- Creating new transactions
- Updating existing transactions
- Managing transaction categories

## Technology Stack

- **React 19.2.0** - UI library
- **React Bootstrap 2.10.10** - UI components
- **Bootstrap 5.3.8** - CSS framework
- **Material Design Icons** - Icon library (@mdi/react, @mdi/js)

## Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── App.js          # Main application component
│   ├── Header.js       # Header component with refresh and create buttons
│   ├── TransactionList.js      # Main transaction list view
│   ├── Transaction.js         # Individual transaction card component
│   ├── TransactionModal.js    # Modal form for create/update transactions
│   ├── TransactionListProvider.js  # Context provider for transaction data
│   ├── CategoryListProvider.js     # Context provider for category data
│   └── index.js        # Application entry point
└── package.json
```

## Components

### App.js
Root component that sets up the provider hierarchy:
- `TransactionListProvider` - Manages transaction state and API calls
- `CategoryListProvider` - Manages category state and API calls
- `TransactionList` - Main view component

### Header.js
Displays the page header with:
- Page title
- Current time display
- Refresh button (reloads transaction list)
- "Nová transakce" button (opens create modal)

### TransactionList.js
Main container component that:
- Manages modal state (show/hide, selected transaction)
- Renders the list of transactions
- Handles loading and error states
- Passes edit handlers to Transaction components

### Transaction.js
Displays individual transaction cards with:
- Counterparty name
- Transaction date (formatted in Czech locale)
- Amount (formatted in Czech locale)
- Category name
- Edit button (pencil icon)

### TransactionModal.js
Reusable modal form component that works for both:
- **Create mode**: Opens with empty form when creating new transaction
- **Edit mode**: Opens with pre-filled form when editing existing transaction

**Form Fields:**
- `counterparty` (required, max 150 chars) - Transaction counterparty
- `amount` (required, number) - Transaction amount (positive or negative)
- `date` (required, date) - Transaction date (must be today or in the past)
- `categoryId` (required, select) - Category selection dropdown
- `note` (optional, max 250 chars) - Additional notes

**Features:**
- Form validation
- Error message display
- Loading states during submission
- Auto-refreshes transaction list after successful save

### TransactionListProvider.js
React Context provider that manages:
- Transaction data state
- Loading/error states
- API communication methods:
  - `fetchTransactions()` - GET /transaction/list
  - `createTransaction(data)` - POST /transaction/create
  - `updateTransaction(data)` - POST /transaction/update
  - `deleteTransaction(id)` - POST /transaction/delete

**Usage:**
```javascript
import { useTransactionList } from './TransactionListProvider';

function MyComponent() {
  const { data, status, error, handlerMap } = useTransactionList();
  
  // Access transaction list
  const transactions = data;
  
  // Check loading state
  if (status === 'loading') { ... }
  
  // Call API methods
  await handlerMap.createTransaction({ ... });
}
```

### CategoryListProvider.js
React Context provider that manages:
- Category data state
- Category map for quick lookups
- API communication methods for categories

**Usage:**
```javascript
import { useCategoryList } from './CategoryListProvider';

function MyComponent() {
  const { data, categoryMap } = useCategoryList();
  
  // Access category list
  const categories = data;
  
  // Lookup category by ID
  const category = categoryMap[categoryId];
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

**Note:** The client is configured to proxy API requests to `http://localhost:8000` (see `package.json`). Make sure the server is running on port 8000.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The client communicates with the backend server through the following endpoints:

### Transaction Endpoints
- `GET /transaction/list` - Fetch all transactions
- `POST /transaction/create` - Create new transaction
- `POST /transaction/update` - Update existing transaction
- `POST /transaction/delete` - Delete transaction

### Category Endpoints
- `GET /category/list` - Fetch all categories
- `POST /category/create` - Create new category
- `POST /category/update` - Update existing category
- `POST /category/delete` - Delete category

All API requests are automatically proxied to `http://localhost:8000` during development.

## Features

### Transaction Management
- ✅ View all transactions in a list
- ✅ Create new transactions via modal form
- ✅ Edit existing transactions via modal form
- ✅ Form validation (required fields, date constraints)
- ✅ Real-time list refresh after create/update
- ✅ Error handling and display
- ✅ Loading states

### User Interface
- ✅ Responsive Bootstrap-based design
- ✅ Material Design Icons
- ✅ Czech language interface
- ✅ Formatted dates and numbers (Czech locale)
- ✅ Modal dialogs for forms
- ✅ Loading indicators

## Development Notes

### State Management
The application uses React Context API for state management:
- Transaction state is managed by `TransactionListProvider`
- Category state is managed by `CategoryListProvider`
- Modal state is managed locally in `TransactionList` component

### Styling
- Bootstrap 5 is used for base styling
- React Bootstrap provides React components
- Custom styles can be added in `App.css` or `index.css`

### Date Handling
- Dates are stored in ISO format (YYYY-MM-DD)
- Displayed in Czech locale format
- Date inputs are restricted to today or past dates (server requirement)

## Troubleshooting

### API Connection Issues
- Ensure the server is running on port 8000
- Check that the proxy configuration in `package.json` is correct
- Verify CORS settings on the server if making direct requests

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `npm start -- --reset-cache`

## Future Enhancements

Potential improvements:
- Delete transaction functionality in UI
- Transaction filtering and sorting
- Date range filtering
- Category management UI
- Export functionality
- Transaction statistics/dashboard
