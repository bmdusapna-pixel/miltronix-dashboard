import { instance } from './axios.config.js'
import { mockCategories } from './mockData.js'

export const categoryService = {
  getCategories: async () => {
    try {
      console.log('Fetching categories from:', instance.defaults.baseURL + 'category')
      const response = await instance.get('/category')
      console.log('Categories response:', response.data)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for categories:', error.message)
      return mockCategories
    }
  },

  getParentCategories: async () => {
    try {
      const response = await instance.get('/category/parent')
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for parent categories:', error.message)
      return mockCategories.filter(category => category.parent === null)
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await instance.post('/category', categoryData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await instance.put(`/category/${id}`, categoryData)
      console.log(categoryData)
    } catch (error) {
      throw error.response?.data || error
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await instance.delete(`/category/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}
