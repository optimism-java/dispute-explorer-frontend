import { useState } from "react";
import {
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { Button } from "../Button";
import { NavItem } from "./NavItem";

const resolveApiUrl = () =>
  // TODO
  "https://sepolia-optimism.etherscan.io/block/15047884";

export const NavMenusSection: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <Button
        className={`md:hidden ${
          isMobileMenuOpen
            ? "stroke-controlBorderActive-light dark:stroke-controlBorderActive-dark"
            : ""
        }`}
        variant="icon"
        icon={isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div
        className={`fixed inset-x-0 top-0 z-50 mt-14 transform ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:relative md:top-auto md:mt-0 md:block`}
        id="navbar-dropdown"
      >
        <div className="mx-auto w-full max-w-md rounded-lg bg-surface-light p-4 shadow-lg md:max-w-screen-xl md:bg-transparent md:p-0 md:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row">
            <NavItem
              label="Blockchain"
              icon={<Squares2X2Icon />}
              menuItems={[
                { label: "Blobs", href: "/" },
                { label: "Blocks", href: "/" },
                { label: "Transactions", href: "/" },
              ]}
            />
            <NavItem
              label="Stats"
              icon={<ChartBarIcon />}
              menuItems={[
                {
                  label: "Blob Metrics",
                  href: "/" ,
                },
                { label: "Block Metrics", href: "/" },
                {
                  label: "Transaction Metrics",
                  href: "/",
                },
              ]}
            />
            <NavItem
              label="API"
              icon={<CommandLineIcon />}
              href={resolveApiUrl()}
            />
            <NavItem
              label="Docs"
              icon={<BookOpenIcon />}
              href="https://docs.blobscan.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
