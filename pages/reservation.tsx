import Link from 'next/link';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

export default function NewReservation() {
  return (
    <div className="newRes">
      <h1>CHECKOUT</h1>
      <h3>1234 USA Street, Sunnyvale, CA, 94560</h3>
      <h3>12/10/2023 10:30:00AM - 12/10/2023 02:30:00PM</h3>
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
      <p>To receive a full refund, guests must cancel at least 30 days before check-in. They can also get a full refund within 48 hours of booking if the cancellation occurs at least 14 days before check-in. If they cancel between 7 and 30 days before check-in, you’ll be paid 50% for all nights. If they cancel less than 7 days before check-in, you’ll be paid 100% for all nights.</p>
      <form /*onSubmit={onSubmit}*/>
        <h3>Billing Address</h3>
        <div className="billing">
          <div className="billing-row">
            <div className="billing-col col-50">
              <label className="label"><PersonIcon></PersonIcon>First Name</label>
              <input type="text" name="firstName" placeholder="John" />
            </div>
            <div className="billing-col col-50">
              <label className="label"><PersonIcon></PersonIcon>Last Name</label>
              <input type="text" name="lastName" placeholder="Doe"/>
            </div>
          </div>

          <br/>
            <div className="billing-col">
              <div className="billing-col address1">
                <label><HomeIcon></HomeIcon>Address Line 1</label>
                <input name="streetAddress" placeholder="1234 Main Street" />
                <br/>
              </div>
              <div className="billing-col">
                <label><HomeIcon></HomeIcon>Address Line 2</label>
                <input name="addAddress" placeholder="Apt / Suite / Unit (Optional)" />
                <br/>
              </div>

          </div>
          <div className="billing-row">
            <div className="billing-col col-33">
              <label>City</label>
              <input name="city" placeholder="New York City"/>
            </div>
            <div className="billing-col col-33">
              <label>State</label>
              <input name="state" placeholder="NY"/>
            </div>
            <div className="billing-col col-33">
              <label>Zip Code</label>
              <input name="zipcode" placeholder="77777"/>
            </div>
          </div>
        </div>
        <br />

        <div className="billing">
          <h3>Payment Information</h3>
          <p>Accepted Cards</p>
          <div className="cards">
          <Image
            src="/../public/visa.png"
            alt="credit cards"
            className="map"
            width={100}
            height={100}
          />
          <Image
            src="/../public/discover.png"
            alt="credit cards"
            className="map"
            width={100}
            height={100}
          />
          <Image
            src="/../public/american-express.png"
            alt="credit cards"
            className="map"
            width={100}
            height={100}
          />
          </div>
          <label>Name on Card</label>
          <input name="cardName" placeholder="John M. Doe" />
          <br />
          <label>Credit Card Number</label>
          <input name="cardNumb" placeholder="5555-8888-0000-1111" />
          <br />
          <div className="billing-row">
            <div className="billing-col col-50">
              <label>Expiry Date</label>
              <input name="expDate" placeholder="MM/YY" />
            </div>
            <div className="billing-col col-50">
              <label>CVV</label>
              <input name="cvv" placeholder="111" />
            </div>
          </div>
          <br/>
          <button type="submit">CHECKOUT</button>
        </div>
      </form>
      <footer>
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </footer>
    </div>
  );

}