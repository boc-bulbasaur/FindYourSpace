import React from 'react'
const CronJob = require('cron').CronJob;
// import CronJob from 'cron.CronJob'

function CreateJob(time: any){
  const job = new CronJob(
    `${time} * * * * *`,
    function() {
      console.log(`You will see this message every ${time} second`);
    },
    null,
    true,

  );
  job.start()

}

export default CreateJob