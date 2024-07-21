import { useLatestGame } from "@/hooks/useLatestGame";
import DisputeGameLogo from "@/components/DisputeGameLogo";
import { SearchInput } from "@/components/SearchInput";
import { Link } from "@/components/Link";

export default function Page() {
  const { data, error, isLoading } = useLatestGame();
  console.log(data);
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
            MetricCard MetricCard MetricCard MetricCard
          </div>
          <div className="col-span-2 sm:col-span-4">DailyTransactionsChart</div>
        </div>
        <div className="grid grid-cols-1 items-stretch justify-stretch gap-6 lg:grid-cols-3">
          content
        </div>
      </div>
    </div>
  );
}
