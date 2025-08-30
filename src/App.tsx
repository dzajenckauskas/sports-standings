import { ThemeProvider } from "styled-components";
import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";
import BasketballIcon from "./components/shared/icons/BasketballIcon";
import TennisIcon from "./components/shared/icons/TennisIcon";
import { cleanMinimal } from "./theme/cleanMinimal";
import { sportyEnergetic } from "./theme/sportyEnergetic";
import { tableCentric } from "./theme/tableCentric";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <ThemeProvider theme={cleanMinimal}>
        <TournamentCard
          namespace={'premier-league'}
          tournamentId="premier-league"
          hidePastMatches
        />
      </ThemeProvider>
      <ThemeProvider theme={sportyEnergetic}>
        <TournamentCard
          namespace={'eurobasket'}
          titleIcon={<BasketballIcon />}
          tournamentId="eurobasket"
          showFormToggleButtons
        />
      </ThemeProvider>
      <ThemeProvider theme={tableCentric}>
        <TournamentCard
          hidePastMatches
          namespace={'wimbledon'}
          titleIcon={<TennisIcon />}
          tournamentId="wimbledon"
          showFormToggleButtons
        />
      </ThemeProvider>
    </Grid>
  );
}

export default App;
