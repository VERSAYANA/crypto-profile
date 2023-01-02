import Link from 'next/link'

function Landing() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 md:gap-9">
      <h1 className="max-w-xl text-center text-3xl md:text-5xl">
        Share all of your cryptocurrency addresses in one page
      </h1>
      <h2 className="text-center text-lg opacity-80 md:text-2xl">
        Create a profile like{' '}
        <Link target={'_blank'} href="/versayana">
          <span className="link">this</span>
        </Link>{' '}
        to receive cryptocurrency payments or donations.
      </h2>
      <div className="flex w-full flex-col items-center gap-y-4 px-4 md:p-0">
        <Link
          href={'/auth'}
          className="hidden w-full max-w-xl items-center justify-between rounded-full border border-base-200 bg-base-200 py-2 pl-4 pr-2 text-xl drop-shadow-md md:flex"
        >
          <div className="flex">
            <span>cryptoprofile.vercel.app/</span>
            <span className="opacity-50">username</span>
          </div>
          <button className="btn-secondary btn ml-2 rounded-full normal-case drop-shadow-md">
            Create my page
          </button>
        </Link>

        <Link
          href={'/auth'}
          className="flex h-12 w-full max-w-xl items-center justify-between rounded-full border border-base-200 bg-base-200 py-2 pl-4 pr-2 text-base drop-shadow-md md:hidden"
        >
          <div className="flex">
            <span>cryptoprofile.vercel.app/</span>
            <span className="opacity-50">username</span>
          </div>
        </Link>
        <Link
          href={'/auth'}
          className="btn-secondary btn w-full rounded-full normal-case drop-shadow-md md:hidden"
        >
          Create my page
        </Link>
      </div>
    </div>
  )
}

export default Landing
