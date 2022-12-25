import React from 'react'
import {Box} from '@chakra-ui/react'
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
  <Box position={'absolute'} right={0} width={'60%'} height = {'95%'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          center = {coordinates}
          defaultZoom = {15}
          margin = {[50,50,50,50]}
          option= {''}
          onchange = {()=>{}}
          onChildClick = {()=>{}}
    >
      <Box
        lat = {coordinates.lat}
        lng = {coordinates.lng}
        position={'relative'}
        cursor = 'poniter'
       >
          <IoLocation color = 'red' fontSize={40} />
      </Box>
      {results && results.map((location):JSX.Element => {
        const { lat, lng, price, id } = location;
        return (
        <Box
          key={id}
          lat = {lat}
          lng = {lng}
          position={'relative'}
          cursor = 'poniter'
          text={price}
         >
          <IoLocation color = 'black' fontSize={40} />
        </Box>)
      })}
    </GoogleMapReact>
  </Box>)
}

export default Map