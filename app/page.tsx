import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        My Portfolio
      </h1>

      <p className='mb-4'>
        {`I’m currently a founding engineer at a Kleiner Perkins funded stealth startup. I’m also currently taking courses on the side to finish up my computer science degree at the University of Waterloo.`}
      </p>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
