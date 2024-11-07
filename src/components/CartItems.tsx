"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BsCartX } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function CartItems() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    adress: "",
  });

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      setCart(JSON.parse(storageCart));
    }
  }, []);

  return (
    <section className="max-w-4xl mx-auto w-full px-4">
      {cart.length === 0 ? (
        <div className="flex items-center flex-col justify-center gap-4 h-[90vh]">
          <BsCartX size={140} className="animate-bounce text-purple-800" />
          <p className="text-2xl">No tienes pedidos.</p>
        </div>
      ) : (
        <>
          <div className="py-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-50/20 flex justify-between items-end p-4 hover:bg-slate-50/10"
              >
                <section className="flex gap-8">
                  <div className="max-w-[6rem] max-h-[6rem]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="h-full object-cover object-center w-full rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-around">
                    <span>
                      {item.name} (Cant:{" "}
                      <span className="text-pink-400">{item.quantity}</span>)
                    </span>
                    <span className="text-pink-400">
                      <span className="text-slate-50"> Precio:</span> $
                      {item.price * item.quantity}
                    </span>
                  </div>
                </section>

                {/* QUANTITY BUTTONS */}

                <div className="flex items-center gap-2">
                  <button className="text-teal-400">
                    <CiSquarePlus size={30} />
                  </button>
                  <button className="text-rose-400">
                    <CiSquareMinus size={30} />
                  </button>
                </div>
              </div>
            ))}

            {/* FORM */}
            <section className="my-16 bg-slate-800 rounded-xl p-4">
              <h2 className="text-xl mb-8">Datos de Entrega</h2>
              <div className="flex flex-col gap-6 text-sm">
                {/* NAME */}
                <input
                  type="text"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2"
                  placeholder="Nombre Completo"
                  value={fields.name}
                  onChange={(e) =>
                    setFields({ ...fields, name: e.target.value })
                  }
                />

                {/* PHONE */}
                <input
                  type="tel"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2"
                  placeholder="Teléfono (WhatsApp)"
                  value={fields.phone}
                  onChange={(e) =>
                    setFields({ ...fields, phone: e.target.value })
                  }
                />

                {/* ADRESS */}
                <input
                  type="text"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2 "
                  placeholder="Dirección"
                  value={fields.adress}
                  onChange={(e) =>
                    setFields({ ...fields, adress: e.target.value })
                  }
                />
              </div>

              <div className="mt-8 flex justify-between items-end text-sm">
                <p>Valor Total: $ 500.00</p>
                <button className="bg-slate-950 px-3 py-2 rounded-xl shadow shadow-slate-50/40 ease-in-out duration-200 hover:bg-slate-900">
                  Finalizar Pedido
                </button>
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
}

export default CartItems;
