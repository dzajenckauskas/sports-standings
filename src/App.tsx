import { ThemeProvider } from "styled-components";
import TournamentCard from "./components/TournamentCard";
import { Grid } from "./components/shared/Grid";
import { cleanMinimal, sportyEnergetic, tableCentric } from "./theme/themes";
import BasketballIcon from "./components/shared/icons/BasketballIcon";
import TennisIcon from "./components/shared/icons/TennisIcon";

function App() {
  return (
    <Grid gap={8} sm={1} md={3} lg={3} style={{ padding: '8px', rowGap: '8px' }}>
      <ThemeProvider theme={cleanMinimal}>
        <TournamentCard
          namespace={'common'}
          tournamentId="tournament"
        />
      </ThemeProvider>
      <ThemeProvider theme={sportyEnergetic}>
        <TournamentCard
          namespace={'common'}
          titleIcon={<BasketballIcon />}
          tournamentId="eurobasket"
          showFormToggleButtons
        />
      </ThemeProvider>
      <ThemeProvider theme={tableCentric}>
        <TournamentCard
          namespace={'common'}
          titleIcon={<TennisIcon />}
          tournamentId="wimbledon"
          showFormToggleButtons
        />
      </ThemeProvider>
    </Grid>
  );
}

export default App;
