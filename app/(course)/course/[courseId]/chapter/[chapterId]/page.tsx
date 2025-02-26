import { getChapter } from "@/action/get-chapter";
import Banner from "@/components/global/Banner";
import { auth } from "@clerk/nextjs/server";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import VideoPlayer from "../_components/VideoPlayer";
import CourseEnrollButton from "@/components/global/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/Editor/Preview";
import { File } from "lucide-react";

interface PageProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { chapterId, courseId } = await params;
  const { userId } = await auth();

  if (!userId) {
    toast.error("You need to be logged in to view this page");
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachment,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) {
    toast.error("Chapter or Course not found. Try again later");
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completedOnEnd = !!purchase && userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter." variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to view this chapter."
          variant="warning"
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completedOnEnd={completedOnEnd || false}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl mb-2 font-semibold">{chapter.title}</h2>
          {purchase ? (
            <>purchase </>
          ) : (
            <>
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            </>
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachment.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachment.map((attachment) => (
                <a
                  href={attachment.url}
                  key={attachment.id}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name} </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
