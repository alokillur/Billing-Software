import Category from "../category/Category";
import "./DisplayCategory.css";
import { assets } from "../../assets/assets";

function DisplayCategory({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const allItemsCategory = {
    name: "All Items",
    imgUrl: assets.device,
    items: categories.reduce((acc, cat) => acc + (cat.items || 0), 0),
  };

  return (
    <div>
      <div className="row g-3" style={{ width: "100%", margin: 0 }}>
        <div
          key={"all"}
          className="col-xxl-4 col-xl-6 col-lg-12 col-md-12 col-sm-12"
          style={{ padding: "0 10px" }}
        >
          <Category
            category={allItemsCategory}
            isSelected={selectedCategory === ""}
            onclick={() => setSelectedCategory("")}
          />
        </div>
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="col-xxl-4 col-xl-6 col-lg-12 col-md-12 col-sm-12"
            style={{ padding: "0 10px" }}
          >
            <Category
              category={category}
              isSelected={selectedCategory === category.categoryId}
              onclick={() => setSelectedCategory(category.categoryId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayCategory;
