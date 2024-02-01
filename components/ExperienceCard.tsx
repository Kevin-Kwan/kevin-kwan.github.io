import React from 'react';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

interface Link {
  url: string;
  displayText: string;
}

interface ExperienceCardProps {
  companyName: string;
  dateRange: string;
  jobTitle: string;
  logoUrl: string;
  jobDescription: React.ReactNode;
  links: Link[];
  subCompanyDescription: string;
  location?: string;
}

function ExperienceCard({
  companyName,
  dateRange,
  jobTitle,
  logoUrl,
  jobDescription,
  links = [],
  subCompanyDescription,
  location = 'Atlanta, GA',
}: ExperienceCardProps) {
  return (
    <Fade triggerOnce>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Image
            src={logoUrl}
            alt={companyName}
            className="w-20 h-20 rounded-full mr-4 object-contain"
            width={1000}
            height={1000}
          />
          <div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
              {companyName}
              {subCompanyDescription && (
                <>
                  {' '}
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
                    |
                  </span>{' '}
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                    {subCompanyDescription}
                  </span>
                </>
              )}
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
              {location}
            </p>{' '}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800">
              {dateRange}
            </p>
            {links.map((link, index) => (
              <React.Fragment key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs sm:text-sm md:text-base lg:text-lg text-blue-500 underline ${
                    index !== 0 ? 'ml-3' : ''
                  }`}
                >
                  {link.displayText}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
          {jobTitle}
        </h4>
        <div className="text-xs sm:text-sm md:text-base text-gray-700">
          {jobDescription}
        </div>
      </div>
    </Fade>
  );
}

export default ExperienceCard;
