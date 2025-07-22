# Tarot Web Application

This is a full-stack web application that simulates Tarot card readings. It features user authentication, profile management, and the ability to request and view personalized Tarot readings with detailed card interpretations and images.

## Features

-   **User Authentication:** Register and log in with persistent sessions.
-   **User Profile Management:** View, update, and delete your user profile.
-   **Tarot Reading Selection:** Choose from predefined Tarot reading types (e.g., Celtic Cross, Three Card Spread).
-   **Dynamic Tarot Readings:** Get random Tarot card draws with upright/reversed meanings and associated images.
-   **Reading History:** View a history of all past Tarot reading requests, with the option to delete individual entries.
-   **Full 78-Card Deck:** Includes all Major and Minor Arcana cards with their interpretations.

## Technologies Used

-   **Frontend:** React.js
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (via Mongoose ODM)
-   **Authentication:** JSON Web Tokens (JWT)

## Project Structure

```
taro-web/
├── backend/                # Node.js/Express.js backend
│   ├── src/
│   │   ├── controllers/    # Business logic for API endpoints
│   │   ├── data/           # Tarot card deck data (tarotDeck.js)
│   │   ├── models/         # Mongoose schemas for MongoDB
│   │   ├── middleware/     # Authentication and validation middleware
│   │   ├── routes/         # API route definitions
│   │   ├── config/         # Database connection setup
│   │   └── server.js       # Main Express server file
│   ├── .env                # Environment variables (MongoDB URI, JWT Secret)
│   ├── package.json        # Backend dependencies and scripts
│   └── seed.js             # Script to populate initial Tarot reading types
└── frontend/               # React.js frontend
    ├── public/             # Static assets (including Tarot card images)
    │   └── images/
    │       └── tarot_cards/ # Tarot card images
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── context/        # React Context for authentication state
    │   ├── pages/          # Page-level React components (routes)
    │   ├── services/       # API service calls
    │   └── App.js          # Main React application component
    ├── package.json        # Frontend dependencies and scripts
    └── .env                # Frontend environment variables (if any)
```

## Installation and Setup

Follow these steps to get the application up and running on your local machine.

### Prerequisites

-   Node.js (v14 or higher recommended)
-   npm (Node Package Manager)
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/phimwa958/taro_web
cd taro_web
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

#### 2.1. Install Dependencies

```bash
npm install
```

#### 2.2. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

-   Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb+srv://user:password@cluster.mongodb.net/tarotdb?retryWrites=true&w=majority`).
-   Replace `your_jwt_secret_key` with a strong, random string for JWT signing.

#### 2.3. Seed the Database (Optional, but Recommended)

This will populate the database with initial Tarot reading types (e.g., Celtic Cross, Three Card Spread).

```bash
npm run seed
```

#### 2.4. Start the Backend Server

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd ../frontend
```

#### 3.1. Install Dependencies

```bash
npm install
```

#### 3.2. Tarot Card Images

Tarot card images are located in `frontend/public/images/tarot_cards/`. These images are sourced from the public domain Rider-Waite-Smith deck.

**Source:** [https://archive.org/details/rider-waite-tarot](https://archive.org/details/rider-waite-tarot)

#### 3.3. Start the Frontend Development Server

```bash
npm start
```

The frontend application will open in your browser at `http://localhost:3000`.

## Usage

1.  **Welcome Page:** Upon opening the application, you will see a welcome page. If you are logged in, it will offer a direct link to start a Tarot reading. If not, it will prompt you to log in or register.
2.  **Registration/Login:** Create a new account or log in with existing credentials. Your session will persist for 30 days unless you explicitly log out.
3.  **Tarot Readings:** Navigate to the "Tarot" section to select a reading type and receive a personalized card spread.
4.  **Dashboard:** View your user profile (with options to update or delete your account) and a history of all your past Tarot readings (with the option to delete individual entries).

## Contributing

Feel free to fork the repository and contribute to this project. Pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE). # You might want to create a LICENSE file if you haven't already.