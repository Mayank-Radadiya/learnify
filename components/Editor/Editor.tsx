"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const TextEditor = ({ onChange, value }: EditorProps) => {
  // Dynamically import Quill to avoid SSR issues
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="overflow-auto border-gray-300 rounded-sm shadow-md p-2 min-h-24 h-56"
      />
    </div>
  );
};

export default TextEditor;
