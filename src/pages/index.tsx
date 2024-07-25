import { useLatestGame } from "@/hooks/useLatestGame";
import DisputeGameLogo from "@/components/DisputeGameLogo";
import { SearchInput } from "@/components/SearchInput";
import { Link } from "@/components/Link";
import { Card } from "@/components/Cards/Card";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { SlidableList } from "@/components/SlidableList";
import { GameCard } from "@/components/Cards/SurfaceCards/GameCard";
import { CreditCard } from "@/components/Cards/SurfaceCards/CreditCard";
import { Credit, Game, IndexResponse, PageListResponse } from "@/types";
import { useCreditRank } from "@/hooks/useCreditRank";
import NextError from "@/pages/_error";
import { useOverview } from "@/hooks/useOverview";
import { useAmoutPerDay } from "@/hooks/useAmoutPerDay";

const LATEST_ITEMS_LENGTH = 5;
const CARD_HEIGHT = "sm:h-28";

export default function Page() {
  const {
    data: games,
    error: latestGamesError,
    isLoading: latestGamesLoading,
  } = useLatestGame();

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
  } = useCreditRank();
  const router = useRouter();

  const {} = useOverview();

  const {} = useAmoutPerDay();

  const error = latestGamesError || creditsError;

  if (error) {
    return <NextError title={error.message} statusCode={500} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 sm:gap-20">
      <div className=" flex flex-col items-center justify-center gap-8 md:w-8/12">
        <DisputeGameLogo className="w-64 md:w-80" />
        <div className="flex w-full max-w-lg flex-col items-stretch justify-center space-y-2">
          <SearchInput />
          <span className="text-center text-sm  text-contentSecondary-light dark:text-contentSecondary-dark">
            Explorer for the{" "}
            <Link
              href="https://docs.optimism.io/stack/protocol/fault-proofs/explainer"
              isExternal
            >
              Fault proofs
            </Link>
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8 sm:gap-10">
        <div className="grid grid-cols-2 space-y-6 lg:grid-cols-10 lg:gap-6 lg:space-y-0">
          <div className="col-span-2 sm:col-span-4">
            DailyBlobGasComparisonChart
          </div>
          <div className="col-span-2 grid w-full grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-2">
            <div className="col-span-2">MetricCard</div>
            MetricCard MetricCard
          </div>
          <div className="col-span-2 sm:col-span-4">DailyTransactionsChart</div>
        </div>
        <div className="grid grid-cols-1 items-stretch justify-stretch gap-6 lg:grid-cols-2">
          <Card
            header={
              <div className="flex items-center justify-between gap-5">
                <div>Latest Games</div>
                <Button
                  variant="outline"
                  label="View All Games"
                  onClick={() => void router.push("/")}
                />
              </div>
            }
            emptyState="No games"
          >
            <div className="h-[660px] sm:h-[630px]">
              {latestGamesLoading ? (
                <div className="flex flex-col gap-4">
                  {Array(LATEST_ITEMS_LENGTH)
                    .fill(0)
                    .map((_, i) => (
                      <div className={CARD_HEIGHT} key={i}>
                        <GameCard />
                      </div>
                    ))}
                </div>
              ) : (
                <SlidableList
                  items={(games as IndexResponse<Game>).hits.map((g) => ({
                    id: g.id,
                    element: (
                      <div className={CARD_HEIGHT} key={g.id}>
                        <GameCard game={g} />
                      </div>
                    ),
                  }))}
                />
              )}
            </div>
          </Card>
          <Card
            header={
              <div className="flex items-center justify-between gap-5">
                <div>Latest Credits</div>
                <Button
                  variant="outline"
                  label="View All Credits"
                  onClick={() => void router.push("/")}
                />
              </div>
            }
            emptyState="No games"
          >
            <div className="h-[660px] sm:h-[630px]">
              {creditsLoading ? (
                <div className="flex flex-col gap-4">
                  {Array(LATEST_ITEMS_LENGTH)
                    .fill(0)
                    .map((_, i) => (
                      <div className={CARD_HEIGHT} key={i}>
                        <GameCard />
                      </div>
                    ))}
                </div>
              ) : (
                <SlidableList
                  items={(credits as PageListResponse<Credit>).data.map(
                    (g, i) => ({
                      id: g.address,
                      element: (
                        <div className={CARD_HEIGHT} key={g.address}>
                          <CreditCard credit={g} index={i} />
                        </div>
                      ),
                    })
                  )}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
