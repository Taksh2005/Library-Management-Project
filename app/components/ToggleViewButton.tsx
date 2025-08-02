import React from "react";
import { List, Grid3x3 } from "lucide-react"; // Optional: use heroicons or lucide-react

type Props = {
  mode: "grid" | "list";
  setMode: (mode: "grid" | "list") => void;
};

export default function ToggleViewButton({ mode, setMode }: Props) {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <button
        className={`p-2 rounded border ${mode === "grid" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => setMode("grid")}
        title="Grid view"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded border ${mode === "list" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => setMode("list")}
        title="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
