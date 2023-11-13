"use client";

import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

import { useEdgeStore } from "@/lib/edgestore";
import { ConfirmModal } from "@/components/modals";
import { useRouter } from "next/navigation";

interface BannerProps {
  documentId: Id<"documents">;
  url?: string;
}

const Banner = ({ documentId, url }: BannerProps) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal hover:bg-rose-700 duration-300"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal hover:bg-rose-700 duration-300"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
export default Banner;
