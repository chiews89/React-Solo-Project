import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewSpot } from "../../store/spots";
import { State, City } from "country-state-city";
import "./CreateSpot.css";

const NewSpot = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const states = State.getStatesOfCountry("US");

  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [errorValidator, setErrorValidator] = useState([]);

  // useEffect(() => {
  //   const errors = [];
  //   if (!url.length || !url?.includes("http" || "https"))
  //     errors.push("Please provide a url");
  //   if (!description?.length) errors.push("Please provide a description");
  //   if (!city?.length) errors.push("Please provide a city");
  //   if (city?.length > 25) errors.push("City must be less than 25 characters");
  //   if (!state?.length) errors.push("Please provide a state");
  //   if (state?.length > 25)
  //     errors.push("State must be less than 25 characters");
  //   if (!price?.length) errors.push("Please provide a price");
  //   if (price < 1) errors.push("Price cannot be less than $1.00");
  //   setErrorValidator(errors);
  // }, [url, description, city, state, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      image: {
        url,
      },
      userId: user.id,
      address,
      city,
      state,
      title,
      description,
      price,
      guests,
      bedrooms,
      bathrooms,
    };
    const newSpot = await dispatch(createNewSpot(payload));
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`);
      setShowModal(false);
    }
  };

  return (
    <div className="create-spot-container">
      <form className="create-spot" onSubmit={handleSubmit}>
        <h2 className="create-spot-description">Host A New Spot!</h2>
        <ul>
          {errorValidator.map((error) => (
            <li className="error-list" key={error}>
              {error}
            </li>
          ))}
        </ul>
        <div className="title">
          <label> Title </label>
          <input
            id="form-label"
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="image">
          <label>
            Image
            <input
              id="form-label"
              type="text"
              placeholder="Image"
              value={url ? url : ""}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="address">
          <label> Address </label>
          <input
            id="form-label"
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="city">
          <label> City </label>
          <input
            id="form-label"
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="state">
          <label>State</label>
          <select
            id="form-label"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select a State</option>
            {states?.map(({ name }, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="description">
          <label> Description </label>
          <textarea
            id="form-label"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price">
          <label> Price </label>
          <input
            id="form-label"
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="guests">
          <label> Guests </label>
          <input
            id="form-label"
            type="number"
            placeholder="Guests"
            min={1}
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <div className="bedrooms">
          <label> Bedrooms </label>
          <input
            id="form-label"
            type="number"
            placeholder="Bedrooms"
            min={1}
            required
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>
        <div className="bathrooms">
          <label> Bathrooms </label>
          <input
            id="form-label"
            type="number"
            placeholder="bathrooms"
            min={1}
            required
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
        <button
          id="create-spot-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Add Spot
        </button>
      </form>
    </div>
  );
};

export default NewSpot;
