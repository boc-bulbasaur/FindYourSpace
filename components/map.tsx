import React from 'react'
import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react'
import { IoLocation } from "react-icons/io5";
import { useJsApiLoader } from '@react-google-maps/api';



type MapProps = {
  coordinates: {
    lat: number;
    lng: number;
  };
  results: {}[];
  selected: number;
}

const Map = ({coordinates, results, selected }: MapProps) =>{

  return (
  <Box position={'absolute'} right={0} width={'60%'} height = {'100%'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          center = {coordinates}
          defaultZoom = {12}
          margin = {[50,50,50,50]}
          option= {''}
          onchange = {()=>{}}
          onChildClick = {()=>{}}
    >
      <Box
        component='span'
        lat={coordinates.lat}
        lng={coordinates.lng}
        position={'relative'}
        zIndex={100}
      >
          <IoLocation color = 'red' fontSize={40} />
      </Box>
      {results && results.map((location):JSX.Element => {
        const { lat, lng, id } = location;
        if (id === selected) {
          return (
            <Box
              component='span'
              key={id}
              lat = {lat}
              lng = {lng}
              position={'relative'}
              zIndex={20}
             >
              <IoLocation color='blue' fontSize={40} />
            </Box>)
        } else {
          return (
            <Box
              component='span'
              key={id}
              lat = {lat}
              lng = {lng}
              position={'relative'}
              zIndex={10}
             >
              <IoLocation color='black' fontSize={40} />
            </Box>)
        }
      })}
    </GoogleMapReact>
  </Box>)
}

export default Map