import React from "react";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
};

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  return (
    <div className="flex items-center rounded-xl bg-white p-6 shadow-sm">
      <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;