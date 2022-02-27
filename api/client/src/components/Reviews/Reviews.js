import React from 'react';
import { Container, Grid } from '@mui/material';
import Review from './Review';

const Reviews = ({ reviews }) => {
  return (
    <Container sx={{ mb: 5, mt: 15 }}>
      <h2 className='tag'>Some happy students</h2>
			<Container sx={{ mt: 5 }}>
				<Grid container spacing={5}>
					{reviews && reviews.map((review, i) => (
						<Grid item key={i} xs={12} sm={6} md={4}>
							<Review review={review} />
						</Grid>
					))}
				</Grid>
			</Container>
    </Container>
  )
}

export default Reviews;