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
import { Pencil, X } from "lucide-react";
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
import TextEditor from "@/components/Editor/Editor";
import Preview from "@/components/Editor/Preview";

interface ChapterDescriptionFormProps {
  data: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().nonempty({ message: "Description is required" }),
});

const ChapterDescriptionForm = ({
  data,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: data.description || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(
        axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, value),
        {
          loading: "Updating Chapter Description 🙌",
          success: <b>Chapter Description Updated 😇</b>,
          error: <b>Failed to update Chapter Description</b>,
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
          Chapter Description
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
              {isEditing ? "Cancel" : "Edit Description"}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && (
          <>
            <div className={cn("text-sm mt-2", !data.description && "italic")}>
              {!data.description || data.description === "" ? (
                "No description"
              ) : (
                <>
                  <Preview value={data.description} />
                </>
              )}
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
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* Text editor */}

                      <TextEditor {...field} />

                      {/* .......... */}
                    </FormControl>
                    <FormDescription>Edit course Description</FormDescription>
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

export default ChapterDescriptionForm;
