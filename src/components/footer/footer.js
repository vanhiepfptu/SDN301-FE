import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Card, Link } from "@mui/material";
export default function Footer() {
  return (
    <Card sx={{ marginTop: 1, backgroundColor: "#1976D2", color: "white" }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <h2>App name</h2>
              <Link href="#" sx={{ color: "black" }}>
                About
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                What we offer
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Leadership
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Catalog
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Drawdemy Plus
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Professional Cetificate
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <h2>Community</h2>
              <Link href="#" sx={{ color: "black" }}>
                Leaners
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Partners
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <h2>More</h2>
              <Link href="#" sx={{ color: "black" }}>
                Press
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Investors
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Terms
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Privacy
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Help
              </Link>
              <Link href="#" sx={{ color: "black" }}>
                Acessibility
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <h2>Contact Us</h2>
              <Link href="#" sx={{ color: "black" }}>
                <img
                  src="../../app/img/app-store-png-logo-33109.png"
                  alt="App Store Logo"
                  height="auto"
                />
              </Link>

              <Link href="#" sx={{ color: "black" }}>
                <img
                  src="../../app/img/Google-Play-Logo-PNG-Cutout.png"
                  alt="Google Play Logo"
                  height="auto"
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={1} sx={{ marginTop: "50px" }}>
          <Grid container>
            <Grid item xs={8}>
              <Typography>© 2023 Drawdemy Inc. All rights reserved.</Typography>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={1} direction="row">
                <Link href="https://www.facebook.com/" sx={{ color: "black" }}>
                  <FacebookIcon />
                </Link>

                <Link
                  href="https://vn.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F"
                  sx={{ color: "black" }}
                >
                  <LinkedInIcon />
                </Link>

                <Link href="https://twitter.com/" sx={{ color: "black" }}>
                  <TwitterIcon />
                </Link>

                <Link href="https://www.youtube.com/" sx={{ color: "black" }}>
                  <YouTubeIcon />
                </Link>

                <Link
                  href="https://www.instagram.com/?hl=en"
                  sx={{ color: "black" }}
                >
                  <InstagramIcon />
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Card>
  );
}
