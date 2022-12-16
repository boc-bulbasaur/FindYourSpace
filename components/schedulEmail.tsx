import React from 'react'
const CronJob = require('cron').CronJob;
// import CronJob from 'cron.CronJob'

function CreateJob(func){
  const job = new CronJob(
    '* * * * * *',
    function() {
      console.log('You will see this message every second');
    },
    null,
    true,

  );
  job.start()

}

export default CreateJob