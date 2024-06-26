import { Route, Routes } from 'react-router-dom';
import { CreditDetail, Dashboard, GameDetail, Games } from './pages';

function App() {
  return (
    <main className="container mx-auto h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<GameDetail />} />
        <Route path="/credits/:addr" element={<CreditDetail />} />
      </Routes>
    </main>
  );
}

export default App;
