import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editSpot, removeSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { State } from "country-state-city";

const UpdateSpot = ({ spot, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const states = State.getStatesOfCountry("US");

  const [url, setUrl] = useState(spot?.Images[0]?.url);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [title, setTitle] = useState(spot?.title);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [guests, setGuests] = useState(spot?.guests);
  const [bedrooms, setBedrooms] = useState(spot?.bedrooms);
  const [bathrooms, setBathrooms] = useState(spot?.bathrooms);
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
    const updatedSpot = await dispatch(editSpot(payload));
    if (updatedSpot) {
      setShowModal(false);
    }
  };

  const handleDelete = () => {
    dispatch(removeSpot(spot.id));
    history.push(`/users/${user.id}/`);
  };

  return (
    <div className="create-spot-container">
      <h3 className="create-spot-title">Edit Your Spot</h3>
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
              maxLength={"100"}
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
              maxLength={"100"}
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
              maxLength={"100"}
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
              maxLength={"20"}
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="create-spot-label">
            State
            <select
              id="state"
              className="create-spot-input"
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
              maxLength={"1000"}
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
            Edit Your Spot
          </button>
        </div>
        <div className="create-spot-submit">
          <button
            onClick={handleDelete}
            className="create-spot-submit-button"
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSpot;
