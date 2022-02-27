import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader, Button } from '@mui/material';

const Course = ({ course }) => {

  if (!course) return null

  return (
    <Card sx={{ display: 'grid', maxWidth: '350px', justifySelf: 'center' }}>
      <CardHeader
        sx={{
          height: '24px',
          backgroundImage: 'linear-gradient(to right, #512da8, #c2185b)'
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
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {course.name}
          </Typography>
          <Typography variant="body1">
            {course.tag}
          </Typography>
          <Button sx={{ mt: 3 }} variant="outlined">
            Learn More
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Course;