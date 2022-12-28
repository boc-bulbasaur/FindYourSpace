import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import Map from '../components/map';
import Script from 'next/script';
import SearchResults from '../components/searchResults';
import NavBar from '../components/navBar';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';


type SearchProps = {
  startTime: String;
  endTime: String;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function Search(props: SearchProps) {

  const [results, setResults] = useState([]);
  const [coordinates, setCoordinates] = useState(props.coordinates || {lat: 29.76116, lng: -95.37419})
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [sortBy, setSortBy] = useState('distance')

  const { data: session } = useSession();
  console.log(session);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log({latitude, longitude});
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

  useEffect(() => {
    let newResults = [...results];
    setResults(newResults.sort((a, b) => a[sortBy] - b[sortBy]));
  }, [results, sortBy]);


  const handleSearch = async (e) => {
    console.log("search button clicked");
    if (startTime !== '' && endTime !== '' && coordinates.lat && coordinates.lng) {
      setIsLoading(true);
      console.log('start search');
      console.log(startTime, endTime, coordinates.lat, coordinates.lng);
      const info = {startTime, endTime, coordinates};
      try {
        fetch('api/search', {
          method: 'POST',
          body: JSON.stringify(info)
        })
        .then(async (response) => {
          let data = await response.json();
          console.log(data);
          setSortBy('distance');
          setResults(data);
          setIsLoading(false);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
  }

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
      <Box sx={{
        width: '100%',
        height: '10%',
        position: 'relative',
        margin: '0',
        alignItems: 'center'
        }} >
        <NavBar session={session}/>
      </Box>
      <Box sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90vw',
        height: '90vh',
        maxWidth: '100vw',
        maxHeight: '90vh',
        margin: '0 auto',
        position: 'relative',
        flexDirection: 'column'
      }} >
        <Box width={'100%'} height={'10%'} position = {'relative'} marginTop={'10px'} alignItems={'center'}>
          <SearchBar
            setCoordinates={setCoordinates}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            isLoading={isLoading}
            handleSearch={handleSearch}
          />
        </Box>
        <Box width={'100%'} height={'85%'} position={'relative'} marginTop={'10px'}>
          <SearchResults results={results} isLoading={isLoading} sortBy={sortBy} setSortBy={setSortBy} />
          <Map coordinates={coordinates} results={results}/>
        </Box>
      </Box>
    </>
  );
}