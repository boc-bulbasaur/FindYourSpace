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
  selected: number;
  handleClick: Function;
}

const Map = ({coordinates, results, selected, handleClick }: MapProps) =>{
  return (
  <Box position={'absolute'} right={0} width={'60%'} height = {'100%'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          center = {coordinates}
          defaultZoom = {14.5}
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
          <IoLocation color = 'red' fontSize={30} />
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
              onClick={(e) => { handleClick(e, id) }}
             >
              <IoLocation color='#1976D2' fontSize={40} />
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
              onClick={(e) => { handleClick(e, id) }}
             >
              <IoLocation color='black' fontSize={30} />
            </Box>)
        }
      })}
    </GoogleMapReact>
  </Box>)
}

export default Map
