import { Placeholder } from "@/components/placeholder";
import { SearchInput } from "@/components/search-input";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { SearchParams } from "../search-params";
import { SortSelect } from "@/components/sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <SearchInput placeholder="Search tickets ..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};

export default TicketList;
