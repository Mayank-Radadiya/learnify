import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const authData = await auth(); // Ensure auth is awaited
  if (!authData?.userId) {
    throw new UploadThingError("Unauthorized");
  }
  return { userId: authData.userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:");

      return { fileUrl: file.ufsUrl }; // ✅ Ensure response is returned
    }),

  courseAttachment: f(["image", "video", "audio", "pdf", "text"])
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Attachment uploaded:");

      return { fileUrl: file.ufsUrl };
    }),

  chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded:");

      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
