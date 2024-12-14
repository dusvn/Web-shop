# Online Store API

This project provides an API for an online store system that supports functionalities such as user registration, login, order management, product handling, and payments. It also supports admin functionalities like verifying users, approving credit cards, and managing product quantities.

## Key Features

### 1. User Authentication and Management

- **User Registration**: Allows users to create accounts. The system checks if the email is already taken before allowing registration.
- **Login**: Users can log in by providing their credentials (email and password). If valid, they receive a JWT token for further authenticated requests.
- **User Profile Management**: Users can view and update their profile information, such as name, address, email, and phone number. Passwords are hashed before being stored.
- **User Information Retrieval**: Logged-in users can view their information and associated billing details.
- **Email Notifications**: When a user registers, an email is sent to the admin notifying them of a new user.

### 2. Admin Features

- **Admin Verification**: Admins can approve or reject credit cards submitted by users. Once verified, users’ bills are created, and they can add funds.
- **Product Management**: Admins can add new products and update product quantities.
- **Currency Conversion**: Admins can convert currencies for users' billing accounts, ensuring the required balance exists.
- **User Approval for Verification**: Admins can view a list of users waiting for card approval and manually approve them.

### 3. Products and Inventory Management

- **Product Listings**: Users and admins can retrieve a list of all available products in the store.
- **Product Quantity Management**: Admins can increase the stock quantity for products by submitting data regarding the quantity to add.

### 4. Order Management

- **Placing Orders**: Users can place new orders by specifying the product, price, and currency.
- **Order Completion**: Orders are processed and marked as complete once fulfilled. Incomplete orders are grouped by buyer and marked as complete after processing.
- **Purchase History**: Users can view their completed purchases, including the date, price, and product details.
- **Live Purchases (Admin Only)**: Admins can view ongoing orders and process them.

### 5. Currency and Billing System

- **Adding Funds**: Users can add funds to their account in the form of different currencies. If the currency already exists in their bill, the new funds are added to the existing balance. Otherwise, a new currency is added.
- **Currency Conversion**: Users can convert their funds between different currencies. Admins manage the conversion rates and validate if the user has sufficient funds.

### 6. Email Integration

- **Email Notifications**: The system sends email notifications to users about order status updates and changes to their account (e.g., successful card verification).

### 7. Background Order Processing

A background process runs that checks for incomplete orders every minute, processes them, and updates the buyer’s bill accordingly. After processing, the buyer is notified via email about their completed orders.

## Supported User Roles

### 1. User (Regular User)

- **Registration and Login**: Can register and log in using email and password.
- **Profile Management**: Can view and update personal information, excluding admin-only details.
- **Product Viewing**: Can view all available products.
- **Order Placement**: Can place orders, check their purchase history, and add funds.
- **Currency Management**: Can add funds and convert currencies based on available balance.

### 2. Admin

- **User Management**: Can view and approve users' credit card submissions, verify user information, and view all users' information.
- **Product Management**: Can add new products and update quantities.
- **Order Management**: Can view all orders, process orders, and manage incomplete orders.
- **Funds and Currency Management**: Can perform currency conversions and manage funds for users' bills.
- **Live Purchase Tracking**: Can track all live and completed purchases.
- **Background Process Monitoring**: Admin can monitor the background process of order completion and ensure it runs smoothly.

## System Requirements

- **Flask** for API framework
- **Flask-JWT-Extended** for JWT-based authentication
- **Firebase** for user, product, and order data storage
- **Firestore** for database storage and querying
- **Mailgun API** for email notifications
- **Google Cloud Firestore SDK** for handling cloud storage
- **Python 3.x** (Flask environment)
