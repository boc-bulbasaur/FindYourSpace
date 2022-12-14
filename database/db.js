const { Client } = require('pg');
const client = new Client({
    type: "postgres",
    host: "localhost",
    port: 5432,
    user: "my_user",
    password: "root",
    database: "findyourspace",
  });
client.connect((err) => {
  if (err) {
    console.log('DB connection error', err);
  } else {
    console.log('DB connected');
  }
});

export default client;