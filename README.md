# Ayurvedic Telemedicine Platform

A comprehensive platform combining telemedicine with personalized Ayurvedic healthcare, powered by AI.

## Features

- Video consultations with Ayurvedic practitioners
- AI-powered personalized diet and herbal formulation recommendations
- Online prescription and ordering of herbal products
- Remote patient monitoring
- Secure health records management
- Real-time chat and notifications

## Tech Stack

### Frontend

- React.js
- Material-UI
- Redux for state management
- WebRTC for video consultations
- Socket.io for real-time features

### Backend

- Node.js with Express.js
- MongoDB for database
- TensorFlow.js for AI recommendations
- JWT for authentication
- Socket.io for real-time communication

## Project Structure

```
├── frontend/                 # React frontend application
│   ├── public/              # Public assets
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Root component
│
├── backend/                 # Node.js backend application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── ai/                # AI models and logic
│
└── ml-models/              # Machine learning models
    ├── diet-recommender/   # Diet recommendation model
    └── herb-formulation/   # Herbal formulation model
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. Set up environment variables
4. Start the development servers:

   ```bash
   # Frontend
   npm run dev

   # Backend
   npm run dev
   ```

## Environment Variables

Create `.env` files in both frontend and backend directories:

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
