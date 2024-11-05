import Link from "next/link";
import React from "react";
import { BiLogoInstagram, BiLogoWhatsapp } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  return (
    <header className="sticky top-0 bg-slate-950/5 backdrop-blur-2xl flex justify-between px-4 py-6">
      <h1 className="text-xl">HOKKAH ZONE</h1>
      <div className="flex items-center gap-4">
        <Link href="#">
          <BiLogoWhatsapp size={30} />
        </Link>
        <Link href="#">
          <BiLogoInstagram size={30} />
        </Link>
        <Link href="#">
          <GiShoppingCart size={30} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
