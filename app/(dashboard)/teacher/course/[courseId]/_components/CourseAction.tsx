"use client";

import Model from "@/components/global/Model";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

// Delete course action .....
const CourseAction = ({
  courseId,
  isPublished,
  disabled,
}: CourseActionProps) => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  // delete Api call...
  const onDelete = async () => {
    setLoading(true);
    await toast
      .promise(axios.delete(`/api/courses/${courseId}`), {
        loading: "Deleting Course... 🙌",
        success: <b>Course deleted successfully</b>,
        error: <b>Failed to delete Course</b>,
      })
      .then(() => {
        route.push(`/teacher/course`);
        route.refresh();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // publish Api call...
  const onPublish = async () => {
    if (!isPublished === true && disabled) {
      toast.error("Please fill all the required fields to publish the chapter");
      return;
    }
    setLoading(true);
    if (isPublished) {
      await toast
        .promise(axios.patch(`/api/courses/${courseId}/unpublish`), {
          loading: "Updating Course Status... 🙌",
          success: <b>Course is unpublished Now 🥹</b>,
          error: <b>Failed to unpublished Course</b>,
        })
        .then(() => route.refresh())
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    } else {
      await toast
        .promise(axios.patch(`/api/courses/${courseId}/publish`), {
          loading: "Updating Chapter... 🙌",
          success: <b>Course is published Now 🥳🥳🥳</b>,
          error: <b>Failed to published Course</b>,
        })
        .then(() => route.refresh())
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={onPublish}
        className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/90 backdrop-blur-lg px-4 py-1.5 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
      >
        <span className="text-lg">{isPublished ? "Unpublish" : "Publish"}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/30"></div>
        </div>
      </button>

      <Model onConfirm={onDelete}>
        <Button
          className="hover:bg-red-500/90"
          disabled={loading}
          variant="outline"
        >
          <Trash />
        </Button>
      </Model>
    </div>
  );
};

export default CourseAction;
