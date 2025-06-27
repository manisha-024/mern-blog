import { Link, useNavigate } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Button } from 'flowbite-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  // Typewriter animation state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);
  
  const texts = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer'
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const tick = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timeoutId = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentIndex, typeSpeed, texts]);

  return (
    <div>
      <div className='flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-3 p-4 gap-10'>
        <div className='w-full lg:w-1/2 flex flex-col gap-6'>
          <h1 className='text-3xl font-bold lg:text-6xl pt-10'>Welcome to my Blog</h1>
          
          {/* Added the new content with styling */}
          <div className='flex flex-col gap-4 mt-6'>
            <h2 className='text-2xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200'>
              Hi, I'm Manisha
            </h2>
            <h3 className='text-xl lg:text-2xl font-medium text-rose-800 min-h-[2rem] lg:min-h-[2.5rem]'>
              I'm a <span className="border-r-2 border-rose-800 animate-pulse">{currentText}</span>
            </h3>
            <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed'>
              This is my little corner of the internet where I share everything I'm learning as I dive into the world of web development, programming languages, machine learning, and all the magic in between.
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/search')}
            className="
              group
              !bg-transparent
              !text-rose-800
              !p-5
              cursor-pointer 
              relative  
              text-xl 
              font-bold 
              border-0 
              flex 
              items-center 
              justify-center
              h-auto  
              w-[170px]  
              overflow-hidden   
              transition-all
              duration-100
              mt-6
            "
          >
            {/* Left border animation */}
            <span
              className="
                group-hover:w-full
                absolute 
                left-0 
                h-full 
                w-5 
                border-y
                border-l
                border-rose-800
                transition-all
                duration-500
              "
            ></span>

            {/* Text before hover */}
            <p
              className="
                group-hover:opacity-0 
                group-hover:translate-x-[-100%] 
                absolute 
                translate-x-0 
                transition-all
                duration-200
              "
            >
              More Projects
            </p>

            {/* Text after hover */}
            <span
              className="
                group-hover:translate-x-0  
                group-hover:opacity-100 
                absolute  
                translate-x-full 
                opacity-0  
                transition-all 
                duration-200
              "
            >
              View All
            </span>

            {/* Right border animation */}
            <span
              className="
                group-hover:w-full 
                absolute 
                right-0 
                h-full 
                w-5  
                border-y 
                border-r  
                border-rose-800 
                transition-all 
                duration-500
              "
            ></span>
          </Button>
        </div>

        <div className='w-full lg:w-1/2 flex justify-center'>
          <img
            src='/your-photo.jpg' 
            alt='Manisha'
            className='rounded-lg shadow-lg max-w-full h-auto'
          />
        </div>
      </div>

      <div className='mr-8 ml-8 p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-3 justify-center items-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-rose-800 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
          
        )}
      </div>
    </div>
  );
}