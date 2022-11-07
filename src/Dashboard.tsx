import ProjectsListContainer from "./projects/ProjectsListContainer";
import {Container, Grid, Paper} from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid item xs={12}>
          <Paper  sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ProjectsListContainer/>
          </Paper>
        </Grid>
      </Container>
    </>
  )
}
