// components/forms/FileUpload.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
        <p className="text-lg font-semibold text-gray-700">Arraste e solte os arquivos aqui</p>
        <p className="text-sm text-gray-500">ou clique para selecionar</p>
        <p className="text-xs text-gray-400 mt-2">PNG, JPG ou PDF</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">Arquivos Selecionados:</h4>
          <ul className="mt-2 space-y-2">
            {files.map(file => (
              <li key={file.name} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <div className="flex items-center">
                  <File className="w-5 h-5 text-gray-600" />
                  <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="p-1 rounded-full hover:bg-red-100"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;