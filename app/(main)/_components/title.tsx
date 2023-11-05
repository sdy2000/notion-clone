"use client";

import { useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false);
  return <div className="">Title</div>;
};
export default Title;
