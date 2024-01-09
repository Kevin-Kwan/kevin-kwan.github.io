import React from 'react';
import Image from 'next/image';

interface Link {
  url: string;
  displayText: string;
}

interface EducationCardProps {
  schoolName: string;
  dateRange: string;
  credential: string;
  logoUrl: string;
  eduDescription?: React.ReactNode;
  gpa?: string;
  links: Link[];
  subschoolDescription: string;
  location?: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  schoolName,
  dateRange,
  credential,
  logoUrl,
  eduDescription,
  gpa,
  links = [],
  subschoolDescription,
  location = 'Atlanta, GA',
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-6xl mx-auto">
    <div className="flex items-center">
      <Image
        src={logoUrl}
        alt={schoolName}
        className="w-20 h-20 mr-4 object-contain"
        width={1000}
        height={1000}
      />
      <div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
          {schoolName}
          {subschoolDescription && (
            <>
              {' '}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
                |
              </span>{' '}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                {subschoolDescription}
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
      {credential}
    </h4>
    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800">
      {eduDescription}
    </div>
    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800">
      <b> GPA: </b> {gpa}
    </div>
  </div>
);

export default EducationCard;
