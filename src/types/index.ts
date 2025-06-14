// types/index.ts
export type Patient = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive'; // Exemplo, pode ser o que você precisar
};