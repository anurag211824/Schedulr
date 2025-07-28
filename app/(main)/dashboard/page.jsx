"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/_lib/validators";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });
  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);
  const {
    data,
    loading,
    error,
    fn: fnUpdateUsername,
  } = useFetch(updateUsername);
  const onSubmit = async (data) => {
    fnUpdateUsername(data.username);
  };
  return (
    <div>
      <Card>
        <CardHeader>Welcome ,{user?.firstName}</CardHeader>
        {/* latest updates */}
      </Card>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Your unique Link</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="flex flex-row items-center gap-2">
                  <span className="ml-[-25px]">
                    {" "}
                    {typeof window !== "undefined"
                      ? window.location.origin
                      : ""}
                  </span>
                  <Input {...register("username")} placeholder="username" />
                </div>
                {errors.username && (
                  <p className="ml-[-25px] text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
                {error && (
                  <p className="ml-[-25px] text-red-500 text-sm mt-1">
                    {error?.message}
                  </p>
                )}
                {/* Server action errors from response */}
                {data?.error && (
                  <p className=" ml-[-25px] text-red-500 text-sm mt-1">{data.error}</p>
                )}

                {/* Success message */}
                {data?.success && (
                  <p className="ml-[-25px] text-green-500 text-sm mt-1">
                    Username updated successfully! ✅
                  </p>
                )}
              </div>
              {loading && (
                <BarLoader className="mb-4" width="100" color="#36d7b7" />
              )}
              <Button className="ml-[-25px]" type="submit">
                Update username
              </Button>
            </form>
          </CardContent>
        </CardHeader>
        {/* latest updates */}
      </Card>
    </div>
  );
};

export default Dashboard;
