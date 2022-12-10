import React from 'react';

type SearchResultProps = {
  key: number;
  address: String;
  price: number;
  description: String;
}

const SearchResult = ({key, address, price, description}: SearchResultProps): JSX.Element => {
  return (
    <div key={key}>
      <h3>Address: {address}</h3>
      <span>Price per hour: ${price}</span>
      <div>Description: <span>{description}</span></div>
    </div>
  );
}

export default SearchResult;