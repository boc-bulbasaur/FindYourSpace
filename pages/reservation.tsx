import Link from 'next/link';
import React, { useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';
import Booking from '../components/reservation/booking';
import styles from '../styles/reservation.module.css';
import {useRouter} from 'next/router'
import { useSession } from 'next-auth/react';
import Timer from '../components/reservation/countdownTimer';
import generator from '../components/reservation/confirmationcode';

async function addData(listingId, location, start, end, email, code) {
  fetch(`api/reservation?listingId=${listingId}`, {
    method: 'POST',
    body: {
      address: location,
      startTime: start,
      endTime: end,
      email: email,
      code: code
    }
  })
    .then(() => {
      console.log('successfully added to db');
    })
    .catch(err => {
      console.log(err);
    })
}

export default function NewReservation(props) {
  let location;
  const router = useRouter()
  const {query: {address, startTime, endTime, id, duration, price}} = router
  const timeFormat = (t) =>{
    let currentdate = new Date(Number(t));
    var hours = new Date().getHours();
    var ampm = (hours >= 12) ? "PM" : "AM";
    var time =
              + currentdate.getFullYear() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getDate() + " "
              + currentdate.getHours() + ":"
              // + currentdate.getMinutes()
              + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes()
              + ampm
              // + currentdate.getSeconds();
    return time
  }
  let start = timeFormat(startTime)
  let end = timeFormat(endTime)
  const { data: session, status } = useSession();
  console.log('status', status);
  useEffect(()=>{
    if (status === 'unauthenticated') {
      router.push('/');
    }
  });
  // let userEmail = session.user.email;
  let userName = session.user.name;
  if (address){
    location = address.toString()
  }
  let orderNumber = generator();
  let userEmail = 'shzf13@gmail.com'

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
          price: totalPrice,
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

  // const data = await addData(id, location, start, end, userEmail, orderNumber);
  const totalPrice = Number(price) * Number(duration)
  if (status === 'authenticated') {
    return (
      <div>
        <NavBar session={session}/>
          <h2 className={styles.back}>
            <Link href="/search"><ArrowBackIosNewIcon className={styles.back}></ArrowBackIosNewIcon>Back to Search</Link>
          </h2>
        <Timer userId={props.userId} listing={id} code={orderNumber}/>
        <h1 className={styles.checkout}>CHECKOUT</h1>
        <div className={styles.newRes}>
          <div className={styles.rightHalf}>
            <Booking address={address} start={start} end={end} userId={props.userId} listing={id}/>
            <h3>Cancellation Policy</h3>
            <p className={styles.cancellation}>To receive a full refund, renters must cancel at least 1 hour before their rental start time. Renters can also get a full refund within 2 hours of booking if the cancellation occurs at least 24 hours before the rental start time. If the renter cancels less than an hour before the rental start time, they will pay the owner 50% for the entire rental duration.</p>
          </div>
          <div className={styles.leftHalf}>
            <Payment confirmationEmail={confirmationEmail} price={price} duration={duration} totalPrice={totalPrice}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (<></>)
  }

}