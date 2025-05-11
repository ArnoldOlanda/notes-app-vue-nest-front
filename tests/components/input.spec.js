import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Input from "../../src/components/Input.vue";

describe("Input component", () => {
    const propsInput = {
        label:"Usuario",
        modelValue:"prueba",
        placeholder:"",
        inputType:"text",
    };

    it("should render the input", () => {
        const { getByText } = render(Input,{
            props:{...propsInput}
        });

        //Verificar que se renderiza el label con el texto pasado en la prop label
        getByText('Usuario');
    });

    it("should showPassword dont exist if input type is not password", async () => {
        // Renderizar el componente con tipo que no sea password
        const { queryByTestId } = render(Input, {
          props: {...propsInput}
        });
        
        const showPasswordButton = queryByTestId('show-password');
        expect(showPasswordButton).toBeNull();
    });

    it("should toggle type input when clicking the show password button", async () => {
        // Renderizar el componente con tipo password
        const { getByTestId } = render(Input, {
          props: {
            ...propsInput,
            inputType: "password",
          }
        });
        
        const showPasswordButton = getByTestId('show-password');
        const input = getByTestId('input');

        await fireEvent.click(showPasswordButton);
        expect(input.type).toBe('text');

        await fireEvent.click(showPasswordButton);
        expect(input.type).toBe('password');
    });

    it('should show error message when input is invalid', async () => {
      const { getByTestId } = render(Input, {
        props: {
          ...propsInput,
          inputType: "password",
          validate: {
            $error: true,
            $errors: [
              {
                $message: "Password is required",
              },
            ],
          },
        }
      });
      
      screen.getByText('Password is required');
    })
});