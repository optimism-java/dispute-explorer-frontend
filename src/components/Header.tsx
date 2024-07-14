import { mdiSourceFork, mdiSourceRepository, mdiStarOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nav = useNavigate();
  return (
    <div className="flex h-16 items-center justify-between bg-slate-50 px-6">
      <div className="font-dogica" onClick={() => nav('/')}>
        Dispute Game
      </div>
      <Link underline="none">
        <a
          target="_blank"
          href="https://github.com/optimism-java/dispute-explorer-frontend"
        >
          <div className="flex pr-8 text-slate-500">
            <div>
              <Icon path={mdiSourceRepository} size={2} />
            </div>
            <div className="flex flex-col font-mono text-sm">
              <div>dispute-explorer-frontend</div>
              <div className="flex items-center justify-around">
                <div className="flex items-center">
                  <span>
                    <Icon path={mdiStarOutline} size={1} />
                  </span>
                  <span className="px-4">0</span>
                </div>
                <div className="flex items-center">
                  <span>
                    <Icon path={mdiSourceFork} size={1} />
                  </span>
                  <span className="px-8">0</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Header;
