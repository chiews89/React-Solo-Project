import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const Favorites = ({ spot }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const favorites = Object.values(useSelector((state) => state.favorites));

  const userFavorited = favorites.filter((favorite) => {
    return favorite?.userId === user?.id;
  });

  const spotFavorited = userFavorited.filter((favorite) => {
    return favorite?.spotId === spot?.id;
  });

  console.log("user", user);
  console.log("userFavorite", userFavorited);
  console.log("spotFavorited", spotFavorited);

  return (
    <div className="favorites-container">
      <span className="filled-heart">
        <AiFillHeart />
      </span>
    </div>
  );
};
