import { ThemeProvider } from "styled-components";
import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";
import BasketballIcon from "./components/shared/icons/BasketballIcon";
import TennisIcon from "./components/shared/icons/TennisIcon";
import { cleanMinimal } from "./theme/cleanMinimal";
import { sportyEnergetic } from "./theme/sportyEnergetic";
import { tableCentric } from "./theme/tableCentric";
import { EUROBASKET_2025_COUNTRIES } from "./data/eurobasket2025";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <ThemeProvider theme={cleanMinimal}>
        <TournamentCard
          participantInputType="text"
          namespace={'premier-league'}
          tournamentId="premier-league"
          hidePastMatches
        />
      </ThemeProvider>
      <ThemeProvider theme={sportyEnergetic}>
        <TournamentCard
          participantInputType="select"
          participantOptions={EUROBASKET_2025_COUNTRIES}
          namespace={'eurobasket'}
          titleIcon={<BasketballIcon />}
          tournamentId="eurobasket"
          showFormToggleButtons
        />
      </ThemeProvider>
      <ThemeProvider theme={tableCentric}>
        <TournamentCard
          participantInputType="emoji"
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
