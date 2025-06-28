import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Globe, Brain, Heart, PenTool, Play, Pause } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "Blogging Platform",
    icon: <PenTool className="w-8 h-8" />,
    subtitle: "Full-Stack Blog Management System",
    description: "A comprehensive blogging platform with admin dashboard and user interaction features.",
    features: [
      "Admin dashboard with analytics (users, likes, posts tracking)",
      "Category-based blog creation (Web Development, DevOps, etc.)",
      "User authentication via email and Google OAuth",
      "Advanced search with filters and Firebase media storage"
    ],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "Google OAuth", "JWT", "Firebase", "Tailwind", "Redux"],
    gradient: "from-purple-400 via-violet-500 to-indigo-600",
    bgGradient: "from-purple-50 via-violet-50 to-indigo-100",
    accentColor: "purple",
    hasLiveDemo: true,
    githubUrl: "https://github.com/manisha-024/mern-blog",
    liveUrl: ""
  },
  {
    id: 2,
    title: "LifeOnTheEdge",
    icon: <Globe className="w-8 h-8" />,
    subtitle: "Environmental Conservation Web App",
    description: "A comprehensive web application focused on environmental awareness and species conservation.",
    features: [
      "Interactive quizzes on environmental issues and endangered species",
      "Global species database categorized by continent and country",
      "AI-powered BioBot for conservation learning and species information",
      "Educational content about wildlife preservation"
    ],
    techStack: ["Python", "HTML", "CSS", "JavaScript", "Streamlit", "Google Gemini", "Google API"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    bgGradient: "from-emerald-50 via-teal-50 to-cyan-100",
    accentColor: "emerald",
    hasLiveDemo: true,
    githubUrl: "https://github.com/manisha-024/lifeontheedge",
    liveUrl: "https://manisha-024.github.io/lifeontheedge/"
  },
  {
    id: 3,
    title: "CardioScope",
    icon: <Heart className="w-8 h-8" />,
    subtitle: "Heart Disease Risk Prediction System",
    description: "An intelligent ML-powered application for predicting Coronary Heart Disease risk assessment.",
    features: [
      "ML-based CHD risk prediction using lifestyle and clinical data",
      "Risk classification into Low, Moderate, and High categories",
      "Educational content about heart health and prevention",
      "User-friendly interface with actionable health insights"
    ],
    techStack: ["Python", "Scikit-learn", "Streamlit", "Pandas", "SMOTE", "Logistic Regression", "Random Forest"],
    gradient: "from-red-400 via-pink-500 to-rose-600",
    bgGradient: "from-red-50 via-pink-50 to-rose-100",
    accentColor: "red",
    hasLiveDemo: false,
    githubUrl: "",
    liveUrl: ""
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentProject = projectsData[currentIndex];

  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-6 overflow-hidden bg-pink-50 lg:bg-pink-50 bg-gradient-to-r from-pink-50 to-rose-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="dots"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="rotate(45)"
            >
              <circle cx="10" cy="10" r="2" fill="#ec4899" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="1440" height="800" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold dark:text-rose-300 text-pink-800 mb-4">My Projects</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my journey through code, creativity, and problem-solving. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-pink-600" />
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-pink-600" />
          </button>

          {/* Project Cards Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projectsData.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 px-8 py-12">
                  <div className={`bg-gradient-to-br ${project.bgGradient} rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto`}>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-0">
                      {/* Left Side - Project Info */}
                      <div className="p-8 lg:p-12 space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl text-white shadow-lg`}>
                            {project.icon}
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-800">{project.title}</h2>
                            <p className="text-gray-600 font-medium">{project.subtitle}</p>
                          </div>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-gray-800">Key Features:</h3>
                          <ul className="space-y-2">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className={`w-2 h-2 bg-${project.accentColor}-500 rounded-full mt-2 flex-shrink-0`}></span>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex space-x-4 pt-4">
                          {project.hasLiveDemo && (
                            <button 
                              onClick={() => handleLinkClick(project.liveUrl)}
                              className={`flex items-center space-x-2 bg-gradient-to-r ${project.gradient} text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </button>
                          )}
                          {project.githubUrl && (
                            <button 
                              onClick={() => handleLinkClick(project.githubUrl)}
                              className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                              <Github className="w-4 h-4" />
                              <span>Source Code</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Tech Stack */}
                      <div className="p-8 lg:p-12 bg-white bg-opacity-50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {project.techStack.map((tech, idx) => (
                            <div
                              key={idx}
                              className="bg-white bg-opacity-80 rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                              <span className="text-sm font-medium text-gray-700">{tech}</span>
                            </div>
                          ))}
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-8">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Project Progress</span>
                            <span className="text-sm font-bold text-gray-800">Completed</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`bg-gradient-to-r ${project.gradient} h-2 rounded-full transition-all duration-1000 w-full`}></div>
                          </div>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">✨</div>
                            <div className="text-xs text-gray-600">Features</div>
                            <div className="text-sm font-semibold">{project.features.length}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">⚡</div>
                            <div className="text-xs text-gray-600">Technologies</div>
                            <div className="text-sm font-semibold">{project.techStack.length}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">🚀</div>
                            <div className="text-xs text-gray-600">Status</div>
                            <div className="text-sm font-semibold">Live</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-pink-600 scale-125'
                    : 'bg-pink-300 hover:bg-pink-400'
                }`}
              />
            ))}
          </div>

          {/* Autoplay Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 mx-auto ${
                isAutoPlaying
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-white text-pink-600 hover:bg-pink-50'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}