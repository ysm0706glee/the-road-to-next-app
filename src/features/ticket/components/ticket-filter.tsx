"use client";

import { useQueryState } from "nuqs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { filterParser } from "../search-params";

const TicketFilter = () => {
  const [filter, setFilter] = useQueryState("filter", filterParser);

  const showAllMyTickets = filter === "all";

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="ticket-filter-switch"
        checked={showAllMyTickets}
        onCheckedChange={(next) =>
          setFilter(next ? "all" : "activeOrganization")
        }
      />
      <Label htmlFor="ticket-filter-switch">
        {showAllMyTickets
          ? "All My Tickets"
          : "Only Tickets from My Active Organization"}
      </Label>
    </div>
  );
};

export { TicketFilter };
