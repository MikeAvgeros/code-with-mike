import React from 'react';
import { Container, Grid, Button, Stack } from '@mui/material';
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Container sx={{ mt: 25 }} maxWidth="md">
				<Grid container direction="column" justifyContent="center" alignItems="center">
					<h1 className='landing-tag'>
						Learn the coding skills you need to become an expert developer
					</h1>
          <Stack direction="row" spacing={3}>
            <Link to="/courses" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  mt: 10,
                  width: '150px',
                  height: '50px',
                  backgroundColor: '#212121',
                }}
              >
                Courses
              </Button>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  mt: 10,
                  width: '150px',
                  height: '50px',
                  backgroundColor: '#212121',
                }}
              >
                Learn More
              </Button>
            </Link>
          </Stack>
				</Grid>
			</Container>
  )
}

export default Landing;