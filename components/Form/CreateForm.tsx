"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateFormSchema } from "./Create.Form";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateForm = () => {
  const route = useRouter();
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof CreateFormSchema>) => {
    await toast
      .promise(axios.post("/api/courses", value), {
        loading: "Creating course...👉",
        success: <b>Course created successfully 🚀🚀🚀</b>,
        error: <b>Failed to create course</b>,
      })
      .then((data) => route.push(`/teacher/course/${data.data.id}`))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6 h-full ">
        <div>
          <h1 className="text-3xl">Name your Course</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose a name for your course and start creating your course
          </p>

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
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g Market Analysis"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the title of your course
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 hover:bg-red-400"
                  >
                    <X />
                    Cancel{" "}
                  </Button>
                </Link>

                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Submit <ChevronRight />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
