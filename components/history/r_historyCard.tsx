import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
  let cardImg, address, startDate, endDate;
  if (props.listings[1] !== undefined) {
    cardImg = props.listings[1].url;
    address = props.listings[1].address;
    startDate = undefined ? '' : new Date(props.listings[1].start_time).toString();
    endDate = undefined ? '' : new Date(props.listings[1].end_time).toString();
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}