import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { addCategory } from '../../service/CategoryService';
import AppContext from '../../context/AppContext';

function CategoryForm() {
    const {categories, setCategories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#ffffff",
    });

    function onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]:value}));
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!image) {
            toast.error("Please upload the image");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('request', JSON.stringify(data));
        formData.append('imageFile', image);

        try {
            const response = await addCategory(formData);
            if (response.status === 200) {
                setCategories([...categories, response.data]);
                toast.success("Category Added!");
                setData({ name: "", description: "", bgColor: "#ffffff" });
                setImage(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <div className="category-form-container" style={{height:'100vh', overflowX:'hidden', overflowY:'auto'}}>
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container rounded-4">
                    <div className="card-body" >
                        <form onSubmit={onSubmit}>
                            <div className="mb-3 mt-3">
                                <label htmlFor="image" className='form-label'>
                                    <img src={image ? URL.createObjectURL(image) : 'src/assets/cloud-computing.png'} alt="" width={48}/>
                                </label>
                                <input type="file" name='image' id='image' className='form-control' hidden onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className='form-label'>
                                    Name
                                </label>
                                <input type="text" id='name' name='name' 
                                className='form-control' 
                                placeholder='Category Name'
                                value={data.name}
                                required
                                onChange={onChangeHandler}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className='form-label'>
                                    Description
                                </label>
                                <textarea id='description' name='description' rows={5}
                                className='form-control' 
                                placeholder='Enter the description of the category'
                                onChange={onChangeHandler}
                                value={data.description}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className='form-label'>Background Color</label>
                                <br />
                                <input type="color" name='bgColor' id='bgColor' placeholder='#ffffff' value={data.bgColor} onChange={onChangeHandler}
                                />
                            </div>
                            <button className="mb-3 btn btn-warning w-100" type='submit' disabled={loading}>{loading ? "Loading...": "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  ) 
}

export default CategoryForm
