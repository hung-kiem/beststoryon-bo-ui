import { create } from "zustand";

const store = create<{ open: boolean; collapsed: boolean }>(() => ({
  open: false,
  collapsed: false,
}));

export default function useSidebar() {
  const state = store();

  return {
    sidebarOpen: state.open,
    setSidebarOpen: (state: boolean) => {
      store.setState({ open: state });
    },
    isSidebarCollapsed: state.collapsed,
    setIsSidebarCollapsed: (state: boolean) =>
      store.setState({ collapsed: state }),
  };
}
