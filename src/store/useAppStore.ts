import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  name: string
  email: string
  role: string
  password?: string
}

interface AppState {
  isSidebarOpen: boolean
  isAuthenticated: boolean
  user: User | null
  registeredUsers: User[]
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
  registerUser: (user: User) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      isAuthenticated: false,
      user: null,
      registeredUsers: [],
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
      registerUser: (user) => set((state) => ({ registeredUsers: [...state.registeredUsers, user] })),
    }),
    {
      name: "app-storage",
    }
  )
)
