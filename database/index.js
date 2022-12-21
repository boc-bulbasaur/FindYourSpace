import { Client } from 'pg';
const connectionString = 'postgres://postgres:boc-space@findyourspace.cbchcncuuhes.us-west-1.rds.amazonaws.com:5432/findyourspace';

const db = new Client({
  connectionString,
})
db.connect();

export default db;