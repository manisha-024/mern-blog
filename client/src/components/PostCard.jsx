import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <>
      {/* Mobile/Small Screen Layout */}
      <div className="block sm:hidden">
        <div className='group relative w-full border border-pink-800 hover:border-2 h-[360px] overflow-hidden rounded-lg sm:w-[430px] transition-all mx-auto'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
      </div>

      {/* Desktop/Large Screen Layout with 3D Flip */}
      <div className="hidden sm:block justify-center items-center">
        <Link to={`/post/${post.slug}`} className="group flex justify-center [perspective:1000px] items-center">
          <div className="justify-center items-center relative h-[350px] w-full sm:w-[430px] lg:w-[360px] rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] pointer-events-none">
            {/* Front Face */}
            <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] pointer-events-auto">
              <img
                className="object-cover cursor-pointer h-full w-full rounded-xl"
                src={post.image}
                alt={post.title}
                width="430"
                height="350"
              />
            </div>
            <div className="absolute rounded-xl inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 translate-y-[78%] px-8 text-center">
              <p className="text-xl font-bold text-white line-clamp-2">{post.title}</p>
              <span className="italic text-sm text-white/80">{post.category}</span>
            </div>
            
            {/* Back Face */}
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-5 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] pointer-events-auto">
              <div className="flex min-h-full flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4 line-clamp-2">{post.title}</h2>
                <span className="italic text-sm text-white/80 mb-4">{post.category}</span>
                <p className="text-sm text-pretty text-center mb-4 line-clamp-4">
                  {post.excerpt || "Discover more about this fascinating topic. Click to read the full article."}
                </p>
                <div className="inline-flex">
                  <button className="border-2 border-rose-800 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center transition-colors duration-300 hover:bg-rose-800 hover:text-white">
                    <span>Read article</span>
                    <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}