import { FC } from "react";
import { Card } from "./Card";
import cn from "classnames";
import Skeleton from "react-loading-skeleton";

export type GameItemCardProps = Partial<{
  name: string;
  content: string;
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
            "text-xl",
            "font-semibold dark:text-warmGray-50",
            "text-center"
          )}
        >
          {name ?? <Skeleton width={80} height={20} />}
        </div>
        <div
          className={cn(
            "text-lg",
            "font-semibold dark:text-warmGray-50",
            "text-center"
          )}
        >
          {content ?? <Skeleton width={80} height={20} />}
        </div>
      </div>
    </Card>
  );
};
