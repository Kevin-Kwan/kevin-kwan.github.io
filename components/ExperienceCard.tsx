import React from 'react';

interface ExperienceCardProps {
  companyName: string;
  dateRange: string;
  jobTitle: string;
  logoUrl: string;
  jobDescription: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyName,
  dateRange,
  jobTitle,
  logoUrl,
  jobDescription,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-4xl mx-auto">
    <div className="flex items-center">
      <img
        src={logoUrl}
        alt={companyName}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="text-xl font-bold text-black">{companyName}</h3>
        <p className="text-sm text-gray-800">{dateRange}</p>
      </div>
    </div>
    <h4 className="text-lg font-bold mt-2 text-black">{jobTitle}</h4>
    <p className="text-sm text-gray-700 mt-2">{jobDescription}</p>
  </div>
);

export default ExperienceCard;
