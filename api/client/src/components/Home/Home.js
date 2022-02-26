import { Button, Container } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import api from '../Api/Api';
import Grid from '@mui/material/Grid';
import Course from '../Courses/Course';
import { Image } from 'mui-image';
import coding from '../../images/coding.png';
import messages from '../../images/messages.png';
import './Home.css';
import Review from '../Reviews/Review';

const Home = () => {
	const[courses, setCourses] = useState([]);
	const[reviews, setReviews] = useState([]);

	const getFeaturedCourses = async () => {
		const { data } = await api.get("store/products");
		const featured = data.results.filter(p => p.is_featured === true)
		setCourses(featured);
	}

	const getReviews = async () => {
		const { data } = await api.get("store/reviews");
		const featured_reviews = data.results.filter(p => p.on_site === true)
		console.log(featured_reviews)
		setReviews(featured_reviews);
	}

	useEffect(() => {
		getFeaturedCourses();
		getReviews();
	}, [])

	return (
		<>
		<div className='home'>
			<Container sx={{ mt: 25 }} maxWidth="md">
				<Grid container direction="column" justifyContent="center" alignItems="center">
					<h1 className='home-tag'>
						Learn the coding skills you need to become an expert developer
					</h1>
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
							View Courses
						</Button>
					</Link>
				</Grid>
			</Container>
		</div>
		<div>
			<h2 className='tag'>
				I love to teach you coding!
			</h2>
			<Container sx={{ mb: 5, mt: 5 }}>
				<Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
					<Grid item xs={12} sm={6}>
						<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque molestiae odit eius veniam dolores commodi exercitationem provident harum itaque dolorum cumque temporibus, alias eligendi ipsum nostrum fugit! Reiciendis, harum animi.
						Sit cumque natus quas aut perferendis eos hic? Quos expedita molestiae perferendis natus quis quam asperiores odio eveniet praesentium, cum maxime omnis. Dolorum voluptates facilis quisquam laborum dolore aperiam recusandae!
						Inventore odio praesentium deleniti totam, neque incidunt laudantium ipsum quibusdam voluptatum suscipit esse aliquam ex sint ad perferendis vitae, tempora repudiandae! Rem hic sequi quod non vero dignissimos autem blanditiis.
						Corporis mollitia, libero repellat recusandae quisquam cum, ad sit autem officiis modi fugiat eligendi ducimus sapiente hic. Harum, quod perspiciatis deserunt inventore enim omnis maiores earum minus, ex eius ea.
						Perspiciatis nisi velit illum cumque earum dolore enim non assumenda id. In excepturi incidunt quia similique voluptatibus obcaecati dignissimos, illum corporis. Error accusantium facere, maiores eum quo dicta asperiores eveniet.
						</p>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Image sx={{ maxWidth: '420px'}} src={coding} />
					</Grid>
				</Grid>
			</Container>
			<Container sx={{ mt: 15 }}>
				<Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
					<Grid item xs={12} sm={6}>
						<Image sx={{ maxWidth: '480px'}} src={messages} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque molestiae odit eius veniam dolores commodi exercitationem provident harum itaque dolorum cumque temporibus, alias eligendi ipsum nostrum fugit! Reiciendis, harum animi.
						Sit cumque natus quas aut perferendis eos hic? Quos expedita molestiae perferendis natus quis quam asperiores odio eveniet praesentium, cum maxime omnis. Dolorum voluptates facilis quisquam laborum dolore aperiam recusandae!
						Inventore odio praesentium deleniti totam, neque incidunt laudantium ipsum quibusdam voluptatum suscipit esse aliquam ex sint ad perferendis vitae, tempora repudiandae! Rem hic sequi quod non vero dignissimos autem blanditiis.
						Corporis mollitia, libero repellat recusandae quisquam cum, ad sit autem officiis modi fugiat eligendi ducimus sapiente hic. Harum, quod perspiciatis deserunt inventore enim omnis maiores earum minus, ex eius ea.
						Perspiciatis nisi velit illum cumque earum dolore enim non assumenda id. In excepturi incidunt quia similique voluptatibus obcaecati dignissimos, illum corporis. Error accusantium facere, maiores eum quo dicta asperiores eveniet.
						</p>
					</Grid>
				</Grid>
			</Container>
		</div>
		<div className='reviews'>
			<h2 className='tag' style={{ marginTop: '148px' }}>Some happy students</h2>
			<Container sx={{ mb: 25, mt: 5 }}>
				<Grid container spacing={5}>
					{reviews && reviews.map((review, i) => (
						<Grid item key={i} xs={12} sm={6} md={4}>
							<Review review={review} />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
		<div>
			<h2 className='tag'>Featured Courses</h2>
			<Container sx={{ mb: 5, mt: 5 }}>
				<Grid container spacing={5}>
					{courses && courses.map((course, i) => (
						<Grid item key={i} xs={12} sm={6} md={4}>
							<Course course={course} />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
		</>
	)
}

export default Home;