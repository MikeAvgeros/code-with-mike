import React, { useState, useEffect } from 'react';
import Course from './Course';
import api from '../Api/Api';
import { Container, Grid } from '@mui/material';

const Courses = () => {
  const[courses, setCourses] = useState([]);

	useEffect(() => {
		const getCourses = async () => {
			const { data } = await api.get("store/products");
			setCourses(data.results);
		}
		getCourses();
	}, [])
  
  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Grid container spacing={5}>
        {courses.map((course, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Course course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Courses;