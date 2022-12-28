import Link from 'next/link';
import React from 'react';

type SearchResultProps = {
  location: {
    address: string;
    id: number;
    lat: number;
    lng: number;
  };
}

const SearchResult = ({location}: SearchResultProps, startTime, endTime): JSX.Element => {
  const { address, id, lat, lng, distance } = location;
  return (
    <div key={id}>
      <h3>Address: {address}</h3>
      <div>lat: {lat}</div>
      <div>lng: {lng}</div>
      <div>Distance: {distance}</div>
      <button>
      <Link href={{ pathname: '/reservation', query: {startTime, endTime, address}}}>Book Now</Link>
      </button>
    </div>
  );
}

export default SearchResult;