import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { CreditDetail, Dashboard, GameDetail, Games } from './pages';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light font-dogica">
      <header>
        <Header />
      </header>
      <main className="container mx-auto flex-1 pt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/credits/:addr" element={<CreditDetail />} />
        </Routes>
      </main>
      <footer className="mt-6 bg-slate-50">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
