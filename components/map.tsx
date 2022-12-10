import React from 'react'
import {Box} from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import { IoLocation } from "react-icons/io5";
import { FunctionLikeDeclaration } from 'typescript';

type MapProps = {
  coordinates: {
    lat: number;
    lng: number;
  };
  setCoordinates: Function;
  results: {}[];
}

const Map = ({coordinates, setCoordinates, results}: MapProps) =>{
  return (
  <Box position={'absolute'} right={0} width={'60%'} height = {'95%'}>
    <GoogleMapReact
          bootstrapURLKeys = {{key: "AIzaSyCwG0a4Om1Vl7-eN3ItI3azjU6j3hYxmUA"}}
          defaultCenter = {coordinates}
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
        <IoLocation color = 'red' fontSize={40}/>
      </Box>
      {results && results.map((location):JSX.Element => {
        const { coordinates, price, id } = location;
        const { lat, lng } = coordinates;
        return (
        <Box
          key={id}
          lat = {lat}
          lng = {lng}
          position={'relative'}
          cursor = 'poniter'
          text={price}
         >
          <IoLocation color = 'blue' fontSize={40} />
        </Box>)
      })}
    </GoogleMapReact>
  </Box>)
}

export default Map