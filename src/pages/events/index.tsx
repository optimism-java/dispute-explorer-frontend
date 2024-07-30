import { useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// import { BlockCard } from "@/components/Cards/SurfaceCards/BlockCard";
import { PaginatedListLayout } from "@/components/Layouts/PaginatedListLayout";
import NextError from "@/pages/_error";
import { formatNumber } from "@/utils";
import { GameCard } from "@/components/Cards/SurfaceCards/GameCard";
import { getPaginationParams } from "@/utils/pagination";
import { useLatestGame } from "@/hooks/useLatestGame";
import { useSyncEvents } from "@/hooks/useSyncEvents";
import { EventCard } from "@/components/Cards/SurfaceCards/EventCard";

const Events: NextPage = function () {
  const router = useRouter();
  const { p, ps } = getPaginationParams(router.query);
  const { data: rawEventsData, error } = useSyncEvents({ offset: (p - 1), limit: ps })
  const eventsData = useMemo(() => {
    if (!rawEventsData) {
      return {};
    }

    return {
      totalEvents: rawEventsData.estimatedTotalHits,
      events: rawEventsData.hits
    };
  }, [rawEventsData]);
  const { events, totalEvents } = eventsData;

  if (error) {
    return (
      <NextError
        title={error.message}
        statusCode={500}
      />
    );
  }

  return (
    <PaginatedListLayout
      header={`Events ${totalEvents ? `(${formatNumber(totalEvents)})` : ""}`}
      items={events?.map((e) => (
        <EventCard events={e} />
      ))}
      totalItems={totalEvents}
      page={p}
      pageSize={ps}
      itemSkeleton={<EventCard />}
      emptyState="No Event"
    />
  );
};

export default Events;
