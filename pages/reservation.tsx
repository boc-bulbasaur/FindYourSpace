import Link from 'next/link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';
import Booking from '../components/reservation/booking';
import styles from '../styles/reservation.module.css';
import {useRouter} from 'next/router'
import { useSession } from 'next-auth/react';
import Timer from '../components/reservation/countdownTimer';

export default function NewReservation() {
  let location;
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
  if (address){
    location = address.toString()
  }
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
      <NavBar session={session}/>
        <h2 className={styles.back}>
          <Link href="/search"><ArrowBackIosNewIcon className={styles.back}></ArrowBackIosNewIcon>Back to Search</Link>
        </h2>
      <Timer />
      <h1 className={styles.checkout}>CHECKOUT</h1>
      <div className={styles.newRes}>
        <div className={styles.rightHalf}>
          <Booking />
          <h3>Cancellation Policy</h3>
          <p className={styles.cancellation}>To receive a full refund, renters must cancel at least 1 hour before their rental start time. Renters can also get a full refund within 2 hours of booking if the cancellation occurs at least 24 hours before the rental start time. If the renter cancels less than an hour before the rental start time, they will pay the owner 50% for the entire rental duration.</p>
        </div>
        <div className={styles.leftHalf}>
          <Payment />
        </div>
      </div>
    </div>
  );

}