import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className="py-6">
      <div className="flex justify-center">
        <div className="p-3">
          <GitHubIcon />
        </div>
        <div className="p-3">
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
