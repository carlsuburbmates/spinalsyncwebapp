import React from 'react';

interface Module {
  id: string;
  title: string;
  completed: boolean;
  score?: number;
}

interface ProgressTrackerProps {
  modules: Module[];
  onModuleComplete: (moduleId: string, score: number) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  modules, 
  onModuleComplete 
}) => {
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="progress-tracker p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Learning Progress</h3>
      
      <div className="progress-bar mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {completedModules} of {totalModules} modules completed ({progressPercentage}%)
        </p>
      </div>

      <div className="modules-list space-y-2">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center justify-between p-2 bg-white rounded border">
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="font-medium">{module.title}</span>
            </div>
            {module.completed && module.score !== undefined && (
              <span className="text-sm text-green-600 font-medium">
                Score: {module.score}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
