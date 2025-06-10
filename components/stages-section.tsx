import React from 'react';

interface Stage {
  title: string;
  description: string;
  symptoms: string[];
}

const stages: Stage[] = [
  {
    title: "Early Stage",
    description: "Mild changes in memory and thinking abilities",
    symptoms: [
      "Difficulty remembering recent events",
      "Challenges in planning and organization",
      "Forgetting names of new acquaintances",
      "Misplacing items more frequently"
    ]
  },
  {
    title: "Middle Stage",
    description: "More noticeable changes in thinking and behavior",
    symptoms: [
      "Increased confusion and disorientation",
      "Changes in sleep patterns",
      "Difficulty with daily tasks",
      "Personality and behavioral changes"
    ]
  },
  {
    title: "Late Stage",
    description: "Significant physical and mental decline",
    symptoms: [
      "Difficulty communicating",
      "Need for full-time care",
      "Loss of physical abilities",
      "Vulnerability to infections"
    ]
  }
];

export function StagesSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Understanding Alzheimer's Stages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage, index) => (
            <div
              key={stage.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {stage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {stage.description}
              </p>
              <ul className="space-y-2">
                {stage.symptoms.map((symptom, symptomIndex) => (
                  <li
                    key={symptomIndex}
                    className="flex items-start text-gray-700 dark:text-gray-200"
                  >
                    <span className="mr-2">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 