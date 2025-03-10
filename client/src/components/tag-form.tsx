import { TagSchema, tagSchema } from '@/lib/zod';
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagType } from '@/lib/types';
import ColorInput from './color-input';



interface TagFormProps {
    mode: "create" | "update";
    tag?: TagType
}

function TagForm({ mode, tag }: TagFormProps) {
    const form = useForm<TagSchema>({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            name: "",
            color: ""
        }
    })

    const onSubmit = (data: TagSchema) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Name of tag' {...field} />
                            </FormControl>
                            <FormDescription>
                                Name of the tag
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <ColorInput value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default TagForm