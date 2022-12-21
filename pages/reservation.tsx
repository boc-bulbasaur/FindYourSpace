import Link from 'next/link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';
import Booking from '../components/reservation/booking';
import styles from '../styles/reservation.module.css';

export default function NewReservation() {
  return (
    <div>
      <NavBar/>
        <h2>
          <Link href="/"><ArrowBackIosNewIcon className={styles.back}></ArrowBackIosNewIcon>Back to Search</Link>
        </h2>
      <div className={styles.newRes}>
        <h1 className={styles.checkout}>CHECKOUT</h1>
        <Booking />
        <h3>Cancellation Policy</h3>
        <p className={styles.parkDetails}>To receive a full refund, guests must cancel at least 30 days before check-in. They can also get a full refund within 48 hours of booking if the cancellation occurs at least 14 days before check-in. If they cancel between 7 and 30 days before check-in, you’ll be paid 50% for all nights. If they cancel less than 7 days before check-in, you’ll be paid 100% for all nights.</p>
        <Payment />
      </div>
    </div>
  );

}