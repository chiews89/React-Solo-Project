import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editSpot } from "../../store/spots";

const UpdateSpot = ({ spot, hideForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [url, setUrl] = useState(spot?.url);
  const [description, setDescription] = useState(spot?.description);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [price, setPrice] = useState(spot?.price);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!description?.length) errors.push("Please provide a description");
    if (!city?.length) errors.push("Please provide a city");
    if (city?.length > 25) errors.push("City must be less than 25 characters");
    if (!state?.length) errors.push("Please provide a state");
    if (state?.length > 25)
      errors.push("State must be less than 25 characters");
    if (!price?.length) errors.push("Please provide a price");
    if (price < 1) errors.push("Price cannot be less than $1.00");
    setErrorValidator(errors);
  }, [description, city, state, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: spot.id,
      image: {
        url,
      },
      userId: user.id,
      description,
      city,
      state,
      price,
    };
    const updatedSpot = await dispatch(editSpot(payload));
    if (updatedSpot) {
      if (updatedSpot) hideForm();
    }
  };

  return (
    <div className="edit-spot-container">
      <form className="edit-spot" onSubmit={handleSubmit}>
        <ul>
          {errorValidator.map((error) => (
            <li className="error_list" key={error}>
              {error}
            </li>
          ))}
        </ul>
        <div className="image">
          <label>
            Image Url
            <input
              type="text"
              placeholder="Image Url"
              value={url ? url : ""}
              onChange={(e) => setUrl(e.target.value)}
              // required
            />
          </label>
        </div>
        <div className="description">
          <label> Description </label>
          <textarea
            type="text"
            placeholder="Description"
            // required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="city">
          <label> City </label>
          <input
            type="text"
            placeholder="City"
            // required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="state">
          <label> State </label>
          <input
            type="text"
            placeholder="State"
            // required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="price">
          <label> Price </label>
          <input
            type="number"
            placeholder="Price"
            // required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          className="edit-spot-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Submit
        </button>
        <button
          className="cancel-edit-button"
          type="true"
          to={`/spots/${spot.id}`}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateSpot;
