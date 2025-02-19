"use client";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import ChapterList from "./ChapterList";

interface ChapterFromProps {
  data: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "Description is required" }),
});

const ChapterFrom = ({ data, courseId }: ChapterFromProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const route = useRouter();

  const toggleCreate = () => setIsCreating((pre) => !pre);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(axios.post(`/api/courses/${courseId}/chapters`, value), {
        loading: "Creating Course Chapter ...",
        success: <b>Course Chapter Created 😎 </b>,
        error: <b>Failed to create a chapter</b>,
      })
      .then((data) => route.refresh())
      .then(() => form.reset())
      .then(() => toggleCreate())
      .catch((error) => {
        console.log(error);
      });
  };

  const OnReorder = async (UpdatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: UpdatedData,
      });
      setIsUpdating(false);
      toast.success("Chapter reordered successfully");
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
      toast.error("Failed to reorder chapter");
    }
  };

  const onEdit = (id: string) => {
    route.push(`/teacher/course/${courseId}/chapter/${id}`);
  };
  return (
    <>
      <div className="formColor mt-6 border relative rounded-md p-4">
        {/* Loader */}
        {isUpdating && (
          <div className="w-full h-full flex justify-center right-0 top-0 items-center absolute bg-slate-600/20">
            <Loader2 className="animate-spin h-6 w-6 text-sky-500" />
          </div>
        )}
        {/* Main Chapter start */}
        <div className="font-medium flex justify-between items-center">
          Course chapters
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={toggleCreate}>
                {isCreating ? (
                  <>
                    <X className="h-5 w-5" />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <PlusCircle className="h-4 w-4" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {" "}
              {isCreating ? "Cancel" : "Add a chapter"}{" "}
            </TooltipContent>
          </Tooltip>
        </div>

        {data.chapters.length === 0 && (
          <div className="text-muted-foreground italic text-sm mt-4">
            No chapters available
          </div>
        )}

        {isCreating && (
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
                        placeholder="eg. Introduction to the course"
                      />
                    </FormControl>
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
                  onClick={() => setIsUpdating(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        )}
        {!isCreating && data.chapters.length > 0 && (
          <>
            <ChapterList
              onEdit={onEdit}
              onReorder={OnReorder}
              items={data.chapters || []}
            />
          </>
        )}

        {!isCreating && (
          <div className="text-sm text-muted-foreground mt-4">
            Drag and Drop to reorder chapters
          </div>
        )}
      </div>
    </>
  );
};

export default ChapterFrom;
