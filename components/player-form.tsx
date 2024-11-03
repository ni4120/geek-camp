"use client"

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
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  content: z.string().min(1, { message: "回答を入力してください。" }).max(200),
});

interface PlayerFormProps {
  userId: string;
  answerId: string;
}

const PlayerForm = ({ userId, answerId }: PlayerFormProps) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/answers/${answerId}`, {
        content: values.content,
      });
      console.log("Answer updated:", response.data);
      setIsSubmit(true)
    } catch {
      console.error("Failed to update answer:", Error);
    }
    console.log(`userId: ${userId}`);
  };
  return (
    <div className="flex flex-col items-center">
      <Card className="w-[200px] h-[100px] p-4">
        {!isSubmit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">あなたの回答</FormLabel>
                    <FormControl>
                      <Input placeholder="回答を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <div className="w-full flex items-center justify-center">
            送信完了！
          </div>
        )}
      </Card>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        onClick={form.handleSubmit(onSubmit)}
      >
        回答
      </Button>
    </div>
  );
};

export default PlayerForm;
