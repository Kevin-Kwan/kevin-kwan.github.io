import React from 'react';
import Image from 'next/image';

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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:bg-blue-200 transform transition-transform hover:scale-110">
        <div className="relative h-48">
          <Image
            layout="fill"
            objectFit="cover"
            className="absolute"
            src={imageSrc}
            alt="Project Image"
          />
        </div>
        <div className="p-2.5 md:p-2.5 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-900">{name}</h3>
          <p className="text-sm font-medium text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
