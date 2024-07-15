import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  width?: string;
  height?: string;
}

const Card = ({ children, width = "max-w-sm", height = "auto" }: CardProps) => {
  return (
    <div className="flex justify-center items-center mt-16">
      <div
        className={`bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-black dark:border-gray-700 ${width} ${height}`}
      >
        {children}
      </div>
    </div>
  );
}

export { Card };
