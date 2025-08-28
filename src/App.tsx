import TournamentCard from './components/TournamentCard';

function App() {
  return (
    <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <TournamentCard title='Premier League' tournamentId={'tournament'} primaryColor={'purple'} />
      <TournamentCard title='Eurobasket' tournamentId={'eurobasket'} primaryColor={'green'} showFormToggleButtons />
      <TournamentCard title='Wimbledon' tournamentId={'wimbledon'} primaryColor={'pink'} showFormToggleButtons />
    </div>
  );
}

export default App;
