import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/search.module.css';
import { Typography } from '@mui/material';


type SearchResultProps = {
  location: {
    address: string;
    id: number;
    distance: number;
    priceTag: number;
  };
}


const SearchResult = ({location}: SearchResultProps): JSX.Element => {
  const { address, id, distance, priceTag } = location;
  return (
    <Box sx={{
      border: 'solid 2px lightgrey',
      borderRadius: '10px',
      marginTop: '5px',
    }}>
      <Grid container key={id} spacing={0.25} margin={'auto'}>
        <Grid item xs={12} sm={8.5} margin={'10px'} >
          <Box className={styles.address} >Address: {address}</Box>
          <Box className={styles.distance} >Distance: {Math.round(distance * 1000 / 1609.34) / 1000} mile</Box>
        </Grid>
        <Grid item xs={12} sm={2.5} margin={'auto'} >
          <Typography className={styles.price} color='#1976D2' >Price: {priceTag}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchResult;