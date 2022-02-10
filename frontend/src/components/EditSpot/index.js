import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editSpot } from "../../store/spots";

const UpdateSpot = ({ spot, hideForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [url, setUrl] = useState(spot?.url);
  const [description, setDescription] = useState(spot?.description);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [price, setPrice] = useState(spot?.price);

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
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };
  return (
    <div className="edit-spot-container">
      <form className="edit-spot" onSubmit={handleSubmit}>
        <div className="image">
          <label>
            Image Url
            <input
              type="text"
              placeholder="Image Url"
              value={url ? url : ""}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="description">
          <label> Description </label>
          <textarea
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="city">
          <label> City </label>
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="state">
          <label> State </label>
          <input
            type="text"
            placeholder="State"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="price">
          <label> Price </label>
          <input
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="edit-spot-button" type="submit">
          Submit
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};


export default UpdateSpot;
