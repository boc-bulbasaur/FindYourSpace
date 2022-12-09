import React from 'react'
import {Box} from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
const dotenv = require('dotenv')

const Map = ({coordinates, setCoordinates}) =>{

  return (
  <Box width={'full'} height = {'full'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          defaultCenter = {coordinates}
          center = {coordinates}
          defaultZoom = {10}
          margin = {[50,50,50,50]}
          option= {''}
          onchange = {()=>{}}
          onChildClick = {()=>{}}
    >

    </GoogleMapReact>
  </Box>)
}

export default Map