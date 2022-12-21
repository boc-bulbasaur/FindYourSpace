const { Client } = require('pg');
const client = new Client({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
client.connect((err) => {
  if (err) {
    console.log('DB connection error', err);
  } else {
    console.log('DB connected');
  }
});

export default client;