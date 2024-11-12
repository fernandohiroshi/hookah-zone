"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface ProductItemsProps {
  id: number;
  name: string;
  price: number;
  group: string;
  image: string;
  addToCart: (id: number) => void;
  delay: number;
}

function ProductItems({
  id,
  name,
  price,
  group,
  image,
  addToCart,
  delay,
}: ProductItemsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir e fechar o modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: delay * 0.1,
          ease: "easeOut",
        }}
        className="col-span-6 md:col-span-4 p-3 h-[14rem] md:h-[20rem] w-full bg-slate-50/10 flex flex-col justify-between rounded-xl hover:bg-slate-50/30 ease-in-out duration-500"
      >
        <div onClick={toggleModal} className="cursor-pointer">
          <Image
            src={image}
            alt={group}
            width={500}
            height={500}
            quality={100}
            className="h-[8rem] md:h-[13rem] object-cover object-center w-full rounded-xl"
          />
        </div>
        <h4 className="text-xs lg:text-sm mt-2">{name}</h4>
        <div className="flex justify-between items-end h-full">
          <span>$ {price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(id)}
            className="bg-cyan-800 px-2 py-1 rounded-sm hover:bg-cyan-500 ease-in-out duration-500"
          >
            Add
          </button>
        </div>
      </motion.div>

      {/* Modal para mostrar a imagem ampliada */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={toggleModal} // Fecha o modal ao clicar fora da imagem
        >
          <div className="relative m-4">
            <Image
              src={image}
              alt={group}
              width={500}
              height={500}
              quality={100}
              className="max-w-full max-h-[90vh] object-cover object-center rounded-lg"
            />
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 bg-gray-800 text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItems;
