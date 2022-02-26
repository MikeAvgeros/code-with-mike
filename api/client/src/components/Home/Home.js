import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../Api/Api';
import Grid from '@mui/material/Grid';
import Course from '../Courses/Course';
import './Home.css';

const Home = () => {
	const[courses, setCourses] = useState([]);

	useEffect(() => {
		const getCourses = async () => {
			const { data } = await api.get("store/products");
			const featured = data.results.filter(p => p.is_featured === true)
			setCourses(featured);
		}
		getCourses();
	}, [])

	return (
		<>
		<main className='home'>
			<Container sx={{ display: 'grid' }}>
				<h1 className='home-tag'>
					Learn the coding skills you need to become an expert developer
				</h1>
			</Container>
		</main>
		<div className='about'>
			<Container>
				<h2 className='tag'>
					I love to teach you coding!
				</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias magni quas dolorem, illum eum excepturi saepe. Dicta quaerat ducimus unde accusamus? Delectus saepe amet minus numquam distinctio, quibusdam minima impedit.
					Nobis illo labore accusamus atque sed placeat perspiciatis hic, iure molestias sunt sequi distinctio tempora debitis deleniti deserunt provident excepturi sit temporibus voluptatem dolor architecto ut. Numquam ipsa nam nulla.
					Natus perspiciatis doloribus pariatur! Doloribus, quidem? Vel rem nostrum exercitationem, alias mollitia aliquid. Debitis voluptas adipisci, esse est eveniet, cupiditate in pariatur perferendis molestias id necessitatibus amet sunt commodi error?
					Eius, blanditiis? Animi ut velit aspernatur dolores soluta fugit nostrum id laboriosam odio commodi provident ad, similique corporis ipsa rem illum! Recusandae mollitia illum libero labore fugit fugiat dignissimos impedit.
					Officia corporis facere magnam. Veritatis maxime quia blanditiis cupiditate alias quos rerum recusandae culpa eos ratione quasi, facere enim nulla sed. Magni, excepturi! Aperiam expedita eum iusto facilis quibusdam quis!
					Distinctio fugiat doloremque debitis. Incidunt corrupti laborum quisquam illum eveniet alias modi maiores tempore provident. Aliquid culpa earum molestiae eum quis nostrum tempore similique, laboriosam nihil nemo minus exercitationem sapiente!
					Accusamus optio, illum dolorem, cum porro adipisci accusantium minima voluptate quisquam beatae repellendus quos rerum aliquam perferendis hic itaque quas officia, amet similique iusto odit assumenda omnis? Vitae, repellat obcaecati.
					Necessitatibus ut qui inventore maxime, deleniti vel sed hic sint eius deserunt adipisci eos veniam enim, illo ab beatae quia. Neque expedita a commodi porro nemo reiciendis provident deleniti iste!
					Odit reiciendis nobis earum blanditiis iusto excepturi distinctio similique? Eius laudantium quo tempore minus aperiam dolores, ullam voluptatum non, quasi dignissimos adipisci. Temporibus nisi porro, explicabo nulla cumque praesentium vero?
					Nobis reprehenderit eaque quasi veritatis. Architecto dolorem consequuntur, magni asperiores quia, modi ea commodi eius quaerat aut facere debitis ad ipsam. Quo, iste voluptates fuga adipisci vero atque reprehenderit dignissimos.
				</p>
			</Container>
		</div>
		<div className='reviews'>
		</div>
		<div className='featured'>
			<h2 className='tag'>Featured Products</h2>
			<Container sx={{ marginBottom: 5 }}>
				<Grid container spacing={5}>
					{courses.map((course, i) => (
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