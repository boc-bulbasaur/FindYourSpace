import Link from 'next/link';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { createTheme } from '@mui/material/styles';
import NavBar from "../components/navBar";
import Payment from '../components/reservation/payment';

export default function NewReservation() {
  return (
    <div className="newRes">
      <NavBar/>
        <h2>
          <Link href="/"><ArrowBackIosNewIcon></ArrowBackIosNewIcon>Back to Search</Link>
        </h2>
      <h1>CHECKOUT</h1>
      <div className="price">
        <div className="details">
          <Image
            src="/../public/map.png"
            alt="map"
            className="map"
            width={350}
            height={250}
          />
          <p className="park-details">This parking spot is streetside parking. Please only park directly in front of the house addressed.</p>
        </div>
        <h4 className="right-price">$8.00 / hr X 4 Hours</h4>
        <hr />
        <h4 className="right-price">Total Price: $32.00</h4>
      </div>
      <h3>Cancellation Policy</h3>
      <p className="park-details">To receive a full refund, guests must cancel at least 30 days before check-in. They can also get a full refund within 48 hours of booking if the cancellation occurs at least 14 days before check-in. If they cancel between 7 and 30 days before check-in, you’ll be paid 50% for all nights. If they cancel less than 7 days before check-in, you’ll be paid 100% for all nights.</p>
      <Payment />
    </div>
  );

}