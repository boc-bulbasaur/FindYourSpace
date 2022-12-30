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
    // CronStart('end')
  }
});


const CronStart=(type)=>{
  let add;

  console.log(`Cron${type} started`)

  const job = new CronJob(
    `* * * * *`,
    async function() {
      const res = await client.query(`select *, ${type}_time, ABS(EXTRACT(EPOCH FROM (now() - ${type}_time))) <= 900 AS difference from bookings`)
      if(res.rows.length > 0){
        res.rows.map((row)=>{
          if (row.difference) {
            client.query(`SELECT users.name, users.email, locations.address, bookings.${type}_time
            from bookings
            JOIN locations
            on bookings.address_id = locations.id
            JOIN users
            on bookings.userid = users.user_id  where locations.id =${row.address_id}`, (err, res2) => {
              if(err){
                console.log(err)
              } else{
                 name = res2.rows[0].name
                 add = res2.rows[0].address
                //  email = res2.rows[0].email
                 email = 'shzf13@gmail.com'
                 currentdate = new Date(res2.rows[0][`${type}_time`]);
                 var hours = currentdate.getHours
                 var ampm = (hours >= 12) ? "PM" : "AM";
                 var time =
                 + currentdate.getFullYear() + "/"
                 + (currentdate.getMonth()+1)  + "/"
                 + currentdate.getDate() + " "
                 + currentdate.getHours() + ":"
                 + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes()
                 + ampm

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
