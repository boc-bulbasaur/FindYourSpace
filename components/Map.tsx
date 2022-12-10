import React from 'react'
import {Box} from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import { Marker } from 'google-map-react'
import { IoLocation } from "react-icons/io5";

const Map = ({coordinates, setCoordinates}) =>{
  console.log(coordinates)
  return (
  <Box position={'absolute'} right={0} width={'65vw'} height = {'full'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}}
          defaultCenter = {coordinates}
          center = {coordinates}
          defaultZoom = {13}
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
        <IoLocation color = 'red' fontSize={40}/>
      </Box>
    </GoogleMapReact>
  </Box>)
}

export default Map