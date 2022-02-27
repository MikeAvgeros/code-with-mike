import React from 'react';
import { Card, CardContent, Typography, Button, Stack} from '@mui/material';

const Category = ({ category }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="column" spacing={3}>
          <Typography variant="h5" component="div">
            {category.name}
          </Typography>
          <Typography variant="body1">
            {category.description}
          </Typography>
          <Button variant="contained" size="small">Learn More</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Category;