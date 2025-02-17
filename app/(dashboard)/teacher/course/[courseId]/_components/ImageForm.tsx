"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/global/File-Upload";
import { cn } from "@/lib/utils";

interface descriptionFormProps {
  data: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().nonempty({ message: "Image is required" }),
});

const ImageForm = ({ data, courseId }: descriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(axios.patch(`/api/courses/${courseId}`, value), {
        loading: "Updating Course Description 😑",
        success: <b>Course Image Updated 😈</b>,
        error: <b>Failed to update course Image</b>,
      })
      .then(() => route.refresh())
      .then(() => setIsEditing(false))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="formColor mt-6 border  rounded-md p-4">
        <div className="font-medium flex justify-between items-center">
          Course Image
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
                    <Plus className="h-4 w-4 mr-2" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isEditing ? (
                "Cancel"
              ) : (
                <>{data.imageUrl ? "Update Image" : "Add Image"} </>
              )}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && !data.imageUrl && (
          <>
            <p className="text-sm mt-2 italic">No Image</p>
          </>
        )}

        {!isEditing &&
          (!data.imageUrl ? (
            <div className="flex items-center justify-center h-60 mt-4 bg-slate-200 rounded-md dark:bg-gray-600">
              <ImageIcon className="h-10 w-10 text-slate-400" />
            </div>
          ) : (
            <>
              {" "}
              <div className="relative aspect-video mt-2">
                <Image
                  alt="upload"
                  fill
                  className="object-cover rounded-md"
                  src={data.imageUrl}
                />
              </div>{" "}
            </>
          ))}

        {isEditing && (
          <div className="mt-4">
            <FileUpload
              endpoint="courseImage"
              onChange={async (url) => {
                if (url) {
                  await onSubmit({ imageUrl: url });
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageForm;
