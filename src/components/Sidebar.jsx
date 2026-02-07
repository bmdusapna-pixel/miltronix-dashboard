import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  MdDashboard,
  MdShoppingBag,
  MdCategory,
  MdShoppingCart,
  MdReceipt,
  MdSettings,
  MdPerson,
  MdPersonPin,
  MdGroup,
  MdSecurity,
  MdNotificationAdd,
  MdReceiptLong,
  MdRoomService,
  MdElectricalServices,
  MdMiscellaneousServices,
  MdArticle,
  MdViewCarousel,
  MdAdminPanelSettings,
  MdChevronLeft,
  MdChevronRight,
  MdCardGiftcard
} from 'react-icons/md'

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const location = useLocation()


  const isActive = (path) => location.pathname === path

  const closeMenus = () => setOpenMenu(null)

  return (
    <div
      className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <span><img className="logo-image" src="https://dapper-maamoul-8bc20d.netlify.app/image/Mittronix-logo-black.png" alt="Logo" /></span>
          </div>
          {!isCollapsed && <span className="logo-text">Mittronix</span>}
        </div>
      </div>

      <div className="sidebar-section">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`nav-item ${isActive('/dashboard') || isActive('/') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdDashboard size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Dashboard</span>}
        </Link>

        {/* Products */}
        <Link
          to="/products/list"
          className={`nav-item ${location.pathname.startsWith('/products') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdShoppingBag size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Products</span>}
        </Link>

        {/* Categories */}
        <Link
          to="/categories/list"
          className={`nav-item ${location.pathname.startsWith('/categories') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdCategory size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Categories</span>}
        </Link>

        {/* Brands */}
        <Link
          to="/brands/list"
          className={`nav-item ${location.pathname.startsWith('/brands') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdGroup size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Brands</span>}
        </Link>

        {/* Inventory */}
        <Link
          to="/inventory"
          className={`nav-item ${isActive('/inventory') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdShoppingCart size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Inventory</span>}
        </Link>

        {/* Orders */}
        <Link
          to="/orders/list"
          className={`nav-item ${location.pathname.startsWith('/orders') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdReceiptLong size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Orders</span>}
        </Link>

        {/* Invoices */}
        <Link
          to="/invoices/list"
          className={`nav-item ${location.pathname.startsWith('/invoices') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdReceipt size={20} />
          </span>
          {!isCollapsed && <span className='nav-text'>Invoices</span>}
        </Link>
        {/* Coupons */}
        <div className="nav-dropdown"
          onMouseLeave={closeMenus}
        >
          <button
            className={`nav-item sidebar-accordion-btn ${openMenu === 'coupons' ? 'active' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'coupons' ? null : 'coupons')}
          >
            <span className="nav-icon">
              <MdCardGiftcard size={20} />
            </span>
            {!isCollapsed && <span className="nav-text">Coupons</span>}
          </button>

          {openMenu === 'coupons' && (
            <div className="nav-submenu">
              <Link
                to="/coupons/list"
                className={`nav-subitem ${isActive('/coupons/list') ? 'active' : ''}`}
              >
                All Coupons
              </Link>

              <Link
                to="/coupons/create"
                className={`nav-subitem ${isActive('/coupons/create') ? 'active' : ''}`}
              >
                Add Coupon
              </Link>
              <Link
                to="/coupons/analystics"
                className={`nav-subitem ${isActive('/coupons/analystics') ? 'active' : ''}`}
              >
                Coupon Analystics
              </Link>
            </div>
          )}
        </div>

        {/*Customer*/}
        <div className="nav-dropdown" onMouseLeave={closeMenus}>
          <button
            className={`nav-item sidebar-accordion-btn ${openMenu === 'customer' ? 'active' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'customer' ? null : 'customer')}
          >
            <span className="nav-icon">
              <MdGroup size={20} />
            </span>
            {!isCollapsed && <span className="nav-text">Customer</span>}
          </button>

          {openMenu === 'customer' && (
            <div className="nav-submenu">
              <Link
                to="/customer/list"
                className={`nav-subitem ${isActive('/customer/list') ? 'active' : ''}`}
              >
                All Customer
              </Link>

              <Link
                to="/customer/refferal"
                className={`nav-subitem ${isActive('/customer/refferal') ? 'active' : ''}`}
              >
                Referral Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          to="/settings"
          className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdSettings size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Settings</span>}
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdNotificationAdd size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Notifications</span>}
        </Link>
        <Link
          to="/profile"
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
          onClick={closeMenus}

        >
          <span className="nav-icon">
            <MdPerson size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Profile</span>}
        </Link>
        <Link
          to="/service-requests"
          className={`nav-item ${location.pathname.startsWith('/service-requests') ? 'active' : ''}`}
          onClick={closeMenus}

        >
          <span className="nav-icon">
            <MdMiscellaneousServices size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Service Requests</span>}
        </Link>

        {/* Blogs */}
        <Link
          to="/blogs"
          className={`nav-item ${location.pathname.startsWith('/blogs') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdArticle size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Blogs</span>}
        </Link>

        {/* Banners */}
        <Link
          to="/banners"
          className={`nav-item ${location.pathname.startsWith('/banners') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdViewCarousel size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Banners</span>}
        </Link>

        {/* Roles */}
        <Link
          to="/roles"
          className={`nav-item ${location.pathname.startsWith('/roles') ? 'active' : ''}`}
          onClick={closeMenus}
        >
          <span className="nav-icon">
            <MdAdminPanelSettings size={20} />
          </span>
          {!isCollapsed && <span className="nav-text">Roles</span>}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
