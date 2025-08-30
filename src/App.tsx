import { ThemeProvider } from "styled-components";
import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";
import { cleanMinimal, sportyEnergetic, tableCentric } from "./theme/themes";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <ThemeProvider theme={cleanMinimal}>
        <TournamentCard
          title="Premier League"
          tournamentId="tournament"
        />
      </ThemeProvider>
      <ThemeProvider theme={sportyEnergetic}>
        <TournamentCard
          title="Eurobasket"
          tournamentId="eurobasket"
          showFormToggleButtons
        />
      </ThemeProvider>
      <ThemeProvider theme={tableCentric}>
        <TournamentCard
          title="Wimbledon"
          tournamentId="wimbledon"
          showFormToggleButtons
        />
      </ThemeProvider>
    </Grid>
  );
}

export default App;