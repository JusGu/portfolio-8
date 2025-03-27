import { BlogPosts } from 'app/components/posts';
import DitherWrapper from './components/ditherWrapper';

export default function Page() {
  return (
    <section>
      <div className='relative mb-8'>
        <DitherWrapper />
        <div className='absolute top-8 pl-2 text-white'>
          <h1 className='text-2xl font-semibold tracking-tighter mb-4'>
            Justin Gu
          </h1>
          <p className='max-w-[500px]'>
            Founding engineer at a stealth startup. Taking courses on the side
            to finish up my CS degree at UWaterloo.
          </p>
        </div>
      </div>

      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
