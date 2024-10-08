"use client";
import { useEffect, useState } from "react";
import { MdMenu, MdOutlineOpenInNew } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";


export const Header = () => {
  const [title, setTitle] = useState("CodarSe");
  const [drawer, setDrawer] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    setTitle(document.title);
    setDrawer(false);
  }, [currentPath]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <>
      <nav className="flex items-center gap-6 fixed top-0 right-0 left-0 justify-start md:justify-center bg-primary py-2 sm:py-4 px-6">
        <button className="sm:hidden" onClick={() => setDrawer(true)}>
          <MdMenu size={24} />
        </button>

        <ul className="flex gap-4 items-center" tabIndex={drawer ? -1 : undefined}>
          <li className="my-2">
            <Link href="/" className="border-2 rounded-md py-2 px-1 font-bold">
              CODARSE
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link href="/" data-active={currentPath === "/"} className="data-[active=true]:underline outline-offset-4">
              Página inicial
            </Link>
          </li>        
          <li className="hidden sm:block">
            <Link href="/courses" data-active={currentPath === "/courses"} className="data-[active=true]:underline outline-offset-4">
              Cursos
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link href="https://blog.codarse.com" target="_blank" className="flex gap-1 items-center outline-offset-4">
              Blog
              <MdOutlineOpenInNew />
            </Link>
          </li>
        </ul>

        <div 
          data-open={drawer}
          tabIndex={drawer ? undefined : -1}
          onClick={() => setDrawer(false)}
          className="sm:hidden bg-gradient-to-r from-background fixed top-0 left-0 bottom-0 right-0 transition-transform data-[open=false]:-translate-x-full"
        >
          <ul className="flex gap-2 flex-col p-4 w-60 h-full bg-background" onClick={(e) => e.stopPropagation()}>        
            <li data-active={currentPath === "/"} className="py-1 data-[active=true]:border-b">
              <Link href="/">
                Página inicial
              </Link>
            </li>        
            <li data-active={currentPath === "/courses"} className="py-1 data-[active=true]:border-b">
              <Link href="/courses">
                Cursos
              </Link>
            </li>
            <li className="">
              <Link href="https://blog.codarse.com" target="_blank" className=" py-1 flex gap-1 items-center">
                Blog
                <MdOutlineOpenInNew />
              </Link>
            </li>
          </ul>
        </div>      

        <h1 className="sm:hidden line-clamp-1">
          {title}
        </h1>
      </nav>
      <div className="h-14 sm:h-[72px]" />
    </>
  );
};
