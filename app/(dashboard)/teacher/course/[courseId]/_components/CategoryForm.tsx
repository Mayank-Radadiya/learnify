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
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  data: Course;
  courseId: string;
  option: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().nonempty({ message: "Category is required" }),
});

const CategoryForm = ({ data, courseId, option }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { categoryId: data.categoryId || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(axios.patch(`/api/courses/${courseId}`, value), {
        loading: "Updating Course Category 🥵",
        success: <b>Course Category Updated 🥳</b>,
        error: <b>Failed to update course Category</b>,
      })
      .then((data) => route.refresh())
      .then(() => setIsEditing(false))
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedOption = option.find((item) => item.value === data.categoryId);
  return (
    <>
      <div className="formColor mt-6 border  rounded-md p-4">
        <div className="font-medium flex justify-between items-center">
          Course Category
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? (
                  <>
                    <X className="h-5 w-5 mr-2" />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Pencil className="h-4 w-4 mr-2" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {" "}
              {isEditing ? "Cancel" : "Edit Category"}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && (
          <>
            <p className={cn("text-sm mt-2", !data.categoryId && "italic")}>
              {selectedOption?.label || "No Category"}{" "}
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
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox option={option} {...field} />
                    </FormControl>
                    <FormDescription>Edit course Category</FormDescription>
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

export default CategoryForm;
