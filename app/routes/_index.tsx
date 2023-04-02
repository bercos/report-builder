import { useState } from "react";
import { motion } from "framer-motion";
import type { V2_MetaFunction } from "@remix-run/node";
import { LayoutGroup } from "framer-motion";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export type Col = { id: number; size: number };

const elements: Col[] = [
  { id: 1, size: 3 },
  { id: 2, size: 3 },
  { id: 3, size: 3 },
  { id: 4, size: 3 },
  { id: 5, size: 3 },
  { id: 6, size: 12 },
  { id: 7, size: 3 },
  { id: 8, size: 3 },
  { id: 9, size: 3 },
  { id: 10, size: 3 },
  { id: 11, size: 3 },
  { id: 12, size: 3 },
];

const swap = (i: number, cols: Col[]): Col[] => {
  const newElements = [...cols];
  const newIndex = Math.floor(Math.random() * newElements.length);
  const temp = {
    id: newElements[i].id,
    size: newElements[newIndex].size,
  };
  newElements[i] = {
    id: newElements[newIndex].id,
    size: newElements[i].size,
  };
  newElements[newIndex] = temp;
  return newElements;
};

export default function Index() {
  const [rows, setRows] = useState(elements);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "1rem",
        width: "100%",
        height: "100vh",
      }}
    >
      <LayoutGroup>
        {rows.map((col, i) => (
          <Element
            key={col.id}
            col={col}
            onClick={(c) => setRows(swap(i, rows))}
            index={i}
          />
        ))}
      </LayoutGroup>
    </div>
  );
}

export const Element = ({
  col,
  onClick,
  index,
}: {
  col: Col;
  onClick: (col: Col) => void;
  index: number;
}) => {
  return (
    <motion.div
      key={col.id}
      layout
      layoutId={index.toString()}
      drag
      dragSnapToOrigin
      style={{
        border: "1px solid red",
        gridColumn: `span ${col.size}`,
        display: "grid",
        placeItems: "center",
      }}
      onClick={() => onClick(col)}
    >
      <motion.p layout>{col.id}</motion.p>
    </motion.div>
  );
};
