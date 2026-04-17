import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}
    </div>
  );
}

export default Wishlist;