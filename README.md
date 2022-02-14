# React-Solo-Project
Home bnb is a website to find a place for a quick get away.

To get started
1. Clone project with https://github.com/chiews89/React-Solo-Project.git
2. Run npm install in root directory to install dependencies
3. Create a .env file in your backend folder based off the .env.example file contents
4. Enter your database name, desired port, and usename and password into your .env file
5. Create a user in postgresql with psql -U CREATE USER name WITH PASSWORD 'password' CREATEDB;
6. GO into your backend folder from your terminal and run npm dotenv sequelize db:create to create your database with the name from your .env file
7. Run npx dotenv sequelize db:migrate then npx dotenv sequelize db:seed:all to migrate your tables and then seed them
8. Go into yoru backend folder from your terminal and run npm start and then do the same in your frontend folder in another terminal
