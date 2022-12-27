import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/search.module.css';


type SearchResultProps = {
  location: {
    address: string;
    id: number;
    distance: number;
    price: number;
    url: string;
  };
}

const SearchResult = ({location}: SearchResultProps): JSX.Element => {
  const { address, id, distance, price, url } = location;
  return (
    <Box sx={{
      border: 'solid 2px lightgrey',
      borderRadius: '10px',
      marginTop: '5px',
    }}>
      <Grid container key={id} spacing={0.25} margin={'auto'}>
        <Grid xs={12} sm={8.5} margin={'10px'} >
          <Box className={styles.address} >Address: {address}</Box>
          <Box className={styles.distance} >Distance: {Math.round(distance)} m</Box>
        </Grid>
        <Grid xs={12} sm={2.5} color={'navy'} margin={'auto'}>
          <Box className={styles.price} >Price: ${price}/hr</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchResult;