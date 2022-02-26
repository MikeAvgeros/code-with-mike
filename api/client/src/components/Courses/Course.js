import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';

const Course = ({ course }) => {
  return (
    <Card sx={{ display: 'grid', maxWidth: '300px', justifySelf: 'center' }}>
      <CardHeader
        sx={{
          height: '24px',
          backgroundImage: 'linear-gradient(to right, #7b1fa2, #c2185b)'
        }}
      />
      <CardActionArea sx={{ display: 'grid', height: '500px' }}>
        <CardMedia
          component="img"
          sx={{ width: '256px', height: '256px', justifySelf: 'center' }}
          image={course.image}
          alt={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {course.name}
          </Typography>
          <Typography variant="body1">
            {course.tag}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Course