import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utills/is-owner";
import { Comments } from "@/features/comment/components/comments";
import { CommentWithMetadata } from "@/features/comment/types";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

interface TicketItemProps {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
  comments?: CommentWithMetadata[];
}

const TicketItem = async ({ ticket, isDetail, comments }: TicketItemProps) => {
  const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {editButton}
              {detailButton}
            </>
          )}
        </div>
      </div>
      {isDetail ? <Comments ticketId={ticket.id} comments={comments} /> : null}
    </div>
  );
};

export { TicketItem };
