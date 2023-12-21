import React from 'react';
import Image from 'next/image';

interface Link {
  url: string;
  displayText: string;
}

interface ExperienceCardProps {
  companyName: string;
  dateRange: string;
  jobTitle: string;
  logoUrl: string;
  jobDescription: string;
  links: Link[];
  subCompanyDescription: string;
  location?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyName,
  dateRange,
  jobTitle,
  logoUrl,
  jobDescription,
  links = [],
  subCompanyDescription,
  location = 'Atlanta, GA',
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-5xl mx-auto">
    <div className="flex items-center">
      <Image
        src={logoUrl}
        alt={companyName}
        className="w-16 h-16 rounded-full mr-4"
        width={1000}
        height={1000}
      />
      <div>
        <h3 className="text-xl font-bold text-black">
          {companyName}
          {subCompanyDescription && (
            <>
              {' '}
              <span className="text-gray-300">|</span>{' '}
              <span className="text-gray-500">{subCompanyDescription}</span>
            </>
          )}
        </h3>
        <p className="text-sm text-gray-700">{location}</p>{' '}
        <p className="text-sm text-gray-800">{dateRange}</p>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <a href={link.url} className="text-sm text-blue-500 underline">
              {link.displayText}
            </a>
            {index < links.length - 1 && <>&nbsp;&nbsp;&nbsp;</>}
          </React.Fragment>
        ))}
      </div>
    </div>
    <h4 className="text-lg font-bold mt-2 text-black">{jobTitle}</h4>
    <p className="text-sm text-gray-700 mt-2">{jobDescription}</p>
  </div>
);

export default ExperienceCard;
