import { useDispatch, useSelector } from "react-redux";
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
    return favorite?.spotId === spot;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      spotId: spot,
    };
    dispatch(createFavoriteThunk(payload));
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    dispatch(deleteFavoriteThunk(spotFavorited[0].id))
  }

  return (
    <div className="favorites-container">
      <div className="heart-container">
        {!spotFavorited.length && <AiOutlineHeart onClick={handleSubmit} />}
        {spotFavorited.length > 0 && (
          <span className="filled-heart">
            <AiFillHeart onClick={handleDelete}/>
          </span>
        )}
      </div>
    </div>
  );
};
