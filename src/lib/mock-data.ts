export type FileItem = {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
};

export type FolderItem = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockFolders: FolderItem[] = [
  { id: "root", name: "root", type: "folder", parent: null },
  { id: "1", name: "Documents", type: "folder", parent: "root" },
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Work", type: "folder", parent: "root" },
  { id: "4", name: "Presentation", type: "folder", parent: "3" },
];

export const mockFiles: FileItem[] = [
  {
    id: "15",
    name: "resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: "1",
    size: "120KB",
  },
  {
    id: "102",
    name: "photo1.jpg",
    type: "file",
    url: "/files/photo1.jpg",
    parent: "2",
    size: "2MB",
  },
  {
    id: "103",
    name: "photo2.jpg",
    type: "file",
    url: "/files/photo2.jpg",
    parent: "2",
    size: "1.8MB",
  },
  {
    id: "104",
    name: "project-spec.docx",
    type: "file",
    url: "/files/project-spec.docx",
    parent: "3",
    size: "500KB",
  },
  {
    id: "105",
    name: "budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: "3",
    size: "750KB",
  },
  {
    id: "106",
    name: "travel-itinerary.pdf",
    type: "file",
    url: "/files/travel-itinerary.pdf",
    parent: "1",
    size: "350KB",
  },
];
