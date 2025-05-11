import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCategoriesQuery } from '../../src/composables/useCategoriesQuery';
import { useQuery } from '@vue/apollo-composable';
import { computed, ref, watch } from 'vue';

// Mock de los módulos
vi.mock('@vue/apollo-composable', () => ({
  useQuery: vi.fn()
}));

vi.mock('vue', () => ({
  computed: vi.fn((fn) => ({ value: fn() })),
  ref: vi.fn((val) => ({ value: val })),
  watch: vi.fn()
}));

describe('useCategoriesQuery', () => {
  const userId = 'user123';
  const mockCategories = [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' }
  ];
  
  // Mock de los resultados de useQuery
  const mockResult = ref({ getCategories: mockCategories });
  const mockLoading = ref(false);
  const mockError = ref(null);
  
  beforeEach(() => {
    // Resetear los mocks antes de cada test
    vi.clearAllMocks();
    
    // Configurar el comportamiento del mock de useQuery
    useQuery.mockReturnValue({
      result: mockResult,
      loading: mockLoading,
      error: mockError
    });
    
    // Configurar el comportamiento del mock de computed
    computed.mockImplementation((fn) => {
      return {
        value: fn()
      };
    });
  });
  
  it('should call useQuery with correct parameters', () => {
    useCategoriesQuery(userId);
    
    // Verificar que useQuery fue llamado con los parámetros correctos
    expect(useQuery).toHaveBeenCalledTimes(1);
    expect(useQuery.mock.calls[0][1]).toBeInstanceOf(Function);
    
    // Verificar que la función de variables devuelve el userId correcto
    const variablesFn = useQuery.mock.calls[0][1];
    expect(variablesFn()).toEqual({ userId });
  });
  
  it('should return categories from the query result', () => {
    const { categories } = useCategoriesQuery(userId);
    
    // Verificar que categories es un computed que devuelve los datos correctos
    expect(categories.value).toEqual(mockCategories);
  });
  
  it('should handle loading state correctly', () => {
    // Simular estado de carga
    mockLoading.value = true;
    
    const { categoriesLoading } = useCategoriesQuery(userId);
    
    // Verificar que el estado de carga se expone correctamente
    expect(categoriesLoading.value).toBe(true);
  });
  
  it('should handle error state correctly', () => {
    // Simular un error
    const testError = new Error('Test error');
    mockError.value = testError;
    
    const { categoriesError } = useCategoriesQuery(userId);
    
    // Verificar que el error se expone correctamente
    expect(categoriesError.value).toBe(testError);
    
    // Verificar que watch fue llamado para observar errores
    expect(watch).toHaveBeenCalledTimes(1);
    expect(watch.mock.calls[0][0]).toBe(mockError);
  });
  
  it('should handle null or undefined query result', () => {
    // Simular un resultado nulo
    mockResult.value = null;
    
    const { categories } = useCategoriesQuery(userId);
    
    // Verificar que categories maneja correctamente un resultado nulo
    expect(categories.value).toBeUndefined();
  });
  
  it('should log error message when an error occurs', () => {
    // Espiar console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Simular un error
    const testError = new Error('Test error');
    mockError.value = testError;
    
    // Obtener la función de callback de watch
    useCategoriesQuery(userId);
    const watchCallback = watch.mock.calls[0][1];
    
    // Ejecutar manualmente el callback de watch con el error
    watchCallback(testError);
    
    // Verificar que se registró el error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching categories:', 'Test error');
    
    // Restaurar console.error
    consoleSpy.mockRestore();
  });
});
