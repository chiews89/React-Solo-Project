import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { createFavoriteThunk, deleteFavoriteThunk } from "../../store/favorites";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      spotId: spot.id,
    };
    dispatch(createFavoriteThunk(payload));
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    dispatch(deleteFavoriteThunk(userFavorited[0].id))
  }

  return (
    <div className="favorites-container">
      <div className="heart-container">
        {!spotFavorited.length && <AiOutlineHeart onClick={handleSubmit} />}
        {spotFavorited.length && (
          <span className="filled-heart">
            <AiFillHeart onClick={handleDelete}/>
          </span>
        )}
      </div>
    </div>
  );
};
