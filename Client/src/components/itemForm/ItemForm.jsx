import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { addItem } from "../../service/ItemService";
import toast from "react-hot-toast";

function ItemForm() {
  const { categories, setItems, items, setCategories } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      toast.error("Select the image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("image", image);

    try {
      const response = await addItem(formData);
      setCategories((prevCategories) => prevCategories.map((category) => category.categoryId === data.categoryId ? {...category, items: category.items+1} : category))
      if (response.status === 201) {
        setItems([...items, response.data]);
        toast.success("Item added successfully!");
        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(false);
      } else {
        toast.error("Error adding item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowX: "hidden", overflowY: "auto" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="cardbody">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3 mt-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : "src/assets/cloud-computing.png"
                      }
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="category"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                  >
                    <option value="" disabled selected>
                      ---SELECT CATEGORY---
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="₹200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="form-control"
                    placeholder="Enter the description"
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                <button
                  className="mb-3 btn btn-warning w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
