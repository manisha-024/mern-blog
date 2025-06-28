import { useState, useEffect } from 'react';
import Resume from '../components/Resume';
const featureData = {
  academics: {
    title: 'Academic Journey',
    content: {
      intro: "My academic path has been a steady climb filled with curiosity, consistency, and a passion for learning. Here's the snapshot:",
      points: [
        'B.Tech in Information Technology, GNITS – CGPA: 8.9 (2022–2026)',
        'Class XII – Toppers Junior College – 96%',
        'Class X – Kendriya Vidyalaya Bolarum – 95%',
      ],
    },
  },
  skills: {
    title: 'Skills & Technologies',
    content: {
      intro: "I love blending logic with creativity, and these are the tools I use to make that happen:",
      points: [
        'Languages: Java, JavaScript, Python, C, Basics of C++',
        'Technologies: HTML, CSS, React.js, Tailwind CSS',
        'Tools: VS Code, Canva, Microsoft Office',
        'Coursework: DBMS, DSA, OOPs, OS',
      ],
    },
  },
  achievements: {
    title: 'Achievements',
    content: {
      intro: "I believe in celebrating every win — big or small. Here are some milestones that I’m proud of:",
      points: [
        'Top 0.2% in Walmart CodeHers’25',
        '200+ problems solved on Leetcode',
        'Global Rank: 7781 / 42,693 in Smart Interviews',
        'Finalist in Smart India Hackathon 2024',
      ],
    },
  },
};


export default function About() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedFeature) {
      const el = document.getElementById('feature-detail');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedFeature]);

  const handleBackClick = () => {
    setSelectedFeature(null);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-r from-rose-50 via-pink-100 to-pink-200 py-16 px-6 overflow-hidden">
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

      <div className="px-8 py-0 max-w-7xl mx-auto relative z-20 flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
        <div className="w-full bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg p-8 order-2 lg:order-1">
          <h2 className="text-4xl font-extrabold text-pink-800 mb-4 text-center lg:text-left">About Me</h2>
          <p id="main-content" className="text-black mb-6 text-lg text-center lg:text-left">
            I'm Manisha Kishtapuram, a 4th-year B.Tech student majoring in Information Technology, driven by a deep passion
            for acquiring knowledge and gaining practical experience. I'm actively looking for opportunities that will help me grow both professionally and personally.
          </p>

          <div className="space-y-6">
            {Object.entries(featureData).map(([key, value]) => (
              <div
                key={key}
                onClick={() => setSelectedFeature(key)}
                className="cursor-pointer flex items-start gap-4 p-4 bg-gradient-to-tr from-rose-100 via-pink-200 to-pink-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-3 bg-white rounded-full shadow-lg">
                  <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-pink-700">{value.title}</h3>
                  <p className="text-black text-sm">Click to learn more.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-fullr relative order-1 lg:order-2">
          {!selectedFeature || isMobile ? (
            <>
              <Resume />
            </>
          ) : (
            <div className="bg-rose-50 bg-opacity-90 rounded-xl shadow-xl p-8 text-pink-900 space-y-4 h-full">
              <h2 className="text-3xl font-bold text-pink-800">{featureData[selectedFeature].title}</h2>
              <p className="text-lg whitespace-pre-wrap text-black">
                {featureData[selectedFeature].content.intro}
              </p>
              <ul className="list-disc list-inside text-black space-y-1">
                {featureData[selectedFeature].content.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <div className="pt-4">
                <a
                  href="#resume"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackClick();
                  }}
                  className="text-pink-600 hover:text-pink-800 underline cursor-pointer transition-colors duration-200"
                >
                  View Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedFeature && isMobile && (
        <div
          id="feature-detail"
          className="mt-12 max-w-4xl mx-auto bg-rose-50 bg-opacity-90 rounded-xl shadow-xl p-8 text-pink-900 space-y-4"
        >
          <h2 className="text-3xl font-bold text-pink-800">{featureData[selectedFeature].title}</h2>
          <p className="text-lg whitespace-pre-wrap text-black">
            {featureData[selectedFeature].content.intro}
          </p>
          <ul className="list-disc list-inside text-black space-y-1">
            {featureData[selectedFeature].content.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          <div className="pt-4">
            <button
              onClick={handleBackClick}
              className="text-pink-600 hover:text-pink-800 underline cursor-pointer transition-colors duration-200"
            >
              ← Go Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
