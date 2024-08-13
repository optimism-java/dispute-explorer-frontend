import Link from "next/link";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <Link href="/">
    <img src="/logo.svg" className="w-48" alt="logo" />
  </Link>
);
