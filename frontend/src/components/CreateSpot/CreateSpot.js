import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewSpot } from "../../store/spots";
import { State } from "country-state-city";
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
      <h3 className="create-spot-title">Host A New Spot!</h3>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <ul>
          {errorValidator.map((error) => (
            <li className="create-spot-errors" key={error}>
              {error}
            </li>
          ))}
        </ul>
        <div className="create-spot-label-container">
          <label className="create-spot-label">
            {" "}
            Title
            <input
              className="create-spot-input"
              type="text"
              placeholder="Title"
              maxLength={'100'}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            Image
            <input
              className="create-spot-input"
              type="text"
              placeholder="Image"
              maxLength={'100'}
              value={url ? url : ""}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label className="create-spot-label">
            {" "}
            Address
            <input
              className="create-spot-input"
              type="text"
              placeholder="Address"
              required
              maxLength={'100'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            {" "}
            City
            <input
              className="create-spot-input"
              type="text"
              placeholder="City"
              maxLength={'20'}
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            State
            <select
              className="create-spot-input"
              id="state"
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
          </label>
          <label className="create-spot-label">
            {" "}
            Description
            <textarea
              className="create-spot-input"
              id="description"
              placeholder="Description"
              required
              maxLength={'1000'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            {" "}
            Price
            <input
              className="create-spot-input"
              type="number"
              placeholder="Price"
              min={1}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            {" "}
            Guests
            <input
              className="create-spot-input"
              type="number"
              placeholder="Guests"
              min={1}
              max={30}
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            {" "}
            Bedrooms
            <input
              className="create-spot-input"
              type="number"
              placeholder="Bedrooms"
              min={1}
              max={30}
              required
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            {" "}
            Bathrooms
            <input
              className="create-spot-input"
              type="number"
              placeholder="bathrooms"
              min={1}
              max={30}
              required
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </label>
        </div>
        <div className="create-spot-submit">
          <button
            className="create-spot-submit-button"
            type="submit"
            disabled={errorValidator.length > 0}
          >
            Add Spot
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSpot;
