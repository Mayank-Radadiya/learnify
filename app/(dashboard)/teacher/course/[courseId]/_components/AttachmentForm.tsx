"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/global/File-Upload";

interface AttachmentFormProps {
  data: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ data, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(axios.post(`/api/courses/${courseId}/attachments`, value), {
        loading: "Updating Course Attachments 🫡",
        success: <b>Course Attachments Updated 😈</b>,
        error: <b>Failed to update course Attachments</b>,
      })
      .then(() => route.refresh())
      .then(() => setIsEditing(false))
      .catch((error) => {
        console.log(error);
      });
  };

  const onDelete = async (id: string) => {
    try {
      console.log(id);
      const deleteResponse = await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`
      );
      if (deleteResponse.status === 200) {
        toast.success("Attachment deleted successfully");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete attachment");
    }
  };
  return (
    <>
      <div className="formColor mt-6 border  rounded-md p-4">
        <div className="font-medium flex justify-between items-center">
          Course Attachments
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
                    <Plus className="h-4 w-4" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isEditing ? (
                "Cancel"
              ) : (
                <>
                  {data.attachments ? "Update Attachments" : "Add Attachments"}{" "}
                </>
              )}{" "}
            </TooltipContent>
          </Tooltip>
        </div>

        {!isEditing && (
          <>
            {data.attachments.length === 0 ? (
              <p className="text-sm italic mt-2">No Attachments Uploaded</p>
            ) : (
              <>
                <div className="space-y-2">
                  {data.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex justify-between items-center p-3 w-full rounded-md bg-sky-100 border-sky-200 text-slate-800 border dark:bg-sky-800 dark:border-sky-700 dark:text-sky-100"
                    >
                      <p className="text-xs flex line-clamp-1">
                        {" "}
                        <File className="h-4 w-4 mr-2 flex-shrink-0" />
                        {attachment.name}{" "}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="flex-shrink-0 hover:bg-red-300 border-red-300 dark:hover:bg-red-500 dark:border-red-700"
                            variant="ghost"
                            onClick={() => onDelete(attachment.id)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Attachment</TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {isEditing && (
          <div className="mt-4">
            <FileUpload
              endpoint="courseAttachment"
              onChange={async (url) => {
                if (url) {
                  await onSubmit({ url: url });
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AttachmentForm;
