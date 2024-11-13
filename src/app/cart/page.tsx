import CartItems from "@/components/CartItems";
import Link from "next/link";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

export default function Cart() {
  return (
    <main>
      {/* HEADER */}
      <header className="sticky top-0 bg-slate-800 backdrop-blur-2xl z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-end px-4 py-8">
          <Link
            href="/"
            title="Voltar"
            className="text-xl flex items-center gap-2 hover:text-cyan-500 ease-in-out duration-500"
          >
            <BiSolidLeftArrowCircle size={24} className="animate-pulse" />
            Voltar
          </Link>

          <h1 className="text-xl font-light">Meus pedidos</h1>
        </div>
      </header>
      <CartItems />
    </main>
  );
}
