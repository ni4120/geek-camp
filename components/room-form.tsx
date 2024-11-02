"use client";

import { useRouter } from "next/navigation"
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
      message: "部屋の名前を入力してください。",
    })
    .max(50),
});

interface RoomFormProps {
  userId: string;
}

const RoomForm = ({ userId }: RoomFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/rooms", {
        name: values.name,
        hostId: userId,
      });
      const roomId = response.data.id;
      console.log("room created:", response.data);
      router.push(`/create/${userId}/${roomId}`)
    } catch (error) {
      console.error("Error creating room:", error);
    }
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
                部屋の名前
              </FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="AI大喜利" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          作成
        </Button>
      </form>
    </Form>
  );
};

export default RoomForm;
