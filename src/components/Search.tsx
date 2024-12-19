import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks/use-debouce";
import { motion, AnimatePresence } from "framer-motion";

type Category = "All" | "Workspaces" | "Channels" | "Users";

interface Suggestion {
  category: Category;
  item: string;
}

const GlobalSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const DebouncedSearch = useDebounce<string>(searchTerm);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const mockData = useMemo(
    () => ({
      All: [
        "General",
        "Announcements",
        "Team Updates",
        "Marketing Team",
        "Development Team",
        "Design Studio",
        "Alice Johnson",
        "Bob Smith",
        "Charlie Davis",
      ],
      Workspaces: ["Marketing Team", "Development Team", "Design Studio"],
      Channels: ["General", "Announcements", "Team Updates"],
      Users: ["Alice Johnson", "Bob Smith", "Charlie Davis"],
    }),
    []
  );

  useEffect(() => {
    const value = DebouncedSearch;

    if (value.trim()) {
      const filteredSuggestions: Suggestion[] = Object.entries(mockData)
        .filter(([category]) => category !== "All")
        .flatMap(([category, items]) =>
          items
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            .map((item) => ({ category: category as Category, item }))
        );

      setSuggestions(filteredSuggestions);
    } else {
      const allSuggestions: Suggestion[] = Object.entries(mockData)
        .filter(([category]) => category !== "All")
        .flatMap(([category, items]) =>
          items.map((item) => ({ category: category as Category, item }))
        );

      setSuggestions(allSuggestions);
    }
  }, [DebouncedSearch, mockData]);

  return (
    <div className="w-full max-w-2xl mx-auto items-center h-12">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zm4.293-4.293l5.207 5.207"
            />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            className="mt-2 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <span>{suggestion.item}</span>
                  <span className="text-xs text-gray-500">
                    {suggestion.category}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearchBar;
