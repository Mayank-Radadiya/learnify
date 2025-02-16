// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { auth } from "@clerk/nextjs/server";

// const f = createUploadthing();

// const handleAuth = async () => {
//   const authData = await auth(); // Ensure auth is awaited
//   if (!authData?.userId) {
//     throw new UploadThingError("Unauthorized");
//   }

//   return { userId: authData.userId };
// };

// export const ourFileRouter = {
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(handleAuth) // No need for extra `async` wrapper
//     .onUploadComplete(({ metadata }) => {
//       console.log("Upload complete:", metadata);
//     }),

//   courseAttachment: f(["image", "video", "audio", "pdf", "text"])
//     .middleware(handleAuth)
//     .onUploadComplete(({ metadata }) => {
//       console.log("Upload complete:", metadata);
//     }),

//   chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
//     .middleware(handleAuth)
//     .onUploadComplete(({ metadata }) => {
//       console.log("Upload complete:", metadata);
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
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
      console.log("Upload complete:", file.url);

      return { fileUrl: file.url }; // ✅ Ensure response is returned
    }),

  courseAttachment: f(["image", "video", "audio", "pdf", "text"])
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Attachment uploaded:", file.url);

      return { fileUrl: file.url };
    }),

  chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded:", file.url);

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
