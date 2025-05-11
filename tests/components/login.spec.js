import { render } from "@testing-library/vue";
import { describe, vi } from "vitest";
import Login from "../../src/views/Login.vue"
describe("Login component", () => {

    vi.mock("../../src/store/auth/useAuthStore", () => ({
        useAuthStore: () => ({
            login: vi.fn(),
            register: vi.fn(),
            authState: {
                auth: "not-authenticated",
                user: {},
                token: "",
                errorMessage: "",
            },
        })
    }));

   it("should render the login component", () => {
      const { getByText } = render(Login);
      getByText("Login");
   });
});