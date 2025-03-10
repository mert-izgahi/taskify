import { TagSchema, tagSchema } from '@/lib/zod';
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ColorInput from './color-input';
import { useTagsStore } from '@/store/use-tags';
import { useEffect } from 'react';
import { useModalStore } from '@/store/use-modal';
function TagForm() {
    const tagsStore = useTagsStore();
    const modalStore = useModalStore();
    const form = useForm<TagSchema>({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            name: "",
            color: ""
        }
    })

    const onSubmit = async (data: TagSchema) => {
        if (tagsStore.mode === "create") {
            await tagsStore.createTag(data);
        } else {
            if (tagsStore.selectedTag) {
                await tagsStore.updateTag(tagsStore.selectedTag._id, data);
            }
        }
        modalStore.close();
    }

    useEffect(() => {
        if (tagsStore.selectedTag && tagsStore.mode === "update") {
            form.setValue("name", tagsStore.selectedTag.name);
            form.setValue("color", tagsStore.selectedTag.color);
        }
    }, [tagsStore.selectedTag, tagsStore.mode])


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