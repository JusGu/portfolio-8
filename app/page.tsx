import { BlogPosts } from 'app/components/posts';
import DitherWrapper from './components/ditherWrapper';

export default function Page() {
  return (
    <section>
      <DitherWrapper />
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        Justin Gu
      </h1>

      <p className='mb-4'>
        Founding engineer at a stealth startup. Also taking courses on the side
        to finish up my degree at the University of Waterloo.
      </p>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
