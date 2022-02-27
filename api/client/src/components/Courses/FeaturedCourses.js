import React from 'react';
import { Container, Grid } from '@mui/material';
import Course from './Course';

const FeaturedCourses = ({ courses }) => {
  return (
    <Container sx={{ mb: 5, mt: 5 }}>
      <h2 className='tag'>Featured Courses</h2>
			<Container sx={{ mt: 5 }}>
				<Grid container spacing={5}>
          {courses && courses.map((course, i) => (
						<Grid item key={i} xs={12} sm={6} md={4}>
							<Course course={course} />
						</Grid>
					))}
				</Grid>
			</Container>
    </Container>
  )
}

export default FeaturedCourses;