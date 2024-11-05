import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="relative w-full h-[20rem] md:h-[30rem] px-4 overflow-x-hidden">
      <Image
        src="https://images.pexels.com/photos/11945527/pexels-photo-11945527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height={800}
        width={800}
        quality={100}
        alt="Feature Image"
        className="object-cover w-full h-full z-30 opacity-50"
      />
      <div className="absolute w-full h-full top-0 flex justify-center items-center z-40 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="max-w-sm text-center flex flex-col">
          <h2 className="text-2xl">Tabaquería y productos de narguile</h2>
          <p className="text-sm">Cualquier duda, comunícate por WhatsApp</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
