"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "名前を入力してください。",
    })
    .max(50),
});

interface UserFormProps {
  roomId: string;
}

const UserForm = ({ roomId }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/users", {
        name: values.name,
        role: "USER",
      });
      const userId = response.data.id;
      await axios.post("/api/roomUsers", {
        userId: userId,
        roomId: roomId,
      });
      console.log("user created:", response.data);
      router.push(`/entrance/${roomId}/${userId}`);
    } catch {
      console.log(Error);
    }
    /** {name: string} */
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-10 flex flex-col">
              <FormLabel className="text-center text-2xl font-semibold">
                あなたのニックネームは？
              </FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="kokoro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          決定
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
