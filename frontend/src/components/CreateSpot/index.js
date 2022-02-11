import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewSpot } from "../../store/spots";

const NewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState(0);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!url.length || !url?.includes("http" || "https"))
      errors.push("Please provide a url");
    if (!description?.length) errors.push("Please provide a description");
    if (!city?.length) errors.push("Please provide a city");
    if (city?.length > 25) errors.push("City must be less than 25 characters");
    if (!state?.length) errors.push("Please provide a state");
    if (state?.length > 25)
      errors.push("State must be less than 25 characters");
    if (!price?.length) errors.push("Please provide a price");
    if (price < 1) errors.push("Price cannot be less than $1.00");
    setErrorValidator(errors);
  }, [url, description, city, state, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      image: {
        url,
      },
      userId: user.id,
      description,
      city,
      state,
      price,
    };
    const newSpot = await dispatch(createNewSpot(payload));
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`);
      reset();
    }
  };
  const reset = () => {
    setDescription("");
    setCity("");
    setState("");
    setPrice(0);
  };

  const cancelButton = (e) => {
    history.push(`/spots`);
  };

  return (
    <div className="create-spot-container">
      <form className="create-spot" onSubmit={handleSubmit}>
        <h2 className="create-spot-description">Host A New Spot!</h2>
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
          className="create-spot-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Submit
        </button>
      </form>
      <button
        className="cancel-create-button"
        type="true"
        onClick={cancelButton}
      >
        Cancel
      </button>
    </div>
  );
};

export default NewSpot;
