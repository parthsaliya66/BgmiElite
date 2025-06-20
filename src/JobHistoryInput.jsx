import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Plus, Trash2, Target, Briefcase, Percent, Sparkles, TrendingUp, Brain, AlertCircle, FileText } from 'lucide-react';

function JobHistoryInput() {
  const { state } = useLocation();
  const { jobDescription, resumeFile, skills } = state || {};
  const [jobs, setJobs] = useState([{ company: '', role: '', startDate: '', endDate: '' }]);
  const [matchResult, setMatchResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Static skills database for matching
  const skillsDatabase = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'HTML', 'CSS',
    'MongoDB', 'SQL', 'Git', 'Docker', 'AWS', 'REST API', 'GraphQL', 'Redux',
    'Express.js', 'Vue.js', 'Angular', 'PHP', 'C++', 'C#', '.NET', 'Spring Boot',
    'Machine Learning', 'Data Analysis', 'Agile', 'Scrum', 'DevOps', 'CI/CD',
    'Kubernetes', 'Microservices', 'Firebase', 'PostgreSQL', 'MySQL', 'NoSQL'
  ];

  const extractSkillsFromText = (text) => {
    const foundSkills = [];
    const textLower = text.toLowerCase();
    skillsDatabase.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    return foundSkills;
  };

  const addJob = () => {
    setJobs([...jobs, { company: '', role: '', startDate: '', endDate: '' }]);
  };

  const removeJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  const handleJobChange = (index, field, value) => {
    const newJobs = [...jobs];
    newJobs[index][field] = value;
    setJobs(newJobs);
  };

  const validateJobs = () => {
    return jobs.every(job => 
      job.company.trim() && 
      job.role.trim() && 
      job.startDate.trim() && 
      (job.endDate.trim() === 'Present' || job.endDate.trim())
    );
  };

  const calculateMatch = () => {
    if (!jobDescription || !skills || !validateJobs()) {
      alert('Please provide job description, skills, and complete all job history fields.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const jobSkills = extractSkillsFromText(jobDescription);
      const resumeSkills = skills.map(skill => skill.name).filter(name => skillsDatabase.includes(name));
      const matchingSkills = jobSkills.filter(skill =>
        resumeSkills.some(resumeSkill => resumeSkill.toLowerCase() === skill.toLowerCase())
      );
      const missingSkills = jobSkills.filter(skill =>
        !resumeSkills.some(resumeSkill => resumeSkill.toLowerCase() === skill.toLowerCase())
      );
      const matchPercentage = jobSkills.length > 0
        ? Math.round((matchingSkills.length / jobSkills.length) * 100)
        : 0;

      setMatchResult({
        percentage: matchPercentage,
        jobSkills,
        resumeSkills,
        matchingSkills,
        missingSkills
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getPercentageBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-gradient-to-br from-emerald-50 to-green-100';
    if (percentage >= 60) return 'bg-gradient-to-br from-amber-50 to-yellow-100';
    return 'bg-gradient-to-br from-rose-50 to-red-100';
  };

  const getMatchIcon = (percentage) => {
    if (percentage >= 80) return <Sparkles className="h-8 w-8 text-emerald-600" />;
    if (percentage >= 60) return <TrendingUp className="h-8 w-8 text-amber-600" />;
    return <Brain className="h-8 w-8 text-rose-600" />;
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
              Enter Your Job History
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Add your previous and current jobs to complete your profile for match analysis.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="h-6 w-6 text-purple-600 mr-4" />
              Your Job History
            </h2>
            {jobs.map((job, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) => handleJobChange(index, 'company', e.target.value)}
                  placeholder="Company Name (e.g., TechTrend Solutions)"
                  className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                />
                <input
                  type="text"
                  value={job.role}
                  onChange={(e) => handleJobChange(index, 'role', e.target.value)}
                  placeholder="Position/Role (e.g., Frontend Developer)"
                  className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                />
                <input
                  type="date"
                  value={job.startDate}
                  onChange={(e) => handleJobChange(index, 'startDate', e.target.value)}
                  placeholder="Start Date"
                  className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={job.endDate}
                    onChange={(e) => handleJobChange(index, 'endDate', e.target.value)}
                    placeholder="End Date (e.g., 2023-12-31 or Present)"
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50"
                  />
                  {jobs.length > 1 && (
                    <button
                      onClick={() => removeJob(index)}
                      className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addJob}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-4"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Job
            </button>
          </div>

          <div className="text-center mb-12">
            <button
              onClick={calculateMatch}
              disabled={isAnalyzing || !jobDescription || !skills || !validateJobs()}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 disabled:scale-100 disabled:cursor-not-allowed text-lg"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Analyzing Match...</span>
                  </>
                ) : (
                  <>
                    <Percent className="h-6 w-6 mr-3" />
                    <span>✨ Calculate Match Percentage</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {matchResult && (
            <div className="animate-fade-in">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                <div className={`p-12 text-center ${getPercentageBgColor(matchResult.percentage)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-center mb-6">
                      {getMatchIcon(matchResult.percentage)}
                      <h3 className="text-4xl font-bold text-gray-900 ml-4">Match Result</h3>
                    </div>
                    <div className={`text-8xl font-black mb-4 ${getPercentageColor(matchResult.percentage)} drop-shadow-lg`}>
                      {matchResult.percentage}%
                    </div>
                    <p className="text-2xl font-semibold text-gray-700">
                      {matchResult.percentage >= 80 ? '🎉 Excellent Match!' :
                        matchResult.percentage >= 60 ? '👍 Good Match' : '💪 Room for Growth'}
                    </p>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-gray-50 to-white">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-emerald-200 rounded-xl mr-3">
                          <CheckCircle className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h4 className="text-xl font-bold text-emerald-900">
                          Matching Skills ({matchResult.matchingSkills.length})
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.matchingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-50 to-red-100 rounded-2xl p-8 border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-rose-200 rounded-xl mr-3">
                          <AlertCircle className="h-6 w-6 text-rose-700" />
                        </div>
                        <h4 className="text-xl font-bold text-rose-900">
                          Missing Skills ({matchResult.missingSkills.length})
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.missingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-rose-200 text-rose-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            ⚠ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-blue-200 rounded-xl mr-3">
                          <FileText className="h-6 w-6 text-blue-700" />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900">
                          Your Skills ({matchResult.resumeSkills.length})
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.resumeSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            💼 {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
                    <h4 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                      <span className="text-3xl mr-3">💡</span>
                      Personalized Recommendations
                    </h4>
                    <div className="space-y-4">
                      {matchResult.missingSkills.length > 0 ? (
                        matchResult.missingSkills.slice(0, 3).map((skill, index) => (
                          <div key={index} className="flex items-start p-4 bg-white/70 rounded-xl border border-amber-200">
                            <span className="text-amber-600 mr-4 text-xl">🎯</span>
                            <div>
                              <p className="text-amber-900 font-semibold text-lg">
                                Focus on learning <span className="bg-amber-200 px-2 py-1 rounded-md">{skill}</span>
                              </p>
                              <p className="text-amber-700 text-sm mt-1">
                                This skill will significantly boost your match percentage
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-start p-4 bg-emerald-100/70 rounded-xl border border-emerald-200">
                          <span className="text-emerald-600 mr-4 text-xl">🎉</span>
                          <div>
                            <p className="text-emerald-900 font-semibold text-lg">
                              Outstanding! You have all the required skills for this position.
                            </p>
                            <p className="text-emerald-700 text-sm mt-1">
                              You're ready to apply with confidence!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobHistoryInput;