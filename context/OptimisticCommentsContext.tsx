"use client";

import { createContext, useContext, useState } from "react";

type OptimisticComment = {
  id: string;
  content: string;
};

type ContextType = {
  comments: OptimisticComment[];
  add: (content: string) => void;
  clear: () => void;
};

const OptimisticCommentsContext =
  createContext<ContextType | null>(null);

export function OptimisticCommentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [comments, setComments] = useState<OptimisticComment[]>([]);

  function add(content: string) {
    setComments((prev) => [
      ...prev,
      {
        id: `optimistic-${Date.now()}`,
        content,
      },
    ]);
  }

  function clear() {
    setComments([]);
  }

  return (
    <OptimisticCommentsContext.Provider
      value={{ comments, add, clear }}
    >
      {children}
    </OptimisticCommentsContext.Provider>
  );
}

export function useOptimisticComments() {
  const ctx = useContext(OptimisticCommentsContext);
  if (!ctx) {
    throw new Error(
      "useOptimisticComments must be used inside provider",
    );
  }
  return ctx;
}
