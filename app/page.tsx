import { BlogPosts } from 'app/components/posts';
import DitherWrapper from './components/ditherWrapper';
import { gelasio } from './fonts';

export default function Page() {
  return (
    <section>
      <div className='relative mb-8'>
        <DitherWrapper />
        <div
          className={`absolute top-8 pl-2 text-white ${gelasio.className} z-10`}
        >
          <h1
            className={`text-2xl tracking-tighter mb-4 font-semibold ${gelasio.className}`}
          >
            Justin Gu
          </h1>
          <p className={`max-w-[500px] ${gelasio.className}`}>
            I'm currently on the founding team at Maxima. We
            {' '}
            <a className={`text-white`} href="https://www.reuters.com/business/ai-accounting-startup-maxima-raises-41-million-kleiner-perkins-backed-round-2025-11-18/" target="_blank">recently raised 41m</a>
            {' '}to support enterprise accounting teams at companies like Rippling, Fandom and Scale AI. I'm also taking courses on the side to finish
            my CS degree at UWaterloo.
          </p>
        </div>
      </div>

      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
