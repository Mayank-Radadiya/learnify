"use client";

import { Chapter } from "@prisma/client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  onEdit: (id: string) => void;
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

const ChapterList = ({ items, onEdit, onReorder }: ChapterListProps) => {
  const [mounted, setMounted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(items);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updateData = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updateData.map((item, index) => ({
      id: item.id,
      position: items.findIndex((i) => i.id === item.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!mounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {" "}
            {chapters.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      item.isPublished &&
                        "bg-sky-200 border-sky-200  text-black "
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "p-1 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        item.isPublished &&
                          "bg-sky-200 border-sky-200 text-black"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical />
                    </div>
                    <div className="flex-1 p-2">{item.title}</div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {item.isFree && <Badge>Free</Badge>}

                      <Badge
                        onClick={() => onEdit(item.id)}
                        className={cn(
                          "bg-yellow-200 text-slate-800 cursor-pointer hover:bg-yellow-300",
                          item.isPublished &&
                            "bg-sky-500 text-sky-100 hover:bg-sky-600"
                        )}
                      >
                        {item.isPublished ? "Published" : "Draft"}{" "}
                      </Badge>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
