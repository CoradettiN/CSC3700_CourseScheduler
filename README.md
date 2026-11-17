1. Run npm install in the terminal.
2. Create a file named .env in the project folder containing the following:
   VITE_API_BASE_URL=http://localhost:3000
3. In your MySQL database, run server/sql/schema.sql first, then server/sql/seed.sql.
4. In the server folder, copy .env.example to a new file named .env and fill in the database host, user, password, and name.
5. In one terminal run cd server, then npm install, then npm run dev
6. In a second terminal (project root, not server) run npm run dev
7. Open the link from the second terminal