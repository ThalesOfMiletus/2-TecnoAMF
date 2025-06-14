// components/patient/CreatePatientForm.tsx
'use client';

import React, { useState } from 'react';
import InputField from '../formField/page';

const CreatePatientForm = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: 'Fernanda Soares',
    dataNascimento: '21/12/2001',
    email: 'nandasoares2657@gmail.com',
    cpf: '043.082.250-27',
    telefone: '(55) 99937-4698',
    endereco: 'Recanto Maestro',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para enviar os dados para a sua API
    console.log('Dados do formulário:', formData);
    alert('Paciente criado com sucesso! (Verifique o console)');
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Informações do paciente
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              label="Nome completo"
              id="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
            />
            <InputField
              label="Data de nascimento"
              id="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />
            <InputField
              label="E-mail"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="CPF"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
            <InputField
              label="Telefone"
              id="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            <InputField
              label="Endereço"
              id="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 py-2 px-6 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Criar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatientForm;