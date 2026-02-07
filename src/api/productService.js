import { instance } from './axios.config.js'
import { mockProducts } from './mockData.js'

export const productService = {
  createProduct: async (productData) => {
    try {
      const formData = new FormData()

      formData.append('name', productData.name)
      formData.append('description', productData.description)
      formData.append('category', productData.category)
      formData.append('sellingprice', productData.price)
      formData.append('warranty', productData.warranty)
      formData.append('returnPolicy', productData.returnPolicy)
      formData.append('hsnCode', productData.hsnCode)

      // Optional fields
      if (productData.slug) formData.append('slug', productData.slug)
      if (productData.sku) formData.append('sku', productData.sku)
      if (productData.brand) formData.append('brand', productData.brand)
      if (productData.colour) formData.append('colour', productData.colour)
      if (productData.size) formData.append('size', productData.size)
      if (productData.specification) formData.append('specification', productData.specification)
      if (productData.mrp) formData.append('mrp', productData.mrp)
      if (productData.discountPrice) formData.append('discountPrice', productData.discountPrice)
      if (productData.stockQuantity) formData.append('stockQuantity', productData.stockQuantity)
      if (productData.stockStatus) formData.append('stockStatus', productData.stockStatus)
      if (productData.weight) formData.append('weight', productData.weight)
      if (productData.dimensions) formData.append('dimensions', productData.dimensions)
      if (productData.variants && productData.variants.length > 0) formData.append('variants', productData.variants.join(','))
      if (productData.tags && productData.tags.length > 0) formData.append('tags', productData.tags.join(','))

      // Supplier (nested object)
      if (productData.supplier) {
        if (productData.supplier.name) formData.append('supplier[name]', productData.supplier.name)
        if (productData.supplier.contact) formData.append('supplier[contact]', productData.supplier.contact)
        if (productData.supplier.email) formData.append('supplier[email]', productData.supplier.email)
      }

      // Shipping (nested object)
      if (productData.shipping) {
        if (productData.shipping.charges) formData.append('shipping[charges]', productData.shipping.charges)
        if (productData.shipping.deliveryTime) formData.append('shipping[deliveryTime]', productData.shipping.deliveryTime)
        if (productData.shipping.restrictions) formData.append('shipping[restrictions]', productData.shipping.restrictions)
      }






      if (productData.images && productData.images.length > 0) {
        productData.images.forEach(image => {
          formData.append('images', image)
        })
      }

      const response = await instance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('Product creation error:', error)

      if (error.message === 'Network Error') {
        throw new Error('Cannot connect to server. Please check if the backend is running.')
      }

      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid product data')
      }

      if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.')
      }

      throw error.response?.data || error
    }
  },

  getProducts: async (filters = {}) => {
    try {
      const response = await instance.get('/products', {
        params: filters
      })
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for products:', error.message)
      return mockProducts
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await instance.put(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getProductById: async (id) => {
    try {
      const response = await instance.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await instance.delete(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}
