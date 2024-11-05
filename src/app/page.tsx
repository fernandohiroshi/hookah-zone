"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogoInstagram, BiLogoWhatsapp } from "react-icons/bi";
import dataProducts from "./api/page";
import CartButton from "@/components/CartButton";
import ProductItems from "@/components/ProductItems";

interface Product {
  id: number;
  name: string;
  price: number;
  group: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setProducts(dataProducts);
    const storadCart = localStorage.getItem("cart");
    if (storadCart) {
      setCart(JSON.parse(storadCart));
    }
  }, []);

  const addToCart = (id: number) => {
    const product = products.find((prod: Product) => prod.id === id);
    if (!product) return;

    const existingProduct = cart.find((item) => item.id === id);

    let updateCart: CartItem[];

    if (existingProduct) {
      updateCart = cart.map((item) =>
        item.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updateCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 bg-slate-950/5 backdrop-blur-2xl z-50">
        <div className="max-w-4xl mx-auto flex justify-between px-4 py-6 ">
          <Link href="#" className="text-lg">
            HOKKAH ZONE
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#">
              <BiLogoWhatsapp size={24} />
            </Link>
            <Link href="#">
              <BiLogoInstagram size={24} />
            </Link>
            <CartButton itemCount={cart.length} />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto w-full min-h-screen">
        {/* HERO */}
        <Hero />

        {/* PRODUCTS LIST */}
        <section className="px-4 py-8">
          <h3 className="text-xl mb-8">Produtos:</h3>
          <div className="grid grid-cols-12 gap-3 grid-flow-dense">
            {products.map((product, index) => (
              <ProductItems
                key={product.id}
                id={product.id}
                name={product.name}
                group={product.group}
                image={product.image}
                price={product.price}
                addToCart={addToCart}
                delay={index}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
