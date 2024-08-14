import { useTheme } from "next-themes";
import Link from "next/link";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { resolvedTheme } = useTheme()
  return (
    <Link href="/">
      <img src={resolvedTheme === 'light' ? '/logo_light.svg' : '/logo.svg'} className="w-48" alt="logo" />
    </Link>
  );
}
