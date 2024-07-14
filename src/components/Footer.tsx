import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { Link } from '@mui/material';

const Footer = () => {
  return (
    <div className="py-6">
      <div className="flex justify-center">
        <Link sx={{ padding: '12px' }}>
          <a
            target="_blank"
            href="https://github.com/optimism-java/dispute-explorer-frontend"
          >
            <GitHubIcon />
          </a>
        </Link>
        <div className="p-3">
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
