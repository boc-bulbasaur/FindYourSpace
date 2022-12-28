import Link from 'next/link';
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/search.module.css';
import { Button } from '@mui/material';


type SearchResultProps = {
  location: {
    address: string;
    id: number;
    distance: number;
    price: number;
    url: string;
  };
  startTime: string;
  endTime: string;
}


const SearchResultZoom = ({ location, startTime, endTime }: SearchResultProps): JSX.Element => {
  const { address, id, distance, price, url } = location;

  return (
    <Box sx={{
      border: 'solid 2px black',
      borderRadius: '10px',
      marginTop: '5px',

    }}>
      <Grid container key={id} spacing={0.25} margin={'auto'}>
        <Grid item xs={12} margin={'10px'} >
          <Box className={styles.address} >Address: {address}</Box>
          <Box className={styles.distance} >Distance: {Math.round(distance)} m</Box>
          <Box className={styles.price} >Price: ${price}/hr</Box>
        </Grid>
        <Grid item xs={12} margin={'auto'}>

        </Grid>
      </Grid>

        <Link
          href={{
            pathname: '/reservation',
            query: { address },
          }}
        >
          <Button>Book Now!</Button>
        </Link>

    </Box>
  );
}

export default SearchResultZoom;