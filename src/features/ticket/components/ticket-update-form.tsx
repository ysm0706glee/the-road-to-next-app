import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

type TicketUpdateFromProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFromProps) => {
  return (
    <form
      action={upsertTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2"
    >
      <Input name="id" type="hidden" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket.title} />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />
      <Button type="submit">Create</Button>
    </form>
  );
};

export { TicketUpdateForm };
