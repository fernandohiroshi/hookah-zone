"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCartX } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function CartItems() {
  // STATE HOOKS FOR CART, TOTAL, FORM FIELDS, AND ERRORS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    adress: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    adress: "",
  });

  useEffect(() => {
    // RETRIEVE CART FROM LOCAL STORAGE IF EXISTS
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      setCart(JSON.parse(storageCart));
    }
  }, []);

  useEffect(() => {
    // CALCULATE THE TOTAL PRICE BASED ON CART ITEMS
    const newTotal = cart.reduce(
      (c, item) => c + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const handleIncrement = (id: number) => {
    // INCREMENT ITEM QUANTITY IN CART
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const handleDecrement = (id: number) => {
    // DECREMENT ITEM QUANTITY OR REMOVE ITEM FROM CART IF QUANTITY IS 1
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
    field: "name" | "phone" | "adress",
    value: string
  ) => {
    // VALIDATE FORM FIELDS (NAME, PHONE, AND ADDRESS)
    switch (field) {
      case "name":
        return value ? "" : "Por favor, ingrese su nombre completo.";
      case "phone":
        const phoneRegex = /^[0-9]{9,15}$/;
        return phoneRegex.test(value)
          ? ""
          : "Ingrese un número de teléfono válido.";
      case "adress":
        return value ? "" : "Por favor, ingrese su dirección.";
      default:
        return "";
    }
  };

  const handleChange = (field: "name" | "phone" | "adress", value: string) => {
    // HANDLE INPUT CHANGE AND VALIDATION
    setFields({ ...fields, [field]: value });
    setErrors({ ...errors, [field]: validateFields(field, value) });
  };

  const handleBlur = (field: "name" | "phone" | "adress") => {
    // VALIDATE FIELD ON BLUR
    setErrors({ ...errors, [field]: validateFields(field, fields[field]) });
  };

  const handleWhatsappOrderApp = () => {
    // VALIDATE FORM AND GENERATE WHATSAPP ORDER MESSAGE
    const newErrors = {
      name: validateFields("name", fields.name),
      phone: validateFields("phone", fields.phone),
      adress: validateFields("adress", fields.adress),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Por favor, complete todos los datos correctamente.");
      return;
    }

    const orderMsg = cart
      .map((item) => `${item.quantity} ${item.name},`)
      .join("\n");
    const fieldsMsg = `Contacto:\n\nTeléfono: ${fields.phone}\nDirección: ${fields.adress}`;

    const customerMsg = `Pedidos de ${
      fields.name
    }:\n\n${orderMsg}\n\nValor Total: $${total.toFixed(2)}\n\n${fieldsMsg}`;

    // OPEN WHATSAPP WITH ORDER DETAILS
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
                      {item.name} (Cant:{" "}
                      <span className="text-pink-400">{item.quantity}</span>)
                    </span>
                    <span className="text-pink-400">
                      <span className="text-slate-50"> Precio:</span> $
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
                  placeholder="Nombre Completo"
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
                  placeholder="Teléfono (WhatsApp)"
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
                  placeholder="Dirección"
                  value={fields.adress}
                  onChange={(e) => handleChange("adress", e.target.value)}
                  onBlur={() => handleBlur("adress")}
                />
                {errors.adress && (
                  <span className="text-red-500">{errors.adress}</span>
                )}
              </div>

              <div className="mt-8 flex justify-between items-end text-xs md:text-sm">
                <p>Valor Total: $ {total.toFixed(2)}</p>
                <button
                  className="bg-slate-950 px-3 py-2 rounded-xl shadow shadow-slate-50/40 ease-in-out duration-300 hover:bg-slate-200 hover:text-slate-950 font-semibold hover:scale-90"
                  onClick={handleWhatsappOrderApp}
                >
                  Solicitar
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
