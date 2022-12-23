require('dotenv').config()
const CronJob = require('cron').CronJob;
const { Client } = require('pg');
const handleEmail = require('./mail.js')
let connection = false

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
    CronStart('start')
    CronStart('end')
  }
});


const CronStart=(type)=>{
  let add;

  console.log(`Cron${type} started`)

  const job = new CronJob(
    `* * * * *`,
    async function() {
      const res = await client.query(`select *, ${type}_time, EXTRACT(EPOCH FROM (now() - ${type}_time)) > 900 AS difference from bookings`)
      if(res.rows.length > 0){
        res.rows.map((row)=>{
          // console.log(row)
          if (row.difference) {
            client.query(`SELECT users.name, users.email, locations.address, bookings.${type}_time
            from users
            JOIN locations
            on locations.id = users.user_id
            JOIN bookings
            on bookings.address_id = locations.id  where locations.id =${row.address_id}`, (err, res2) => {
            // client.query(`SELECT address from locations where id = ${row.address_id}`, (err, res2) => {
              if(err){
                console.log(err)
              } else{
                 name = res2.rows[0].name
                 add = res2.rows[0].address
                 email = res2.rows[0].email
                 let type_time = `${type}_time`
                 currentdate = new Date(res2.rows[0][`${type}_time`]);
                 var time = currentdate.getDate() + "/"
                           + (currentdate.getMonth()+1)  + "/"
                           + currentdate.getFullYear() + " @ "
                           + currentdate.getHours() + ":"
                           + currentdate.getMinutes() + ":"
                           + currentdate.getSeconds();

                 handleEmail(email, add, time, type, name)

              }
            })
          }
        })
      }
    },
    null,
    true,

  );
  job.start()

}
