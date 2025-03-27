export default function WebringWidget() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <a
        className='transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
        href='https://cs.uwatering.com/justin.run?nav=prev'
      >
        ←
      </a>
      <a
        className='transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
        href='https://cs.uwatering.com/justin.run'
        target='_blank'
      >
        <img
          src='https://cs.uwatering.com/icon.white.svg'
          alt='CS Webring'
          style={{ width: '24px', height: 'auto', opacity: 0.8 }}
        />
      </a>
      <a
        className='transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
        href='https://cs.uwatering.com/justin.run?nav=next'
      >
        →
      </a>
    </div>
  );
}
