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