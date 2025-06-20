import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Target, FileText, ArrowRight } from 'lucide-react';

function SkillsInput() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { jobDescription, resumeFile } = state || {};
  const [skills, setSkills] = useState([{ name: '', experience: '' }]);

  const addSkill = () => {
    setSkills([...skills, { name: '', experience: '' }]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const validateSkills = () => {
    return skills.every(skill => skill.name.trim() && skill.experience.trim());
  };

  const handleNext = () => {
    if (!jobDescription || !validateSkills()) {
      alert('Please provide job description and complete all skill fields.');
      return;
    }
    navigate('/job-history', { state: { jobDescription, resumeFile, skills } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Enter Your Skills
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Add your skills and experience to proceed with your job history.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 text-purple-600 mr-4" />
              Your Skills
            </h2>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  placeholder="Skill Name (e.g., JavaScript)"
                  className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                />
                <input
                  type="text"
                  value={skill.experience}
                  onChange={(e) => handleSkillChange(index, 'experience', e.target.value)}
                  placeholder="Experience (e.g., 1 year 6 months or 1.5 years)"
                  className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                />
                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSkill}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-4"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Skill
            </button>
          </div>

          <div className="text-center mb-12">
            <button
              onClick={handleNext}
              disabled={!jobDescription || !validateSkills()}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 disabled:scale-100 disabled:cursor-not-allowed text-lg"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <ArrowRight className="h-6 w-6 mr-3" />
                <span>Next</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsInput;