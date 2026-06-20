## Seeding the OctoFit database

A seed script is included to initialize and populate the MongoDB database with sample data (users, workouts, sessions, and metrics).

From the backend directory:

1. Install dependencies:
   - npm install
2. Create environment file if needed:
   - cp .env.example .env
3. Run the seed script:
   - npm run seed

The seed script connects to MONGO_URI (default: mongodb://localhost:27017/octofit), clears relevant collections, and inserts sample documents.
