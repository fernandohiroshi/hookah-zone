"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogoInstagram, BiLogoWhatsapp } from "react-icons/bi";

import CartButton from "@/components/CartButton";
import ProductItems from "@/components/ProductItems";
import { toast } from "react-hot-toast";
import { dataProducts } from "./api/datas";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>(""); // NEW STATE FOR SELECTED GROUP

  useEffect(() => {
    // SPECIFIC ORDER OF GROUPS
    const groupOrder = [
      "hookah",
      "accessories",
      "essencias",
      "carvao",
      "heads",
      "bebidas",
    ];

    // SORT PRODUCTS FIRST BY GROUP AND THEN BY NAME
    const sortedProducts = [...dataProducts].sort((a, b) => {
      const groupA = groupOrder.indexOf(a.group);
      const groupB = groupOrder.indexOf(b.group);

      if (groupA === groupB) {
        return a.name.localeCompare(b.name); // IF GROUPS ARE EQUAL, SORT BY NAME
      }
      return groupA - groupB; // SORT BY GROUPS
    });

    setProducts(sortedProducts);

    // RETRIEVE CART STORED IN LOCALSTORAGE
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (id: number) => {
    const product = products.find((prod: Product) => prod.id === id);
    if (!product) return;

    const existingProduct = cart.find((item) => item.id === id);

    let updateCart: CartItem[];

    if (existingProduct) {
      updateCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updateCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));

    // DISPLAY TOAST AFTER ADDING PRODUCT
    toast.success(`${product.name} has been added to the cart!`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // FILTER PRODUCTS BASED ON SEARCH TERM AND SELECTED GROUP
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup ? product.group === selectedGroup : true;
    return matchesSearchTerm && matchesGroup;
  });

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 bg-slate-950/5 backdrop-blur-2xl z-50">
        <div className="max-w-4xl mx-auto flex justify-between px-4 py-6 ">
          <Link
            href="#"
            className="text-lg hover:text-cyan-500 ease-in-out duration-300"
          >
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
          <h3 className="text-2xl mb-4">Produtos:</h3>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-6 p-2 border-4 hover:border-cyan-500 rounded w-full text-neutral-950 outline-none"
          />

          {/* GROUP FILTER */}
          <div className="mb-6">
            <h4 className="text-lg mb-2">Filtrar por Categoría:</h4>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
              {[
                "hookah",
                "accessories",
                "essencias",
                "carvao",
                "heads",
                "bebidas",
              ].map((group) => (
                <label key={group} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="group"
                    value={group}
                    checked={selectedGroup === group}
                    onChange={() => setSelectedGroup(group)}
                    className="accent-cyan-500"
                  />
                  {group}
                </label>
              ))}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="group"
                  value=""
                  checked={selectedGroup === ""}
                  onChange={() => setSelectedGroup("")}
                  className="accent-cyan-500"
                />
                All
              </label>
            </div>
          </div>

          {/* RENDERING FILTERED PRODUCTS */}
          <div className="grid grid-cols-12 gap-3 grid-flow-dense">
            {filteredProducts.map((product, index) => (
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
