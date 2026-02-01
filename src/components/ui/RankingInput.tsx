"use client";

import React, { useState } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface RankingInputProps {
  items: string[];
  onChange: (items: string[]) => void;
}

function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-3 p-4 bg-white/50 border-2 rounded-xl mb-2 transition-colors ${
        isDragging ? 'border-primary shadow-lg z-50 bg-white' : 'border-accent'
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-accent hover:text-primary">
        <GripVertical className="w-5 h-5" />
      </div>
      <span className="font-medium text-charcoal">{id}</span>
    </div>
  );
}

export function RankingInput({ items: initialItems, onChange }: RankingInputProps) {
  const [items, setItems] = useState(initialItems);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChange(newItems);
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className="py-2">
          {items.map(id => <SortableItem key={id} id={id} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
}
