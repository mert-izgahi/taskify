import { TagType } from "@/lib/types";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { TagSchema } from "@/lib/zod";
import { toast } from "sonner";
interface ITagsStore {
  isPending: boolean;
  isLoading: boolean;
  error: string | null;
  data: TagType[] | null;
  mode: "create" | "update";
  selectedTag: TagType | null;
  createTag: (args: TagSchema) => Promise<void>;
  updateTag: (id: string, data: TagSchema) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  getAllTags: () => Promise<void>;
  setSelectedTag: (tag: TagType | null) => void;
  setMode: (mode: "create" | "update") => void;
}

export const useTagsStore = create<ITagsStore>((set, get) => ({
  isPending: false,
  isLoading: false,
  error: null,
  data: null,
  mode: "create",
  selectedTag: null,
  createTag: async (args: TagSchema) => {
    set({ isPending: true });
    try {
      const response = await axiosInstance.post("/api/tags", args);
      const { data } = await response.data;
      get().getAllTags();
      toast.success("Tag created successfully");
      set({ data });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      set({ error: "Something went wrong" });
    } finally {
      set({ isPending: false });
    }
  },
  updateTag: async (id: string, args: TagSchema) => {
    set({ isPending: true });
    try {
      const response = await axiosInstance.put(`/api/tags/${id}`, args);
      const { data } = await response.data;
      get().getAllTags();
      toast.success("Tag updated successfully");
      set({ data });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      set({ error: "Something went wrong" });
    } finally {
      set({ isPending: false });
    }
  },
  deleteTag: async (id: string) => {
    set({ isPending: true });
    try {
      const response = await axiosInstance.delete(`/api/tags/${id}`);
      const { data } = await response.data;
      get().getAllTags();
      toast.success("Tag deleted successfully");
      set({ data });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      set({ error: "Something went wrong" });
    } finally {
      set({ isPending: false });
    }
  },
  getAllTags: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/tags");
      const { data } = await response.data;

      set({ data });
    } catch (error) {
      console.log(error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setMode: (mode) => set({ mode }),
}));
