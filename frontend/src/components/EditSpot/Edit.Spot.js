import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editSpot, removeSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

const UpdateSpot = ({ spot, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [url, setUrl] = useState(spot?.url);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
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
    history.push(`/spots`);
  };

  return (
    <div className="create-spot-container">
      <form className="edit-spot" onSubmit={handleSubmit}>
        <h2 className="create-spot-description">Edit Your Spot</h2>
        <ul>
          {errorValidator.map((error) => (
            <li className="error_list" key={error}>
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
            // required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="image">
          <label>
            Image Url
            <input
              id="form-label"
              type="text"
              placeholder="Image Url"
              value={url ? url : ""}
              onChange={(e) => setUrl(e.target.value)}
              // required
            />
          </label>
        </div>
        <div className="address">
          <label> Address </label>
          <input
            id="form-label"
            type="text"
            placeholder="Address"
            // required
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
            // required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="state">
          <label> State </label>
          <input
            id="form-label"
            type="text"
            placeholder="State"
            // required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="description">
          <label> Description </label>
          <textarea
            id="form-label"
            type="text"
            placeholder="Description"
            // required
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
            // required
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
            // required
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
            // required
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
            // required
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
        <button
          className="edit-spot-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Submit
        </button>
        <button className="delete-spot-button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default UpdateSpot;
