"use client";
import React from 'react';

function Hbutton() {
  const buttonVariants = ({ variant }: { variant: string }) => `buttonVariants ${variant}`;

  return (
    <div className='flex flex-row space-x-4'> {/* Utiliser flex-row pour aligner les boutons horizontalement */}
      <button 
        onClick={() => window.location.href = '/'} 
        className={`${buttonVariants({ variant: "ghost" })} text-black hover:bg-rose-500 px-4 py-2 rounded-lg`}>
        Home 
      </button>
      <button 
        onClick={() => window.location.href = '/article'} 
        className={`${buttonVariants({ variant: "ghost" })} text-black hover:bg-rose-500 px-4 py-2 rounded-lg`}>
        Article 
      </button>
      <button 
        onClick={() => window.location.href = '/doctors'} 
        className={`${buttonVariants({ variant: "ghost" })} text-black hover:bg-rose-500 px-4 py-2 rounded-lg`}>
        Doctors 
      </button>
      <button 
        onClick={() => window.location.href = '/story'} 
        className={`${buttonVariants({ variant: "ghost" })} text-black hover:bg-rose-500 px-4 py-2 rounded-lg`}>
        Feel Her Story 
      </button>
    </div>
  );
}

export default Hbutton;
