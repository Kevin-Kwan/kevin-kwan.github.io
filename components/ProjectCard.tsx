import React from 'react';
import Link from 'next/link';
import { FaGithub, FaGlobe } from 'react-icons/fa';

interface ProjectCardProps {
  name: string;
  description: string;
  githubLink: string;
  demoLink?: string;
  demoText?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  githubLink,
  demoLink,
  demoText = 'Demo',
}) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 md:p-4">
      <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between">
        <div>
          <h2 className="text-sm md:text-lg font-bold p-3 text-zinc-200">
            {name}
          </h2>
          <hr />
          <div className="p-3 text-zinc-200 text-xs md:text-sm">
            {description}
          </div>
        </div>
        <div className="pb-3 pl-3 pr-3 flex justify-between">
          <Link href={githubLink} rel="noopener noreferrer" target="_blank">
            <div className="bg-slate-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded inline-flex items-center text-xs md:text-base">
              <FaGithub className="mr-2 text-sm md:text-base" />
              <span>GitHub</span>
            </div>
          </Link>
          {demoLink && (
            <Link href={demoLink} rel="noopener noreferrer" target="_blank">
              <div className="bg-slate-400 hover:bg-green-700 text-black font-bold py-2 px-4 rounded inline-flex items-center text-xs md:text-base">
                <FaGlobe className="mr-2 text-sm md:text-base" />
                <span>{demoText}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
