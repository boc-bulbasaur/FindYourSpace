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
    priceTag: number;
    url: string;
    type: string;
    attended: boolean;
    gated: boolean;
    electric: boolean;
    garage: boolean;
    always_available: boolean;
    high_clearance: boolean;
    description: string;
    duration: number;
    price: number;
  };
  startTime: string;
  endTime: string;
}


const SearchResultZoom = ({ location, startTime, endTime }: SearchResultProps): JSX.Element => {
  const { address, id, distance, priceTag, url, attended, gated, type, duration, price,
    electric, garage, always_available, high_clearance, description } = location;

  const checkMark = <span>&#10003;</span>;

  const crossMark = <span>&#10005;</span>;

  return (
    <Box sx={{
      border: 'solid 2px black',
      borderRadius: '10px',
      marginTop: '5px',
      borderColor: '#1976D2',
    }}>
      <Grid container key={id} spacing={0.25} margin={'auto'}>
        <Grid item xs={12} margin={'10px'} >
          <Box className={styles.address} >Address: {address}</Box>
          <Box className={styles.distance} >Distance: {Math.round(distance)} m</Box>
          <Box className={styles.price} >Price: {priceTag}</Box>
          <Box className={styles.description} >Description: {description}</Box>
        </Grid>
        <Grid container item xs={12} margin={'10px'}>
          <Grid container item direction={'column'} xs={6}>
            <Grid item xs={12} sm={6} >
              <div>Type: {type}</div>
              <div>Attended: {attended ? checkMark : crossMark}</div>
              <div>Gated: {gated ? checkMark : crossMark}</div>
              <div>Electric Charger: {electric ? checkMark : crossMark}</div>
              <div>Garage Parking: {garage ? checkMark : crossMark}</div>
              <div>Always Available: {always_available ? checkMark : crossMark}</div>
              <div>High Clearance: {high_clearance ? checkMark : crossMark}</div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} overflow='hidden' position={'relative'}>
            <img src={url} alt={`picture for ${address}`} width={'100%'} height={'auto'}/>
          </Grid>
        </Grid>
      </Grid>
        <Link
          href={{
            pathname: '/reservation',

            query: { address, startTime: Date.parse(startTime), endTime: Date.parse(endTime), duration, id, price},

          }}
        >
          <Button color='info'>Book Now!</Button>
        </Link>

    </Box>
  );
}

export default SearchResultZoom;