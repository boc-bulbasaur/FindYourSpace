import { Box, InputLabel, OutlinedInput, Typography, FormControl, Stack } from '@mui/material';
import { useState } from 'react';
import Script from 'next/script';

function Second({ formData, setFormData }) {
  function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 33.8892846, lng: 35.539302},
          zoom: 11,
          mapTypeControl: false,
      });
      const map_input = document.getElementById('component-outlined');
      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
      };
      const autocomplete = new google.maps.places.Autocomplete(map_input);

      const marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29),
      });

      autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()
          console.log(lat, lng)
          const query = place.formatted_address;
          setQuery(query);
          setFormData({ ...formData, coordinates: {lat: lat, lng: lng}, _address: query})
      });
  }

  const [query, setQuery] = useState("");

  return (
    <>
      <Script id="google" async defer src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCQaRzoY9ix-fRrNmoyzizVJ7gSR8V_V7Y"></Script>
      <Box
        sx={{
          marginBottom: '5px'
        }}
      >
      <Typography
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        Where is the space located?
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexGrow: '1',
          maxHeight: '30px',
          alignItems: 'center',
          fontSize: '12px',
          color: 'gray'
        }}
      >
        Your address is only shared with guests after they've made a reservation
      </Typography>
    </Box>
    <Box
      sx={{
        margin: '0 0',
        padding: '0',
      }}
    >
      <Stack spacing={2}>
       <FormControl
        sx={{
          margin: '1rem',
          display: 'flex',
          justifyContent: 'center'
        }}
        variant="outlined"
       >
        <InputLabel htmlFor="component-outlined">Address</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setFormData({
              ...formData,
              _address: e.target.value
            });
          }}
          label="Address"
          autoComplete="on" />
      </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 0,
            marginTop: '0px !important',
            marginBottom: '5px !important'
          }}
        >
          <Box
            id="map-contain"
            sx={{
              minWidth: '390px',
              maxWidth: '400px',
              minHeight: '200px'
            }}
          >
            <Box
              id="map"
              sx={{
                minWidth: '390px',
                maxWidth: '400px',
                minHeight: '200px'
              }}
            >

            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  </>
  );
}
export default Second;