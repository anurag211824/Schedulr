"use client";
import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useFetch from "@/hooks/use-fetch";

const EventCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setIscopied] = useState(false);
  const router = useRouter();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIscopied(true);
      setTimeout(() => setIscopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy", error);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);
  
  const handleDelete = async () => {
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };
  
  return (
    <Card className="flex flex-col justify-between cursor-pointer">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription className="flex flex-row gap-2">
          <span>
            {event.duration} min | {event.isPrivate ? "Private" : "Public"}
          </span>
          <span>{event._count.bookings} Bookings</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      {!isPublic && (
        <CardFooter className="flex flex-row gap-2">
          <Button onClick={handleCopy} variant="outline">
            <Link className="w-4 h-4 mr-2" />
            {isCopied ? "Copied" : "Copy Link"}
          </Button>
          <Button onClick={handleDelete} variant="destructive" disabled={loading}>
            <Trash2 className="w-4 h-4 mr-2" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;