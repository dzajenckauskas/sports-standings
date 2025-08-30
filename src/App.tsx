import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";
import { cleanMinimal, sportyEnergetic, tableCentric } from "./theme/themes";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <TournamentCard
        theme={cleanMinimal}
        title="Premier League"
        tournamentId="tournament"
      />
      <TournamentCard
        theme={sportyEnergetic}
        title="Eurobasket"
        tournamentId="eurobasket"
        showFormToggleButtons
      />
      <TournamentCard
        theme={tableCentric}
        title="Wimbledon"
        tournamentId="wimbledon"
        showFormToggleButtons
      />
    </Grid>
  );
}

export default App;