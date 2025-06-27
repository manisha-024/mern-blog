import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className="group flex justify-center [perspective:1000px] items-center">
      <div className="justify-center items-center relative h-[350px] w-full sm:w-[430px] lg:w-[360px] rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
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
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-5 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
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
  );
}