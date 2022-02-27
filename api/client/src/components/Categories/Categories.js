import React, { useState, useEffect } from 'react';
import api from '../Api/Api';
import Category from './Category';
import { Container, Grid } from '@mui/material';

const Categories = () => {
  const[categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories();
	}, [])

  const getCategories = async () => {
    const { data } = await api.get("store/categories");
    setCategories(data.results);
  }
  
  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <h2>Learning Paths</h2>
      <p>Whether you're a beginner just starting out or an experienced developer looking for courses to enhance your skills and reach higher levels of software engineering, these learning paths will help you achieve your goal.</p>
      <Grid container spacing={5}>
        {categories.map((category, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Category category={category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Categories