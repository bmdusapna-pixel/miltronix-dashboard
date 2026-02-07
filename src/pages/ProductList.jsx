import { Link } from 'react-router-dom'
import { MdAdd, MdViewModule, MdVisibility, MdEdit, MdDelete } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { productService } from '../api/productService.js'
import { categoryService } from '../api/categoryService.js'

function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ])

        setProducts(productsData || [])
        setCategories(categoriesData || [])

      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data. Using offline mode.')
        setProducts([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId)
    return category ? category.title : 'Unknown'
  }

  

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await productService.deleteProduct(productId)
        setProducts(products.filter(product => product._id !== productId))
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Product List</h1>
            <p className="page-subtitle">Manage your products inventory</p>
          </div>
        </div>
        <div 
          className="content-card" 
          style={{ textAlign: 'center', padding: '40px' }}>
            
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }



  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Product List</h1>
          <p className="page-subtitle">Manage your products inventory ({products.length} products)</p>
        </div>
        <div className="page-actions">
          <Link to="/products/create" className="btn btn-primary">
            <MdAdd size={16} />
            Add Product
          </Link>
          <Link to="/products/grid" className="btn btn-secondary">
            <MdViewModule size={16} />
            Grid View
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
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '20px' }}>No products found.</p>
            <Link to="/products/create" className="btn btn-primary">
              <MdAdd size={16} />
              Create Your First Product
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Brand</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id || product.id || `product-${index}`}>
                    <td>
                      <div className="product-info">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/50x50'}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=No+Image'
                          }}
                        />
                        <div className="product-name-info">
                          <span className="product-name">{product.name}</span>
                          {product.colour && (
                            <small className="product-color">Color: {product.colour}</small>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="sku-code">{product.sku || 'N/A'}</span>
                    </td>
                    <td>{getCategoryName(product.category)}</td>
                    <td className="price">
                      <div className="price-info">
                        <span className="selling-price">₹{product.price?.toLocaleString()}</span>
                        {product.mrp && product.mrp > product.price && (
                          <small className="mrp-price">MRP: ₹{product.mrp?.toLocaleString()}</small>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`stock ${product.stockQuantity === 0 ? 'out-of-stock' : 'in-stock'}`}>
                        {product.stockQuantity || 0}
                      </span>
                    </td>
                    <td>
                      <span className="brand-name">{product.brand || 'N/A'}</span>
                    </td>
                    <td>
                      <span className={`status ${product.stockQuantity > 0 ? 'active' : 'inactive'}`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/products/details/${product._id}`}
                          className="action-btn view"
                          title="View Details"
                        >
                          <MdVisibility size={16} />
                        </Link>
                        <Link
                          to={`/products/edit/${product._id}`}
                          className="action-btn edit"
                          title="Edit Product"
                        >
                          <MdEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="action-btn delete"
                          title="Delete Product"
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

export default ProductList
