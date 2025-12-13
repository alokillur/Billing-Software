import Category from '../category/Category';
import './DisplayCategory.css';

function DisplayCategory({categories, selectedCategory, setSelectedCategory}) {
  return (
    <div>
      <div className="row g-2" style={{width:"100%" , margin:0}}>
        {categories.map((category) => (
          <div key={category.categoryId} className="col-xxl-4 col-xl-6 col-lg-12 col-md-12 col-sm-12" style={{padding: '0 10px'}}>
            <Category category={category} 
            isSelected={selectedCategory === category.categoryId} 
            onclick={() => setSelectedCategory(category.categoryId)}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayCategory;
