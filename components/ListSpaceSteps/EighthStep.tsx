import { Box, Typography, Stack, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

function Eighth({ formData }) {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

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
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2} gap={2}>
          <Grid item>
          </Grid>
          <Grid item xs={3}>
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{formData.type}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>

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