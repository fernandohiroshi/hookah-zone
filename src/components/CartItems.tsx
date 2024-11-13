"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCartX } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function CartItems() {
  // State to store the cart items (initially empty array)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);

  // State to store the total price of the cart
  const [total, setTotal] = useState(0);

  // State to store the input fields for delivery data
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  // State to store validation errors for delivery fields
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  // Load the cart from local storage when the component is mounted
  useEffect(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      setCart(JSON.parse(storageCart));
    }
  }, []);

  // Calculate the total price whenever the cart changes
  useEffect(() => {
    const newTotal = cart.reduce(
      (c, item) => c + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  // Handle incrementing the quantity of an item in the cart
  const handleIncrement = (id: number) => {
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  // Handle decrementing the quantity of an item in the cart
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

  // Validate the fields when the user interacts with them
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

  // Update the field value and check for validation errors
  const handleChange = (
    field: "name" | "phone" | "address" | "country",
    value: string
  ) => {
    setFields({ ...fields, [field]: value });
    setErrors({ ...errors, [field]: validateFields(field, value) });
  };

  // Validate the field when the user leaves the input field
  const handleBlur = (field: "name" | "phone" | "address" | "country") => {
    setErrors({ ...errors, [field]: validateFields(field, fields[field]) });
  };

  // Handle sending the order details via WhatsApp when the user clicks "Enviar Pedido"
  const handleWhatsappOrderApp = () => {
    const newErrors = {
      name: validateFields("name", fields.name),
      phone: validateFields("phone", fields.phone),
      address: validateFields("address", fields.address),
      country: validateFields("country", fields.country),
    };

    setErrors(newErrors);

    // If there are any validation errors, display an error message and stop the process
    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Por favor, preencha todos os dados corretamente.");
      return;
    }

    // Create the message with order details and customer information
    const orderMsg = cart
      .map((item) => `${item.quantity} ${item.name},`)
      .join("\n");
    const fieldsMsg = `Contato:\n\nTelefone: ${fields.phone}\nEndereço: ${fields.address}\nPaís: ${fields.country}`;

    const customerMsg = `Pedidos de ${
      fields.name
    }:\n\n${orderMsg}\n\nValor Total: R$${total.toFixed(2)}\n\n${fieldsMsg}`;

    // Redirect the user to WhatsApp with the order details
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
                      {item.name} (Quantidade:{" "}
                      <span className="text-pink-400">{item.quantity}</span>)
                    </span>
                    <span className="text-pink-400">
                      <span className="text-slate-50"> Preço:</span> R${" "}
                      {item.price * item.quantity}
                    </span>
                  </div>
                </section>

                <div className="flex items-center gap-2">
                  <button
                    className="text-teal-400"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <CiSquarePlus size={28} />
                  </button>
                  <button
                    className="text-rose-400"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <CiSquareMinus size={28} />
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
                  className="py-2 rounded-sm bg-slate-50/10 hover:bg-slate-50/20 outline-none px-2"
                  placeholder="País"
                  value={fields.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country}</span>
                )}

                <div className="flex justify-between items-center gap-6 text-xs md:text-xl">
                  <div className="flex gap-1 items-center">
                    <span>Total:</span>
                    <span className="font-semibold text-pink-400">
                      R$ {total}
                    </span>
                  </div>
                  <button
                    className="text-pink-400 border border-pink-400 py-2 px-6 rounded-full hover:bg-pink-400 hover:text-slate-50 transition-all"
                    onClick={handleWhatsappOrderApp}
                  >
                    Solicitar
                  </button>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
}

export default CartItems;
