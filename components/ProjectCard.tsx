import React from "react";

interface ProjectCardProps {
  name: string;
  date: string;
  imageSrc: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  date,
  imageSrc,
  onClick,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:bg-blue-200">
        <img
          className="w-full h-48 object-cover object-center object-contain object-center"
          src={imageSrc}
          alt="Project Image"
        />
        <div className="p-4 md:p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm font-medium text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
