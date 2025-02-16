// import { UploadDropzone } from "@/lib/uploadthing";
// import { ourFileRouter } from "@/app/api/uploadthing/core";
// import toast from "react-hot-toast";
// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   endpoint: keyof typeof ourFileRouter;
// }

// const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
//   return (
//     <UploadDropzone
//       endpoint={endpoint}
//       onClientUploadComplete={(file) => onChange(file?.[0].url)}
//       onUploadError={(error: Error) => {
//         toast.error("Failed to upload file");
//         console.error("Failed to upload file", error);
//       }}
//     />
//   );
// };

// export default FileUpload;

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(files) => {
        if (files && files.length > 0) {
          onChange(files[0].url);
          toast.success("File uploaded successfully!");
        } else {
          toast.error("No file received.");
        }
      }}
      onUploadError={(error: Error) => {
        toast.error("Failed to upload file");
        console.error("Upload error:", error);
      }}
    />
  );
};

export default FileUpload;
