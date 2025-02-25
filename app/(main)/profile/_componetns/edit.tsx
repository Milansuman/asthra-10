"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { userDataFillZod, type userZod } from "@/lib/validator";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import type { User } from "next-auth";
import { Card } from "@/components/ui/card";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { allDepartments, allYears } from "@/logic";
import { Loader } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ASTHRA } from "@/logic";

type userSchema = z.infer<typeof userZod>;

type Props = {
  userFromAuth: NonNullable<User>;
  eventsRegistered: inferRouterOutputs<AppRouter>["user"]["getRegisteredEventList"];
  // setUser: (user: userSchema) => void
};

export function ProfileEdit() {
  const { data: sessionData, update } = useSession();
  // const [user, setUser] = useState<userSchema>(userFromAuth);
  const {
    mutateAsync: updateUser,
    isPending: isLoading,
    isSuccess,
  } = api.user.updateUser.useMutation({
    onSuccess: async (data) => {
      toast("User Updated", {
        description: "Your details have been updated!",
      });
      await update({
        ...(sessionData ? sessionData : {}),
        user: {
          ...(sessionData?.user ? sessionData.user : {}),
          ...data[0],
        },
      });
    },
    onError: (err) => {
      toast.error("Unable to process details", {
        description: err.message,
      });
    },
  });

  const form = useForm<userSchema>({
    resolver: zodResolver(userDataFillZod), // use this
    defaultValues: sessionData?.user,
  });

  const handleSubmit = async (values: userSchema) => {
    console.log(values);
    await updateUser(values);
  };

  // {/* <ProfileUpload name="avatar" image={userFromAuth?.image} /> */}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  value={field?.value ?? ("" as string)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="0123456789"
                  {...field}
                  value={field?.value ?? ("" as string)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College / School</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your college's name"
                  {...field}
                  value={
                    field?.value ?? "NA"
                  }
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="KTU"
          render={({ field }) => (
            <FormItem>
              <FormLabel>KTU Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="SJC21AD123 (optional)"
                  {...field}
                  value={
                    field?.value ?? undefined
                  }
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department">
                      {field.value === "NA"
                        ? "Other"
                        : allDepartments[
                        field.value as keyof typeof allDepartments
                        ]}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-400">
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {Object.entries(allDepartments).map(([short, long]) => (
                      <SelectItem key={short} value={short}>
                        ({short.toUpperCase()}) {long}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Passing Out</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a year">
                      {field.value === "NA" ? "Other" : field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-400">
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {Object.keys(allYears).map((short) => (
                      <SelectItem key={short} value={short}>
                        {short === "NA" ? "Other" : short}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSuccess || isLoading}
          type="submit"
          className="text-black mt-4"
        >
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : isSuccess ? (
            "Updated"
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </Form>
  );
}
