import type { FC, ReactNode } from "react";

interface VariableCategoryProps {
  title: string;
  children: ReactNode;
}

export const VariableCategory: FC<VariableCategoryProps> = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-3">{title}</h3>
      {children}
    </div>
  );
};
