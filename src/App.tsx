import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <TournamentCard
        title="Premier League"
        tournamentId="tournament"
        primaryColor="purple"
      />
      <TournamentCard
        title="Eurobasket"
        tournamentId="eurobasket"
        primaryColor="green"
        showFormToggleButtons
      />
      <TournamentCard
        title="Wimbledon"
        tournamentId="wimbledon"
        primaryColor="pink"
        showFormToggleButtons
      />
    </Grid>
  );
}

export default App;