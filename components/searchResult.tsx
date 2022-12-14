import React from 'react';

type SearchResultProps = {
  id: number;
  address: String;
  price: number;
  description: String;
}

const SearchResult = ({id, address, price, description}: SearchResultProps): JSX.Element => {
  return (
    <div key={id}>
      <h3>Address: {address}</h3>
      <span>Price per hour: ${price}</span>
      <div>Description: <span>{description}</span></div>
    </div>
  );
}

export default SearchResult;