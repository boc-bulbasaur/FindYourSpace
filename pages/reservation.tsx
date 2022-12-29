import Link from 'next/link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';
import Booking from '../components/reservation/booking';
import styles from '../styles/reservation.module.css';
import {useRouter} from 'next/router'
import { useSession } from 'next-auth/react';

export default function NewReservation() {
  const router = useRouter()
  const {query: {address, startTime, endTime}} = router
  const timeFormat = (t) =>{
    let currentdate = new Date(Number(t));
    var time = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();
    return time
  }
  let start = timeFormat(startTime)
  let end = timeFormat(endTime)
  const { data: session } = useSession();
  let userEmail = session.user.email
  let userName = session.user.name
  let location = address.toString()
  let orderNumber = 8888
  let price = '40'
  // let userEmail = 'test@gmail.com'

  const confirmationEmail = async () =>{
    console.log('clicked')
    try {
      const res = await fetch('/api/notification/bookEmail',
      {
        method: 'POST',
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          orderNumber: orderNumber,
          price: price,
          start: start,
          end: end,
          address: location
        })
      }
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {userEmail} {userName}
      <NavBar session={session}/>
        <h2>
          <Link href="/search"><ArrowBackIosNewIcon className={styles.back}></ArrowBackIosNewIcon>Back to Search</Link>
        </h2>
      <div className={styles.newRes}>
        <h1 className={styles.checkout}>CHECKUT</h1>
        <Booking address={address} start={start} end={end}/>
        <h3>Cancellation Policy</h3>
        <p className={styles.parkDetails}>To receive a full refund, guests must cancel at least 30 days before check-in. They can also get a full refund within 48 hours of booking if the cancellation occurs at least 14 days before check-in. If they cancel between 7 and 30 days before check-in, you’ll be paid 50% for all nights. If they cancel less than 7 days before check-in, you’ll be paid 100% for all nights.</p>
        <Payment  confirmationEmail={confirmationEmail}/>
      </div>
    </div>
  );

}