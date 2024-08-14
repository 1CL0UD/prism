import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center flex-row flex-grow">
      <section className="flex flex-col flex-auto justify-center items-center">
        {children}
      </section>
      <section className="lg:block hidden flex-1 w-full h-full ">
        <Image
          src={'/assets/images/side-img.svg'}
          height={1024}
          width={720}
          alt={'Side image'}
          className="h-full w-full object-cover"
        />
      </section>
    </main>
  );
}
