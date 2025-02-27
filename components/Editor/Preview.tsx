"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";


interface EditorProps {
  value: string;
}

const Preview = ({ value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
      className="overflow-auto border-gray-300 rounded-sm shadow-md p-2 max-h-56 border mt-2"
    />
  );
};

export default Preview;
