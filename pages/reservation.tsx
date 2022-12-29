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
  let start = new Date(Number(startTime)).toString();
  let end = new Date(Number(endTime)).toString()
  const { data: session } = useSession();
  return (
    <div>
      <NavBar session={session}/>
        <h2>
          <Link href="/search"><ArrowBackIosNewIcon className={styles.back}></ArrowBackIosNewIcon>Back to Search</Link>
        </h2>
      <div className={styles.newRes}>
        <h1 className={styles.checkout}>CHECKOUT</h1>
        <Booking address={address} start={start} end={end}/>
        <h3>Cancellation Policy</h3>
        <p className={styles.parkDetails}>To receive a full refund, guests must cancel at least 30 days before check-in. They can also get a full refund within 48 hours of booking if the cancellation occurs at least 14 days before check-in. If they cancel between 7 and 30 days before check-in, you’ll be paid 50% for all nights. If they cancel less than 7 days before check-in, you’ll be paid 100% for all nights.</p>
        <Payment />
      </div>
    </div>
  );

}