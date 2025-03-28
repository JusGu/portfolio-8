import { BlogPosts } from 'app/components/posts';
import DitherWrapper from './components/ditherWrapper';
import { gelasio } from './fonts';

export default function Page() {
  return (
    <section>
      <div className='relative mb-8'>
        <DitherWrapper />
        <div
          className={`absolute top-8 pl-2 text-white mix-blend-difference ${gelasio.className}`}
        >
          <h1
            className={`text-2xl tracking-tighter mb-4 font-semibold ${gelasio.className}`}
          >
            Justin Gu
          </h1>
          <p className={`max-w-[500px] ${gelasio.className}`}>
            I'm currently working full-time as a Founding engineer at a Stealth
            Startup in San Mateo. I'm also taking courses on the side to finish
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
