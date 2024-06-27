import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { CreditDetail, Dashboard, GameDetail, Games } from './pages';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container mx-auto h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/credits/:addr" element={<CreditDetail />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
