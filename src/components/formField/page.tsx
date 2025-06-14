// components/forms/InputField.tsx
import React from 'react';

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const InputField = ({ label, id, type = 'text', value, onChange, placeholder }: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;