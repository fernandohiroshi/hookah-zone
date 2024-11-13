"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCartX } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function CartItems() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      setCart(JSON.parse(storageCart));
    }
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce(
      (c, item) => c + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const handleIncrement = (id: number) => {
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const handleDecrement = (id: number) => {
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct && existingProduct.quantity > 1) {
      const updateCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updateCart);
      localStorage.setItem("cart", JSON.stringify(updateCart));
    } else if (existingProduct && existingProduct.quantity === 1) {
      const updateCart = cart.filter((item) => item.id !== id);
      setCart(updateCart);
      localStorage.setItem("cart", JSON.stringify(updateCart));
    }
  };

  const validateFields = (
    field: "name" | "phone" | "address" | "country",
    value: string
  ) => {
    switch (field) {
      case "name":
        return value ? "" : "Por favor, insira seu nome completo.";
      case "phone":
        const phoneRegex = /^[0-9]{9,15}$/;
        return phoneRegex.test(value)
          ? ""
          : "Por favor, insira um número de telefone válido.";
      case "address":
        return value ? "" : "Por favor, insira seu endereço.";
      case "country":
        return value ? "" : "Por favor, insira seu país.";
      default:
        return "";
    }
  };

  const handleChange = (
    field: "name" | "phone" | "address" | "country",
    value: string
  ) => {
    setFields({ ...fields, [field]: value });
    setErrors({ ...errors, [field]: validateFields(field, value) });
  };

  const handleBlur = (field: "name" | "phone" | "address" | "country") => {
    setErrors({ ...errors, [field]: validateFields(field, fields[field]) });
  };

  const handleWhatsappOrderApp = () => {
    const newErrors = {
      name: validateFields("name", fields.name),
      phone: validateFields("phone", fields.phone),
      address: validateFields("address", fields.address),
      country: validateFields("country", fields.country),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Por favor, preencha todos os dados corretamente.");
      return;
    }

    const orderMsg = cart
      .map((item) => `${item.quantity} ${item.name},`)
      .join("\n");
    const fieldsMsg = `Contato:\n\nTelefone: ${fields.phone}\nEndereço: ${fields.address}\nPaís: ${fields.country}`;

    const customerMsg = `Pedidos de ${
      fields.name
    }:\n\n${orderMsg}\n\nValor Total: $${total.toFixed(2)}\n\n${fieldsMsg}`;

    const whatsappUrl = `https://wa.me/45988311915?text=${encodeURIComponent(
      customerMsg
    )}`;
    window.location.href = whatsappUrl;
  };

  return (
    <section className="max-w-4xl mx-auto w-full px-4">
      {cart.length === 0 ? (
        <div className="flex items-center flex-col justify-center gap-4 h-[90vh]">
          <BsCartX size={140} className="animate-bounce text-purple-800" />
          <p className="text-2xl">Você não tem pedidos.</p>
        </div>
      ) : (
        <>
          <div className="py-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-50/20 flex justify-between items-end p-4 hover:bg-slate-50/10"
              >
                <section className="flex gap-3">
                  <div className="min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="object-cover object-center h-full w-full rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-around text-xs md:text-sm">
                    <span>
                      {item.name} (Quant:{" "}
                      <span className="text-pink-400">{item.quantity}</span>)
                    </span>
                    <span className="text-pink-400">
                      <span className="text-slate-50"> Preço:</span> $
                      {item.price * item.quantity}
                    </span>
                  </div>
                </section>

                <div className="flex items-center gap-2">
                  <button
                    className="text-teal-400"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <CiSquarePlus size={24} />
                  </button>
                  <button
                    className="text-rose-400"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <CiSquareMinus size={24} />
                  </button>
                </div>
              </div>
            ))}

            <section className="my-16 bg-slate-800 rounded-xl p-4">
              <h2 className="text-xl mb-8">Dados de Entrega</h2>
              <div className="flex flex-col gap-6 text-xs md:text-sm">
                <input
                  type="text"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2"
                  placeholder="Nome completo"
                  value={fields.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}

                <input
                  type="tel"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2"
                  placeholder="Telefone (WhatsApp)"
                  value={fields.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}

                <input
                  type="text"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2 "
                  placeholder="Endereço"
                  value={fields.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address}</span>
                )}

                <input
                  type="text"
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2 "
                  placeholder="País"
                  value={fields.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country}</span>
                )}
              </div>

              <div className="mt-8 flex justify-between items-end text-xs md:text-sm">
                <p>Valor Total: $ {total.toFixed(2)}</p>
                <button
                  className="bg-slate-950 px-3 py-2 rounded-xl shadow shadow-slate-50/40 ease-in-out duration-300 hover:bg-slate-200 hover:text-slate-950 font-semibold hover:scale-90"
                  onClick={handleWhatsappOrderApp}
                >
                  Enviar Pedido
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
