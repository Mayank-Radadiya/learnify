"use client";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Pencil, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChapterTitleFormProps {
  data: { title: string };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
});

const ChapterTitleForm = ({
  data,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(
        axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, value),
        {
          loading: "Updating Chapter Title 🙌",
          success: <b>Chapter Title Updated 😇</b>,
          error: <b>Failed to update Chapter Title</b>,
        }
      )
      .then((data) => route.refresh())
      .then(() => setIsEditing(false))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="formColor mt-6 border  rounded-md p-4">
        <div className="font-medium flex justify-between items-center">
          Chapter Title
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? (
                  <>
                    <X className="h-5 w-5" />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Pencil className="h-4 w-4" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {" "}
              {isEditing ? "Cancel" : "Edit Title"}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && (
          <>
            <p className="text-sm mt-2">{data.title} </p>
          </>
        )}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g Introduction to the course"
                      />
                    </FormControl>
                    <FormDescription>Edit chapter title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Change
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

export default ChapterTitleForm;
