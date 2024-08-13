import Link from "next/link";


const DisputeGameLogo: React.FC<{ className?: string }> = ({ }) => {
  return <Link href="/">
    <img src="/logo.svg" className="w-48" alt="logo" />
  </Link>
};

export default DisputeGameLogo;
