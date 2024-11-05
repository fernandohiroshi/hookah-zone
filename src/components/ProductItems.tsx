"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className="col-span-6 md:col-span-4 p-3 h-[20rem] w-full bg-slate-50/10 flex flex-col justify-between rounded-xl hover:bg-slate-50/30 ease-in-out duration-500"
    >
      <div>
        <Image
          src={image}
          alt={group}
          width={500}
          height={500}
          quality={100}
          className="h-[14rem] object-cover object-center w-full rounded-xl"
        />
      </div>
      <h4 className="text-sm mt-2">{name}</h4>
      <div className="flex justify-between items-end text-sm h-full">
        <span>$ {price.toFixed(2)}</span>
        <button className="bg-cyan-800 px-4 py-1 rounded-sm hover:bg-cyan-500 ease-in-out duration-500">
          Add +
        </button>
      </div>
    </motion.div>
  );
}

export default ProductItems;
