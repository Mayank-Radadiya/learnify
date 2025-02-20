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
import { useForm } from "react-hook-form";
import { BookmarkCheck, Pencil, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  data: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAccessForm = ({
  data,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isFree: !!data.isFree },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(
        axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, value),
        {
          loading: "Updating Chapter...🙌",
          success: <b>Chapter is Free now 🥳🥳🥳</b>,
          error: <b>Failed to update Chapter</b>,
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
          Chapter Access Setting
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
                    <BookmarkCheck className="h-4 w-4" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent> {isEditing ? "Cancel" : "Edit"} </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && (
          <>
            <div className={cn("text-sm mt-2", !data.isFree && "italic")}>
              {data.isFree
                ? "This chapter is free for all users."
                : "This chapter is not free for all users."}
            </div>
          </>
        )}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                name="isFree"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="space-y-1 text-sm">
                      Check this box if you want to make this chapter free for
                      all users.
                    </FormDescription>
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
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

export default ChapterAccessForm;
