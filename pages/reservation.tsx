import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';
import Booking from '../components/reservation/booking';
import styles from '../styles/reservation.module.css';

export default function NewReservation() {
  const router = useRouter();
	const { success, canceled } = router.query;

	useEffect(() => {
		if (success !== undefined || canceled !== undefined) {
			if (success) {
				console.log(
					'Order placed! You will receive an email confirmation.'
				);
			}

			if (canceled) {
				console.log(
					'Order canceled -- continue to shop around and checkout when you’re ready.'
				);
			}
		}
	}, [success, canceled]);

  return (
    <div className="newRes">
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
          {/* <Payment /> */}
        </div>
      </div>

      <form action='/api/checkout_sessions' method='POST'>
			<section>
				<div>{success ? (<div>Payment Successful!</div>) : (<div></div>)}</div>
				<button type='submit' role='link'>
					Go to payment
				</button>
			</section>
      <style jsx>
				{`
					section {
						background: #ffffff;
						display: absolute;
						flex-direction: column;
						width: 450px;
						height: 112px;
						border-radius: 6px;
						justify-content: center;
					}
					button {
						height: 45px;
						padding: 10px;
						background: #556cd6;
						border-radius: 4px;
						color: white;
						border: 0;
						font-size: 18px;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.2s ease;
						box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            content-align: center;
					}
					button:hover {
						opacity: 0.8;
					}
				`}
			</style>
		  </form>

      <footer>
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </footer>
    </div>
  );
}