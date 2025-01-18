# Full Stack E-commerce Platform

This project is a comprehensive Full Stack E-commerce website, inspired by platforms like Amazon and Flipkart. It provides a seamless shopping experience with a wide range of features for users and includes an admin portal for managing the platform.

## Features

### User Features
- **Authentication**: Sign up, sign in, and email verification for secure access.
- **Account Management**: Dedicated account page for users to manage personal details.
- **Product Browsing**: Search and filter products with ease.
- **Wishlist**: Save favorite items to a wishlist for later.
- **Shopping Cart**: Add products to a cart and manage quantities before purchase.
- **Order Placement**: Order products with an integrated payment system (Razorpay).
- **Order History**: View and track past orders.
- **Responsive Design**: Fully optimized for small and medium devices.
- **Logout**: Securely log out from the account.

### Admin Features
- **Admin Portal**: A separate portal for admins to manage products, categories, and orders.
- **Product Management**: Add, update, and delete products.
- **Category Management**: Organize products into categories.

### Backend APIs
This project includes a custom backend server with the following APIs:
- **User API**: Manage user data and authentication.
- **Cart API**: Handle user cart operations.
- **Wishlist API**: Save and retrieve wishlist items.
- **Order API**: Process and manage orders.
- **Product API**: Provide product information.
- **Category API**: Organize products into categories.

👉 **Server Repository**: Check out the backend server for this project [here](https://github.com/Kunal182001/FullStack_Ecommerce_Server).

## Technology Stack
- **Frontend**: React.js with Vite.js for fast development.
- **Backend**: Node.js and Express.js for server-side logic.
- **Database**: MongoDB for data storage.
- **Payment Integration**: Razorpay for secure transactions.
- **Deployment**: Hosted on Vercel for a seamless experience.

---

## Installation

To set up and run this project locally, use the following commands:

1. Clone the repository:
   ```bash
   git clone https://github.com/Kunal182001/FullStack_Ecommerce_Project.git
   cd E-Commerse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project:
   ```bash
   npm run dev
   ```

---

## Folder Structure

```
Ecommerse/
├── public/              # Static files such as icons, manifest, etc.
├── src/
│   ├── assets/          # Images and other static assets
│   ├── components/      # Reusable components (e.g., Navbar, Home, Admin, Sidebar, OTPbox)
│   ├── Data/            # Static data files for States
│   ├── Pages/           # Main site pages like Homepage, AccountPage, SignIn/SignUpPage, CartPage, etc.
│   ├── App.js           # Main app component
│   └── index.js         # Entry point to start the React application
└── README.md            # Project documentation
```

---

## Copyright

If you wish to use or modify this project, please give proper credit to the author by linking back to the [GitHub repository](https://github.com/Kunal182001/FullStack_Ecommerce_Project).

