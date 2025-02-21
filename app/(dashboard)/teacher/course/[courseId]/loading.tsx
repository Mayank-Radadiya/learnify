import Loader from "@/components/global/Loader";
import Loader2 from "@/components/global/Loader2";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <Loader2 />
      </div>
    </div>
  );
}
