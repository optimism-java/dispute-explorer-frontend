import { FC, ReactNode } from "react";
import { Card } from "./Card";
import cn from "classnames";
import Skeleton from "react-loading-skeleton";

export type GameItemCardProps = Partial<{
  name: string;
  content: ReactNode;
  compact: boolean;
}>;

export const GameItemCard: FC<GameItemCardProps> = ({
  name,
  content,
  compact,
}) => {
  return (
    <Card compact={compact}>
      <div
        className={cn(
          {
            "sm:gap-4": !compact,
            "sm:gap-1": compact,
          },
          "flex flex-col justify-between gap-1"
        )}
      >
        <div
          className={cn(
            "text-lg",
            "font-semibold dark:text-warmGray-50",
            "text-center"
          )}
        >
          {name ?? <Skeleton width={80} height={20} />}
        </div>
        <div
          className={cn(
            "text-sm",
            "font-semibold text-contentSecondary-light dark:text-warmGray-300",
            "text-center"
          )}
        >
          {content ?? <Skeleton width={80} height={20} />}
        </div>
      </div>
    </Card>
  );
};
