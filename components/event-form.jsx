"use client";
import { eventSchema } from "@/app/_lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { createEvent } from "@/actions/events";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
const EventForm = ({ onSubmitForm }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = 
  useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });
  const { loading, error, fn: fncreateEvent } = useFetch(createEvent);
  const onSubmit = async (data) => {
     console.log("Submitting event:", data);
    await fncreateEvent(data);
    if (!loading && !error) {
      onSubmitForm();
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 flex flex-col gap-4"
    >
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="title"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} className="mt-1" />
        {errors.title && (
          <p className="ml-[-25px] text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Event description
        </label>
        <Input id="description" {...register("description")} className="mt-1" />
        {errors.description && (
          <p className="ml-[-25px] text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="duration"
        >
          Duration (minutes)
        </label>
        <Input
          id="duration"
          {...register("duration", {
            valueAsNumber: true,
          })}
          className="mt-1"
          placeholder="30"
        />
        {errors.duration && (
          <p className="ml-[-25px] text-red-500 text-sm mt-1">
            {errors.duration.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="isPrivate"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => field.onChange(value === "true")}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.isPrivate && (
          <p className="ml-[-25px] text-red-500 text-sm mt-1">
            {errors.isPrivate.message}
          </p>
        )}
        {error && (
          <p className="ml-[-25px] text-red-500 text-sm mt-1">
            {error?.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "submitting..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
