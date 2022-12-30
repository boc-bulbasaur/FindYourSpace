import Link from 'next/link';
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/search.module.css';
import { Button } from '@mui/material';
import Image from 'next/image';


type SearchResultProps = {
  location: {
    address: string;
    id: number;
    distance: number;
    price: number;
    url: string;
    attended: boolean;
    gated: boolean;
    electric: boolean;
    garage: boolean;
    always_available: boolean;
    high_clearance: boolean;
    description: string;
  };
  startTime: string;
  endTime: string;
}


const SearchResultZoom = ({ location, startTime, endTime }: SearchResultProps): JSX.Element => {
  const { address, id, distance, price, url, attended, gated,
    electric, garage, always_available, high_clearance, description } = location;

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
          <Box className={styles.description} >Description: {description}</Box>
        </Grid>
        <Grid container item xs={12} margin={'10px'}>
          <Grid container item direction={'column'} xs={6}>
            <Grid item xs={12} sm={6} >
              <div>Attended: {attended ? 'U+2713' : ''}</div>
              <div>Gated: {gated ? 'U+2713' : ''}</div>
              <div>Electric Charger: {electric ? 'U+2713' : ''}</div>
              <div>Garage Parking: {garage ? 'U+2713' : ''}</div>
              <div>Always Available: {always_available ? 'U+2713' : ''}</div>
              <div>High Clearance: {high_clearance ? 'U+2713' : ''}</div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} overflow='hidden' position={'relative'}>
            <Image src={url} fill alt={`picture for ${address}`} />
          </Grid>
        </Grid>
      </Grid>
        <Link
          href={{
            pathname: '/reservation',
            query: { address, startTime: Date.parse(startTime), endTime: Date.parse(endTime) },
          }}
        >
          <Button>Book Now!</Button>
        </Link>

    </Box>
  );
}

export default SearchResultZoom;