import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdArrowBack, MdSave } from 'react-icons/md'
import { categoryService } from '../api/categoryService'

function EditCategory() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    parent: ''
  })

  const [parentCategories, setParentCategories] = useState([])

  useEffect(() => {
    const fetchCategoryAndParents = async () => {
      try {
        const allCategories = await categoryService.getCategories()
        const categoryToEdit = allCategories.find(cat => cat._id === id)

        if (categoryToEdit) {
          setFormData({
            title: categoryToEdit.title || '',
            description: categoryToEdit.description || '',
            status: categoryToEdit.status || 'Active',
            parent: categoryToEdit.parent || ''
          })
          console.log(categoryToEdit);
        }

        const parents = allCategories.filter(cat => cat._id !== id)
        setParentCategories(parents)
      } catch (error) {
        console.error('Error loading category data:', error)
      }
    }

    if (id) {
      fetchCategoryAndParents()
    }
  }, [id])


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await categoryService.updateCategory(id, formData)
      navigate('/categories/list')
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }
  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Edit Category</h1>
          <p className="page-subtitle">Update category information</p>
        </div>
        <div className="page-actions">
          <Link to="/categories/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Categories
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-grid-single">
            <div className="content-card">
              <h3>Category Information</h3>

              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter category description..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="parent">Parent Category (Optional)</label>
                <select
                  id="parent"
                  name="parent"
                  value={formData.parent}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Parent Category --</option>
                  {parentCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <small className="form-hint">Leave empty to make this a main category</small>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Update Category
            </button>
            <Link to="/categories/list" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCategory
