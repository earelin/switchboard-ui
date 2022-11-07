import ProjectsListBox from "./ProjectsListBox";
import {Container, Grid, Paper} from "@mui/material";
import Welcome from "./Welcome";

export default function Dashboard() {
  return (
    <>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper  sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Welcome/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper  sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ProjectsListBox/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
