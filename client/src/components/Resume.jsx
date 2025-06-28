import { Link } from 'react-router-dom';

export default function Resume() {
  return (
    <div className="group relative w-full border border-pink-800 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all mx-auto">
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <img
          src="/profile.jpeg"
          alt="Manisha"
          className="h-full w-full object-cover p-2 transition-all duration-300"
        />
      </a>

      {/* Name and Role */}
      <div className="absolute bottom-16 left-0 right-0 px-4 text-center">
        <p className="text-lg font-semibold text-white drop-shadow">Manisha Kishtapuram</p>
        <span className="italic text-sm text-white/80 drop-shadow">Web Developer</span>
      </div>

      {/* View Resume button */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 bg-white/90 backdrop-blur-md"
      >
        View Resume
      </a>
    </div>
  );
}
