import Link from 'next/link';

export default function NewReservation() {
  return (
    <div>
      <h1>CHECKOUT</h1>
      <h3>1234 USA Street, Sunnyvale, CA, 94560</h3><h3>12/10/2023 10:30:00AM</h3>

      <form /*onSubmit={onSubmit}*/>
        <h3>Billing Address</h3>
        <label>First Name</label>
        <input name="firstName" placeholder="John" />
        <label>Last Name</label>
        <input name="lastName" placeholder="Doe"/>
        <br/>
        <label>Address Line 1</label>
        <input name="streetAddress" placeholder="1234 Main Street" />
        <br/>
        <label>Address Line 2</label>
        <input name="addAddress" placeholder="Apt / Suite / Unit (Optional)" />
        <br/>
        <label>City</label>
        <input name="city" placeholder="New York City"/>
        <label>State</label>
        <input name="state" placeholder="NY"/>
        <br/>
        <label>Zip Code</label>
        <input name="zipcode" placeholder="77777"/>
        <br />


        <h3>Payment Information</h3>
        <label>Name on Card</label>
        <input name="cardName" placeholder="John M. Doe" />
        <br />
        <label>Credit Card Number</label>
        <input name="cardNumb" placeholder="5555-8888-0000-1111" />
        <br />
        <label>Expiry Date</label>
        <input name="expDate" placeholder="MM/YY" />
        <label>CVV</label>
        <input name="cvv" placeholder="111" />

        <br/>
        <button type="submit">CHECKOUT</button>
      </form>
      <footer>
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </footer>
    </div>
  );

}