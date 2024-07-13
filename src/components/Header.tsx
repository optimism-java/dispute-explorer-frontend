import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nav = useNavigate();
  return (
    <div className="flex h-16 items-center bg-slate-50 px-6">
      <div className="font-dogica" onClick={() => nav('/')}>
        Dispute Game
      </div>
    </div>
  );
};

export default Header;
