import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";

const CartButton = () => {
  return (
    <Link href="#" className="flex items-start">
      <GiShoppingCart size={24} />
      <span className="text-xs">0</span>
    </Link>
  );
};

export default CartButton;
