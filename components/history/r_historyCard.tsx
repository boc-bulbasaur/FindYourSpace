import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
  let cardImg, address, startDate, endDate;
  if (props.currentListing !== undefined) {
    cardImg = props.currentListing.url;
    address = props.currentListing.address;
    startDate = undefined ? '' : new Date(props.currentListing.start_time).toString();
    endDate = undefined ? '' : new Date(props.currentListing.end_time).toString();
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="parking image"
        height="140"
        image={cardImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start: {startDate}<br />
          End: {endDate}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}