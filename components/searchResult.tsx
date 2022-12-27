import React from 'react';

type SearchResultProps = {
  location: {
    address: string;
    id: number;
    lat: number;
    lng: number;
  };
}

const SearchResult = ({location}: SearchResultProps): JSX.Element => {
  const { address, id, lat, lng, distance } = location;
  return (
    <div key={id}>
      <h3>Address: {address}</h3>
      <div>lat: {lat}</div>
      <div>lng: {lng}</div>
      <div>Distance: {distance}</div>
    </div>
  );
}

export default SearchResult;