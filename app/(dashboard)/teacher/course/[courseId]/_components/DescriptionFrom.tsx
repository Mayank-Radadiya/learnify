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
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";

interface descriptionFormProps {
  data: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().nonempty({ message: "Description is required" }),
});

const DescriptionForm = ({ data, courseId }: descriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { description: data.description || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(axios.patch(`/api/courses/${courseId}`, value), {
        loading: "Updating Course Description 🥵",
        success: <b>Course description 🚀🚀🚀</b>,
        error: <b>Failed to update course description</b>,
      })
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
          Course Description
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
            <p className={cn("text-sm mt-2", !data.description && "italic")}>
              {data.description || "No description"}{" "}
            </p>
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
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="This course is about..."
                      />
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

export default DescriptionForm;
