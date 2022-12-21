import { Box, Typography, Stack } from '@mui/material';

function Eighth({ formData }) {
  return (
  <>
    <Typography
    component={'h1'}
      sx={{
        display: 'flex',
        flexGrow: '1',
        maxHeight: '30px',
        alignItems: 'center'
      }}
    >
      Listing Details
    </Typography>
    <Box
      sx={{
        margin: '1rem 0',
      }}
    >
       <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              pointerEvents: 'none'
            }}
          >
            Type: {formData.type}
            Location: {formData._address}
            Minimum Stay: {formData.min_stay}
            Maximum Stay: {formData.max_stay}
            Amenities:
            Short Term Price: {formData.short_term_rate}
            Long Term Price: {formData.long_term_rate}
            Available starting: {formData.availability[0].format('MM/DD/YYYY')}
            Available until: {formData.availability[1].format('MM/DD/YYYY')}
          </Typography>
        </Box>
      </Stack>
    </Box>
  </>
  );
}
export default Eighth;