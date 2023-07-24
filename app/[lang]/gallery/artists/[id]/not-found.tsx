import Link from 'next/link'

export default function NotFound() {
  return (
    <div className={`flex flex-col flex-wrap my-20`}>
      <h2 className={`text-center text-2xl mx-auto w-100`}>Not found!</h2>
      <div className={`mx-auto my-8 w-100 flex justify-center`}>
        <Link
          href={`/gallery`}
          className={`bg-white text-black border-black border hover:bg-black hover:text-white mb-4 px-8 py-4 text-center font-roboto font-thin focus:outline-none md:mb-0 md:mr-6`}
        >
          Return to gallery
        </Link>
      </div>
    </div>
  );
}
