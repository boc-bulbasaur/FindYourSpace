import { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Box, Typography } from '@mui/material';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const containerStyle = {
  width: '100%',
  height: 'auto'
};

export default function Places({ formData, setFormData }) {
  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map formData={formData} setFormData={setFormData} />;
}


function Map({ formData, setFormData }) {
  const [latLng, setLatLng] = useState({ lat: 39.8283, lng: -98.5795 });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(3);

  return (
    <>
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between'
        }}
      >
        <Box
          sx={{
            paddingBottom: '20px'
          }}
          className="places-container"
        >
          <PlacesAutocomplete formData={formData} setFormData={setFormData} setSelected={setSelected} setLatLng={setLatLng} zoom={zoom} setZoom={setZoom} />
        </Box>
        <Box
          sx={{
            minHeight: 200,
            paddingBottom: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={zoom}
            center={latLng}
            mapContainerClassName="map-container"
          >
            {selected && <MarkerF position={latLng} />}
          </GoogleMap>

        </Box>
      </Box>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, setLatLng, formData, setFormData, setZoom}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setLatLng({ lat, lng });
    setZoom(18);
    setTimeout(() => {
      setFormData({
        ...formData,
        _address: address,
        coordinates: {
          lat: lat,
          lng: lng
        }
      });
    }, 1000)
  };

  return (
    <Combobox
      onSelect={handleSelect}
      aria-label={"choose a location"}
      style={{ width: '100%' }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
        style={{ width: '100%' }}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};