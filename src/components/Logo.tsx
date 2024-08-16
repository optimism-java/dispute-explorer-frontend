import { useTheme } from "next-themes";
import Link from "next/link";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Link href="/">
      <img src='/logo.svg' className="w-40" alt="logo" />
    </Link>
  );
}
