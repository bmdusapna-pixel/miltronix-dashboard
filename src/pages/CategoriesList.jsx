import { Link } from 'react-router-dom'
import { MdAdd, MdVisibility, MdEdit, MdDelete, MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { useState, useEffect, Fragment } from 'react'
import { categoryService } from '../api/categoryService.js'

function CategoriesList() {
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError('')
        const categoriesData = await categoryService.getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories(categoryService.getCategories())
        setError('Unable to connect to backend. Showing sample data.')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const mockCategories = [
    {
      _id: '1',
      title: 'Electronics',
      description: 'Electronic devices and gadgets',
      productCount: 25,
      status: 'Active',
      createdAt: '2024-01-10',
      createdBy: 'Admin',
      parent: null,
      isSubCategory: false
    },
    {
      _id: '2',
      title: 'Computers',
      description: 'Laptops, desktops, and computer accessories',
      productCount: 15,
      status: 'Active',
      createdAt: '2024-01-12',
      createdBy: 'Admin',
      parent: null,
      isSubCategory: false
    },
    {
      _id: '3',
      title: 'Smartphones',
      description: 'Mobile phones and smartphones',
      productCount: 20,
      status: 'Active',
      createdAt: '2024-01-13',
      createdBy: 'Admin',
      parent: '1',
      isSubCategory: true
    },
    {
      _id: '4',
      title: 'Laptops',
      description: 'Laptop computers',
      productCount: 10,
      status: 'Active',
      createdAt: '2024-01-14',
      createdBy: 'Admin',
      parent: '2',
      isSubCategory: true
    },
    {
      _id: '5',
      title: 'Accessories',
      description: 'Phone cases, chargers, and other accessories',
      productCount: 30,
      status: 'Active',
      createdAt: '2024-01-15',
      createdBy: 'Admin',
      parent: null,
      isSubCategory: false
    },
    {
      _id: '6',
      title: 'Clothing',
      description: 'Apparel and fashion items',
      productCount: 0,
      status: 'Inactive',
      createdAt: '2024-01-18',
      createdBy: 'Admin',
      parent: null,
      isSubCategory: false
    }
  ]

  const parentCategories = categories.filter(cat => !cat.isSubCategory)
  const subCategories = categories.filter(cat => cat.isSubCategory)

  const getSubCategories = (parentId) => {
    return subCategories.filter(cat => cat.parent === parentId)
  }

  const toggleExpanded = (categoryId) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        await categoryService.deleteCategory(categoryId)
        setCategories(categories.filter(category => category._id !== categoryId))
        alert('Category deleted successfully!')
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Failed to delete category. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Categories</h1>
            <p className="page-subtitle">Loading categories...</p>
          </div>
        </div>
        <div className="content-card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading categories...</p>
        </div>
      </div>
    )
  }



  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">Manage product categories ({categories.length} categories)</p>
        </div>
        <div className="page-actions">
          <Link to="/categories/create" className="btn btn-primary">
            <MdAdd size={16} />
            Add Category
          </Link>
        </div>
      </div>

      {error && (
        <div className="content-card" style={{
          backgroundColor: '#fef3c7',
          borderLeft: '4px solid #f59e0b',
          marginBottom: '20px',
          padding: '12px 16px'
        }}>
          <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
            ⚠️ {error}
          </p>
        </div>
      )}

      <div className="content-card">
        {categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '20px' }}>No categories found.</p>
            <Link to="/categories/create" className="btn btn-primary">
              <MdAdd size={16} />
              Create Your First Category
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Created By</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      <div className="category-name-container">
                        <span className="category-name">{category.title}</span>
                        {category.isSubCategory && (
                          <span className="sub-category-badge">Sub</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="category-description">{category.description || 'No description'}</span>
                    </td>
                    <td>
                      <span className={`type ${category.isSubCategory ? 'sub' : 'parent'}`}>
                        {category.isSubCategory ? 'Sub Category' : 'Parent Category'}
                      </span>
                    </td>
                    <td>
                      <span className="created-by">{category.createdBy || 'Unknown'}</span>
                    </td>
                    <td>{new Date(category.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/categories/edit/${category._id}`}
                          className="action-btn edit"
                          title="Edit Category"
                        >
                          <MdEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(category._id, category.title)}
                          className="action-btn delete"
                          title="Delete Category"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesList
