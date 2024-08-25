import DiscordIcon from "@/icons/discord.svg";
import GithubIcon from "@/icons/github.svg";
import XIcon from "@/icons/x.svg";
import { ReactElement } from "react";
import { Link } from "../Link";
import { Button } from "../Button";

const EXTERNAL_APPS: { href: string; icon: ReactElement }[] = [
  {
    icon: <GithubIcon className="h-5 w-5" />,
    href: "https://github.com/optimism-java/dispute-explorer-frontend",
  },
  {
    icon: <DiscordIcon className="h-5 w-5" />,
    href: "https://discord.gg/YC34UKyc2Y",
  },
  {
    icon: <XIcon className="h-5 w-5" />,
    href: "https://x.com/optimism_java",
  },
];

export const BottomBarLayout = () => {
  return (
    <div className=" flex flex-col items-center justify-center p-2">
      <div className="sm:hidden">ExplorerDetails</div>
      <div className="mt-4 flex flex-col items-center gap-2 sm:mt-8">
        <div className="flex items-center gap-2">
          {EXTERNAL_APPS.map(({ icon, href }) => (
            <Link key={href} href={href} isExternal hideExternalIcon>
              <Button variant="icon" icon={icon} size="md" />
            </Link>
          ))}
        </div>
        <div className="max-w-lg text-center text-xs text-contentTertiary-light dark:text-contentTertiary-dark">
          The first open source{" "}
          <Link
            href="https://docs.optimism.io/stack/protocol/fault-proofs/explainer"
            isExternal
          >
            fault proofs
          </Link>{" "}
          explorer.
        </div>
        {/* {env.NEXT_PUBLIC_VERSION && (
              <div className="flex items-center gap-1">
                <div className="text-xs text-contentTertiary-light dark:text-contentTertiary-dark">
                  Version:
                </div>
                <div className="relative">
                  <Link
                    href={`https://github.com/Blobscan/blobscan/tree/%40blobscan/web%40${env.NEXT_PUBLIC_VERSION}`}
                    isExternal
                  >
                    <div className="relative -top-0.5 text-xs">
                      {env.NEXT_PUBLIC_VERSION}
                    </div>
                  </Link>
                </div>
              </div>
            )} */}
        <div className="flex gap-2">
          <div className="text-sm text-contentTertiary-light dark:text-contentTertiary-dark">
            Optimism-java © 2024
          </div>
        </div>
      </div>
    </div>
  );
};
