import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewSpot } from "../../store/spots";

const NewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);



  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      description,
      city,
      state,
      price,
    };
    const newSpot = await dispatch(createNewSpot(payload));
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`)
      reset();
    }
  };
  const reset = () => {
    setDescription("");
    setCity("");
    setState("");
    setPrice(0);
  };

  return (
    <div className="create-spot-container">
      <form className="create-spot" onSubmit={handleSubmit}>
        <h2 className="create-spot-description">Host A New Spot!</h2>
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
        <button className="create-spot-button" type="submit">
          Submit
        </button>
      </form>

    </div>
  );
};

export default NewSpot;
