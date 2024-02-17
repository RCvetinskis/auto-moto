"use client";
import { PostType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NavDropDownStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useNavDropDown = create<NavDropDownStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface AddPostStore {
  post: PostType;
  addPost: (post: PostType) => void;
  remove: () => void;
  service: string | null;
  addService: (service: string) => void;
  removeService: () => void;
  removeAll: () => void;
}

export const usePost = create(
  persist<AddPostStore>(
    (set) => ({
      post: {
        data: null,
        images: [],
      },
      addPost: (post: PostType) => {
        set({ post });
      },
      remove: () => set({ post: { data: null, images: [] } }),
      service: null,
      addService: (service: string) => {
        set({ service });
      },
      removeService: () => set({ service: null }),

      removeAll: () => set({ service: null, post: { data: null, images: [] } }),
    }),
    {
      name: "post-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
