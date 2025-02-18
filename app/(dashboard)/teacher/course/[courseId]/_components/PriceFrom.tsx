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
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { FormatPrice } from "@/lib/FormatPrice";

interface PriceFormProps {
  data: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z
    .number()
    .int()
    .positive({ message: "Price must be a positive number" }),
});

const PriceForm = ({ data, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { price: data.price ?? undefined },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const payload = { price: Number(value.price) }; // make sure price should be a number
    await toast
      .promise(axios.patch(`/api/courses/${courseId}`, payload), {
        loading: "Updating Course Price 🥵",
        success: <b>Course price 💸💸💸 </b>,
        error: <b>Failed to update course price</b>,
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
          Course Price
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
              {isEditing ? "Cancel" : "Edit Price"}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && (
          <>
            <p className={cn("text-sm mt-2", !data.price && "italic")}>
              {data.price ? FormatPrice(data.price) : "No Price assign"}
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
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        value={field?.value || ""}
                        disabled={isSubmitting}
                        placeholder="69.69"
                      />
                    </FormControl>
                    <FormDescription>Edit course Price</FormDescription>
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

export default PriceForm;
