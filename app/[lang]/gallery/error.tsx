'use client' // Error components must be Client Components

import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error(props: Props) {
  return (
    <div className={`flex content-center justify-center flex-row flex-wrap`}>
      <h2 className={`text-center text-2xl mx-auto w-100`}>Something went wrong!</h2>
      <Link
        href={`/`}
        className={`bg-white text-black border-black border hover:bg-black hover:text-white mb-4 px-8 py-4 text-center font-roboto font-thin focus:outline-none md:mb-0 md:mr-6`}
      >
        Return home
      </Link>
    </div>
  )
}
