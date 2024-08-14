import { useTheme } from "next-themes";
import Link from "next/link";


const DisputeGameLogo: React.FC<{ className?: string }> = ({ }) => {
  const { resolvedTheme } = useTheme()
  return <Link href="/">
    <img src={resolvedTheme === 'light' ? '/logo_light.svg' : '/logo.svg'} className="w-48" alt="logo" />
  </Link>
};

export default DisputeGameLogo;
