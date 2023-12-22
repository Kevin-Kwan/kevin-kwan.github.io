import React from 'react';
import Link from 'next/link';
import { FaGithub, FaGlobe } from 'react-icons/fa';

interface ProjectCardProps {
  name: string;
  description: string;
  githubLink: string;
  demoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  githubLink,
  demoLink,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-2 md:p-4">
      <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold p-4 text-zinc-200">{name}</h2>
          <hr />
          <div className="p-4 text-zinc-200 text-sm">{description}</div>
        </div>
        <div className="p-4 flex justify-between">
          <Link href={githubLink} rel="noopener noreferrer" target="_blank">
            <div className="bg-slate-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded inline-flex items-center">
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </div>
          </Link>
          {demoLink && (
            <Link href={demoLink} rel="noopener noreferrer" target="_blank">
              <div className="bg-slate-400 hover:bg-green-700 text-black font-bold py-2 px-4 rounded inline-flex items-center">
                <FaGlobe className="mr-2" />
                <span>Demo</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
