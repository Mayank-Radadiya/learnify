"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Clapperboard, Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/global/File-Upload";
import dynamic from "next/dynamic";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false, // Disable SSR for this component
});

interface descriptionFormProps {
  data: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().nonempty({ message: "VideoUrl is required" }),
});

const VideoForm = ({ data, courseId, chapterId }: descriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await toast
      .promise(
        axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, value),
        {
          loading: "Updating Chapter Video... 🥱",
          success: <b>Chapter Video Updated 😈</b>,
          error: <b>Failed to update chapter Video</b>,
        }
      )
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
          Chapter Video
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
                <>{data.videoUrl ? "Update Video" : "Add video"} </>
              )}{" "}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isEditing && !data.videoUrl && (
          <>
            <p className="text-sm mt-2 italic">No Image</p>
          </>
        )}

        {!isEditing &&
          (!data.videoUrl ? (
            <div className="flex items-center justify-center h-60 mt-4 bg-slate-200 rounded-md dark:bg-gray-600">
              <Clapperboard className="h-10 w-10 text-slate-400" />
            </div>
          ) : (
            <>
              {" "}
              <div className="relative aspect-video mt-2">
                <MuxPlayer playbackId={data?.muxData?.playbackId || ""} />
              </div>{" "}
            </>
          ))}

        {isEditing && (
          <div className="mt-4">
            <FileUpload
              endpoint="chapterVideo"
              onChange={async (url) => {
                if (url) {
                  await onSubmit({ videoUrl: url });
                }
              }}
            />
          </div>
        )}
        {data.videoUrl && !isEditing && (
          <>
            <div className="text-sm text-muted-foreground mt-2">
              Video can take a few minutes to process. refresh the page if the
              video does not show up
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VideoForm;
