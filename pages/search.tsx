import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import Map from '../components/map';
import Script from 'next/script';
import { Flex } from '@chakra-ui/react'
import SearchResults from '../components/searchResults';


type SearchProps = {
  address: String;
  startTime: String;
  endTime: String;
}

export default function Search(props: SearchProps) {

  const [results, setResults] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 29.76116, lng: -95.37419})
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log({latitude, longitude});
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

  const mokeResults = [
    {address: "some 1 places",
     id: 1,
     price: 10,
     description: "this place have one parking spot",
     coordinates: {
      lat: 28.6346,
      lng: -96.62859
     }
    },
    {address: "some 2 places",
      id: 2,
      price: 20,
      description: "this place have two parking spot",
      coordinates: {
        lat: 28.63496,
        lng: -96.62796
       }
    },
    {address: "some 3 places",
      id: 3,
      price: 40,
      description: "this place have three parking spot",
      coordinates: {
        lat: 28.63454,
        lng: -96.62495
       }
    },
    {address: "some 4 places",
      id: 4,
      price: 40,
      description: "this place have four parking spot",
      coordinates: {
        lat: 28.63231,
        lng: -96.62734
       }
    },
    {address: "some 5 places",
      id: 5,
      price: 50,
      description: "this place have five parking spot",
      coordinates: {
        lat: 28.6333,
        lng: -96.63153
       }
    },
    {address: "some 1 places",
     id: 1,
     price: 10,
     description: "this place have one parking spot",
     coordinates: {
      lat: 28.6346,
      lng: -96.62859
     }
    },
    {address: "some 2 places",
      id: 2,
      price: 20,
      description: "this place have two parking spot",
      coordinates: {
        lat: 28.63496,
        lng: -96.62796
       }
    },
    {address: "some 3 places",
      id: 3,
      price: 40,
      description: "this place have three parking spot",
      coordinates: {
        lat: 28.63454,
        lng: -96.62495
       }
    },
    {address: "some 4 places",
      id: 4,
      price: 40,
      description: "this place have four parking spot",
      coordinates: {
        lat: 28.63231,
        lng: -96.62734
       }
    },
    {address: "some 5 places",
      id: 5,
      price: 50,
      description: "this place have five parking spot",
      coordinates: {
        lat: 28.6333,
        lng: -96.63153
       }
    },
    {address: "some 1 places",
     id: 1,
     price: 10,
     description: "this place have one parking spot",
     coordinates: {
      lat: 28.6346,
      lng: -96.62859
     }
    },
    {address: "some 2 places",
      id: 2,
      price: 20,
      description: "this place have two parking spot",
      coordinates: {
        lat: 28.63496,
        lng: -96.62796
       }
    },
    {address: "some 3 places",
      id: 3,
      price: 40,
      description: "this place have three parking spot",
      coordinates: {
        lat: 28.63454,
        lng: -96.62495
       }
    },
    {address: "some 4 places",
      id: 4,
      price: 40,
      description: "this place have four parking spot",
      coordinates: {
        lat: 28.63231,
        lng: -96.62734
       }
    },
    {address: "some 5 places",
      id: 5,
      price: 50,
      description: "this place have five parking spot",
      coordinates: {
        lat: 28.6333,
        lng: -96.63153
       }
    },
    {address: "some 1 places",
     id: 1,
     price: 10,
     description: "this place have one parking spot",
     coordinates: {
      lat: 28.6346,
      lng: -96.62859
     }
    },
    {address: "some 2 places",
      id: 2,
      price: 20,
      description: "this place have two parking spot",
      coordinates: {
        lat: 28.63496,
        lng: -96.62796
       }
    },
    {address: "some 3 places",
      id: 3,
      price: 40,
      description: "this place have three parking spot",
      coordinates: {
        lat: 28.63454,
        lng: -96.62495
       }
    },
    {address: "some 4 places",
      id: 4,
      price: 40,
      description: "this place have four parking spot",
      coordinates: {
        lat: 28.63231,
        lng: -96.62734
       }
    },
    {address: "some 5 places",
      id: 5,
      price: 50,
      description: "this place have five parking spot",
      coordinates: {
        lat: 28.6333,
        lng: -96.63153
       }
    }
  ];

  const scriptURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places&callback=initMap`

  return (
    <>
      <Script id="google-map-script" src={scriptURL} strategy="beforeInteractive" />
      <Flex
        justifyContent= {'center'}
        alignItems = {'center'}
        width = {'90vw'}
        height = { '90vw'}
        maxWidth = {'100vw'}
        maxHeight = {'100vh'}
        margin = {'0 auto'}
        position = {'relative'}
        flexDirection = {'column'}
      >
        <Flex width={'100%'} height={'10%'} position = {'relative'} margin={'0'} alignItems={'center'}>
          <SearchBar
            setCoordinates={setCoordinates}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            isLoading={isLoading}
          />
        </Flex>
        <Flex width={'100%'} height={'70%'} position = {'relative'}>
          <SearchResults results={mokeResults} isLoading ={isLoading}/>
          <Map setCoordinates = {setCoordinates} coordinates = {coordinates} results={mokeResults}/>
        </Flex>
        {/* <ParkingSpotDetail /> */}
      </Flex>
    </>
  );
}