import Category from '../category/Category';
import './DisplayCategory.css';

function DisplayCategory({categories, selectedCategory, setSelectedCategory}) {
  return (
    <div>
      <div className="row g-3" style={{width:"100%" , margin:0}}>
        {categories.map((category) => (
          <div key={category.categoryId} className="col-md-4 col-sm-6" style={{padding: '0 10px'}}>
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
