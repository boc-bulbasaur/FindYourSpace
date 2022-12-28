import React from 'react'
import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react'
import { IoLocation } from "react-icons/io5";

type MapProps = {
  coordinates: {
    lat: number;
    lng: number;
  };
  results: {}[];
}

const Map = ({coordinates, results}: MapProps) =>{
  return (
  <Box position={'absolute'} right={0} width={'60%'} height = {'100%'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          center = {coordinates}
          defaultZoom = {15}
          margin = {[50,50,50,50]}
          option= {''}
          onchange = {()=>{}}
          onChildClick = {()=>{}}
    >
      <div
        lat = {coordinates.lat}
        lng = {coordinates.lng}
        position={'relative'}
        cursor = {'poniter'}
        zIndex={100}
       >
          <IoLocation color = 'red' fontSize={40} />
      </div>
      {results && results.map((location):JSX.Element => {
        const { lat, lng, price, id } = location;
        return (
        <div
          key={id}
          lat = {lat}
          lng = {lng}
          position={'relative'}
          cursor = 'poniter'
          text={lat}
         >
          <IoLocation color = 'black' fontSize={40} />
        </div>)
      })}
    </GoogleMapReact>
  </Box>)
}

export default Map