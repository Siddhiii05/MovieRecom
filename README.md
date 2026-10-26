# CineGenie Backend 🎬

The CineGenie backend handles authentication, movie-related API requests, and integration with the movie recommendation system.

## 🚀 Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Python Flask (Recommendation Engine)

## ✨ Features
- RESTful APIs for movie-related operations.
- User authentication using Google OAuth.
- Integration with a Python-based movie recommendation engine.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Siddhiii05/Movie_Recom.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd Movie_Recom
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure the `.env` file with the required environment variables:
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

## 🐍 Recommendation Engine

Install the required Python dependencies and start the Flask recommendation service separately.

## 📄 License
This project is intended for educational purposes.
