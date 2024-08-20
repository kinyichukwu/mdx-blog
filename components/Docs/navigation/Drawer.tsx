import React, { ReactNode } from 'react';

export default function Drawer({
  children,
  isOpen,
  setIsOpen
}: {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  return (
    <main
      className={
        ' absolute top-[101%] overflow-hidden bg-black/50 bg-opacity-25 inset-0 transform ease-in-out md:hidden w-full' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-y-0 h-screen'
          : ' transition-all delay-500 opacity-0 translate-y-full h-full')
      }
    >
      <section
        className={
          ' w-full max-w-lg right-0 absolute top-0 bg-[#0d1117] h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-y-0 ' : ' -translate-y-full ')
        }
      >
        <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {children}
        </article>
      </section>
      {/* <section
        className=" w-full h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section> */}
    </main>
  );
}
