1. Run npm install in the terminal.
2. Create a file named .env in the project folder containing the following:
   VITE_API_BASE_URL=http://localhost:3333
3. In one terminal run npx json-server --watch db/db.json --port 3333
4. In a second terminal run npm run dev
5. Open http://localhost:5173 in that second terminal