import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className=' bg-teal-50 flex border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl text-gray-900'>
          View a collaborative project I built alongside my classmates for the Google Solution Challenge-2024!
        </h2>
        <p className='text-gray-500 my-2'>
LifeOnTheEdge is a donation-focused website dedicated to wildlife conservation. Explore endangered species information by country, engage with quizzes and an AI chatbot.       </p>
        <a
  href='https://manisha-024.github.io/lifeontheedge/'
  target='_blank'
  rel='noopener noreferrer'
>
  <Button
    className='inline-flex items-center gap-2 transition duration-300 ease-linear 
      bg-[#FAF3E0] text-[#1F2937] text-lg font-semibold font-["Poppins",sans-serif] leading-[1.12] 
      px-8 py-4 text-center capitalize select-none rounded-full shadow-[4px_6px_0px_0px_#064E3B] 
      whitespace-nowrap hover:bg-[#064E3B] hover:text-white hover:shadow-none'
  >
    LifeOnTheEdge
  </Button>
</a>

      </div>
      <div className='flex-1 p-7'>
        <img src='https://manisha-024.github.io/lifeontheedge/top.jpg' />
      </div>
    </div>
  );
}