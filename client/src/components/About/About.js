import React from "react";
import { Container, Grid } from "@mui/material";
import { Image } from "mui-image";
import coding from "../../images/coding.png";
import messages from "../../images/messages.png";

const About = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <h2 className="tag">
        I love to teach you coding!
      </h2>
      <Grid
        container
        sx={{ mb: 5, mt: 5 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12} sm={6}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloremque molestiae odit eius veniam dolores commodi
            exercitationem provident harum itaque dolorum cumque temporibus,
            alias eligendi ipsum nostrum fugit! Reiciendis, harum animi. Sit
            cumque natus quas aut perferendis eos hic? Quos expedita molestiae
            perferendis natus quis quam asperiores odio eveniet praesentium,
            cum maxime omnis. Dolorum voluptates facilis quisquam laborum
            dolore aperiam recusandae! Inventore odio praesentium deleniti
            totam, neque incidunt laudantium ipsum quibusdam voluptatum
            suscipit esse aliquam ex sint ad perferendis vitae, tempora
            repudiandae! Rem hic sequi quod non vero dignissimos autem
            blanditiis. Corporis mollitia, libero repellat recusandae quisquam
            cum, ad sit autem officiis modi fugiat eligendi ducimus sapiente
            hic. Harum, quod perspiciatis deserunt inventore enim omnis
            maiores earum minus, ex eius ea. Perspiciatis nisi velit illum
            cumque earum dolore enim non assumenda id.
          </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Image sx={{ maxWidth: "450px" }} src={coding} />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mb: 10, mt: 5 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12} sm={6}>
          <Image sx={{ maxWidth: "480px", display: { xs: "none", md: "grid" } }} src={messages} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloremque molestiae odit eius veniam dolores commodi
            exercitationem provident harum itaque dolorum cumque temporibus,
            alias eligendi ipsum nostrum fugit! Reiciendis, harum animi. Sit
            cumque natus quas aut perferendis eos hic? Quos expedita molestiae
            perferendis natus quis quam asperiores odio eveniet praesentium,
            cum maxime omnis. Dolorum voluptates facilis quisquam laborum
            dolore aperiam recusandae! Inventore odio praesentium deleniti
            totam, neque incidunt laudantium ipsum quibusdam voluptatum
            suscipit esse aliquam ex sint ad perferendis vitae, tempora
            repudiandae! Rem hic sequi quod non vero dignissimos autem
            blanditiis. Corporis mollitia, libero repellat recusandae quisquam
            cum, ad sit autem officiis modi fugiat eligendi ducimus sapiente
            hic. Harum, quod perspiciatis deserunt inventore enim omnis
            maiores earum minus, ex eius ea. Perspiciatis nisi velit illum
            cumque earum dolore enim non assumenda id.
          </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Image sx={{ maxWidth: "480px", display: { md: "none" } }} src={messages} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
