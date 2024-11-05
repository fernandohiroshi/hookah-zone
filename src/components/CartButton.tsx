import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";

type ItemCountProps = {
  itemCount: number;
};

const CartButton = ({ itemCount }: ItemCountProps) => {
  return (
    <Link href="#" className="flex items-start">
      <GiShoppingCart size={24} />
      <span className="text-xs">{itemCount}</span>
    </Link>
  );
};

export default CartButton;
