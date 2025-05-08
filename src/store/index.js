import { createPinia } from "pinia";

export * from "./auth/useAuthStore";
export * from "./notes/useNotesStore";

export const pinia = createPinia();