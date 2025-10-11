import CategoryForm from '../../components/categoryForm/CategoryForm';
import CategoryList from '../../components/categoryList/CategoryList';
import './ManageCategory.css';


function ManageCategory() {
  return (
    <>
      <div className="category-container text-light">
        <div className="left-container">
            <CategoryForm />
        </div>

        <div className="right-container">
            <CategoryList />
        </div>
      </div>
    </>
  )
}

export default ManageCategory;