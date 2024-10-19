
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '../button';
function Hbutton() {

  return (
    <div className='flex flex-row space-x-4'> {/* Utiliser flex-row pour aligner les boutons horizontalement */}
      <Link 
        href={"/"}
        className={`${buttonVariants({ variant: "ghost" })} text-black  px-4 py-2 rounded-lg`}>
        Home 
      </Link>
      <Link 
         href={"/articles"}
        className={`${buttonVariants({ variant: "ghost" })} text-black  px-4 py-2 rounded-lg`}>
        Articles
      </Link>
      <Link 
         href={"/doctors"}
        className={`${buttonVariants({ variant: "ghost" })} text-black  px-4 py-2 rounded-lg`}>
        Doctors 
      </Link>
      <Link 
         href={"/stories"}
        className={`${buttonVariants({ variant: "ghost" })} text-black  px-4 py-2 rounded-lg`}>
        Feel Her Story 
      </Link>
    </div>
  );
}

export default Hbutton;
