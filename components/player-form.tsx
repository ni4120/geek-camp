import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const formSchema = z.object({
    content: z
      .string()
      .min(1, { message: "回答を入力してください。" })
      .max(200),
});

interface PlayerFormProps {
    userId: string
}

const PlayerForm = ({
    userId
}: PlayerFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // TODO: API request
        console.log(values)
        console.log(`userId: ${userId}`)
    }
    return (
        <div className="flex flex-col items-center">
            <Card className="w-[200px] h-[100px] p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">
                                        あなたの回答
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="回答を入力" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
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
}
 
export default PlayerForm;