"use client";

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type CustomSelectProps = {
  options: {
    label: string;
    value: string;
    searchStr?: string;
    leftIcon?: React.ReactNode;
  }[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  searchable?: boolean;
};

const inputBase =
  "w-full rounded-sm border border-gray-200 bg-transparent px-4 py-3 text-sm text-text-heading placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200";

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  searchable,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedOpt = options.find((o) => o.value === value);

  const filtered = options.filter(
    (o) =>
      !searchable ||
      search === "" ||
      (o.searchStr || o.label).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className={`${inputBase} cursor-pointer flex justify-between items-center select-none ${
          !value ? "text-gray-400" : "text-text-heading"
        }`}
        style={{ height: "59.19px", padding: "0 20px" }}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOpt ? (
            <>
              {selectedOpt.leftIcon}
              {selectedOpt.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-72 rounded-sm bg-white border border-gray-200 shadow-xl overflow-hidden flex flex-col">
          {searchable && (
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 px-3 shrink-0 bg-white/80 sticky top-0">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm outline-none py-2 text-gray-700 bg-white/80 rounded-none"
                style={{
                  all: "unset",
                  width: "100%",
                  height: "auto",
                  fontSize: "14px",
                  background: "transparent",
                  textAlign: "left",
                }}
                placeholder="Search..."
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="overflow-y-auto py-1 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                    value === opt.value
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {opt.leftIcon}
                  <span className="truncate">{opt.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default CustomSelect;
