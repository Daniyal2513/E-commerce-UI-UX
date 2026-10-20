import { useEffect, useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  type: string
  price: number
  image: string
  alternate: string
  color: string
  size: string[]
  fit: string
}

const images = {
  hero: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?auto=format&fit=crop&w=2200&q=90',
  womens: 'https://images.unsplash.com/photo-1637536701369-f815af927b59?auto=format&fit=crop&w=1200&q=88',
  mens: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?auto=format&fit=crop&w=1400&q=88',
  accessories: 'https://images.unsplash.com/photo-1752074209040-fe824e77ed95?auto=format&fit=crop&w=1000&q=88',
}

const products: Product[] = [
  {
    id: 1,
    name: 'Sculpted Wool Coat',
    type: 'Outerwear / 001',
    price: 1240,
    image: 'https://images.unsplash.com/photo-1638612912996-5e2a2006f5df?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1743076850823-47f2d0a27bb5?auto=format&fit=crop&w=900&q=88',
    color: 'Black',
    size: ['S', 'M', 'L'],
    fit: 'Oversized',
  },
  {
    id: 2,
    name: 'Axis Tailored Jacket',
    type: 'Tailoring / 002',
    price: 890,
    image: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1645996830718-127f7e4f74fc?auto=format&fit=crop&w=900&q=88',
    color: 'Grey',
    size: ['XS', 'S', 'M'],
    fit: 'Regular',
  },
  {
    id: 3,
    name: 'Void Column Dress',
    type: 'Dresses / 003',
    price: 720,
    image: 'https://images.unsplash.com/photo-1637536701369-f815af927b59?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1621036570283-e270d46d3901?auto=format&fit=crop&w=900&q=88',
    color: 'Black',
    size: ['XS', 'S', 'M', 'L'],
    fit: 'Slim',
  },
  {
    id: 4,
    name: 'Chrome Frame Bag',
    type: 'Accessories / 004',
    price: 460,
    image: 'https://images.unsplash.com/photo-1752074209950-d9b57741af98?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1752074210124-da9eb03e4598?auto=format&fit=crop&w=900&q=88',
    color: 'Silver',
    size: ['OS'],
    fit: 'Structured',
  },
  {
    id: 5,
    name: 'Drape Sleeve Blouse',
    type: 'Shirting / 005',
    price: 540,
    image: 'https://images.unsplash.com/photo-1659522761084-79196b64abe4?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1734106741491-8a3966a977d1?auto=format&fit=crop&w=900&q=88',
    color: 'White',
    size: ['S', 'M', 'L'],
    fit: 'Oversized',
  },
  {
    id: 6,
    name: 'Monolith Wide Trouser',
    type: 'Trousers / 006',
    price: 610,
    image: 'https://images.unsplash.com/photo-1645996830718-127f7e4f74fc?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1552393700-42696fb89bfa?auto=format&fit=crop&w=900&q=88',
    color: 'Grey',
    size: ['XS', 'S', 'M', 'L'],
    fit: 'Relaxed',
  },
  {
    id: 7,
    name: 'Asymmetric Silk Dress',
    type: 'Dresses / 007',
    price: 940,
    image: 'https://images.unsplash.com/photo-1621036570330-03534427225f?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1508964801641-4b2410705b73?auto=format&fit=crop&w=900&q=88',
    color: 'Black',
    size: ['XS', 'S', 'M'],
    fit: 'Slim',
  },
  {
    id: 8,
    name: 'Arc Sterling Earring',
    type: 'Jewellery / 008',
    price: 280,
    image: 'https://images.unsplash.com/photo-1711462579127-d25e6ea88244?auto=format&fit=crop&w=900&q=88',
    alternate: 'https://images.unsplash.com/photo-1752074210426-d13ada5ae054?auto=format&fit=crop&w=900&q=88',
    color: 'Silver',
    size: ['OS'],
    fit: 'Structured',
  },
]

function Icon({ name }: { name: 'search' | 'user' | 'bag' | 'close' | 'arrow' | 'menu' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke' as const }
  if (name === 'search') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" {...common} /><path d="m15.5 15.5 5 5" {...common} /></svg>
  if (name === 'user') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" {...common} /><path d="M5 21c.6-4 3-6 7-6s6.4 2 7 6" {...common} /></svg>
  if (name === 'bag') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7.5h15l-1 13h-13l-1-13Z" {...common} /><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" {...common} /></svg>
  if (name === 'close') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M20 4 4 20" {...common} /></svg>
  if (name === 'menu') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 17h18" {...common} /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 5l7 7-7 7" {...common} /></svg>
}

function AppButton({
  children,
  className = '',
  onClick,
  label,
  type = 'button',
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  label?: string
  type?: 'button' | 'submit'
}) {
  return <button type={type} className={className} onClick={onClick} aria-label={label}>{children}</button>
}

function Filter({
  label,
  options,
  value,
  setValue,
}: {
  label: string
  options: string[]
  value: string
  setValue: (value: string) => void
}) {
  return (
    <label className={`filter ${value !== 'All' ? 'active' : ''}`}>
      <span>{label}</span>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        <option>All</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [size, setSize] = useState('All')
  const [color, setColor] = useState('All')
  const [fit, setFit] = useState('All')
  const [price, setPrice] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.body.style.overflow = searchOpen || cartOpen || mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [searchOpen, cartOpen, mobileOpen])

  const visibleProducts = useMemo(() => {
    let next = products.filter((product) =>
      (size === 'All' || product.size.includes(size)) &&
      (color === 'All' || product.color === color) &&
      (fit === 'All' || product.fit === fit) &&
      (price === 'All' || (price === 'Under $500' ? product.price < 500 : price === '$500–$800' ? product.price >= 500 && product.price <= 800 : product.price > 800)),
    )
    if (sort === 'Price low') next = [...next].sort((a, b) => a.price - b.price)
    if (sort === 'Price high') next = [...next].sort((a, b) => b.price - a.price)
    return next
  }, [size, color, fit, price, sort])

  const searchResults = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
  const addToCart = (product: Product) => {
    setCart((current) => [...current, product])
    setNotice(`${product.name} added`)
    window.setTimeout(() => setNotice(''), 1800)
  }

  return (
    <main>
      <header className="header" onMouseLeave={() => setMenuOpen(false)}>
        <div className="nav-shell">
          <div className="nav-left desktop-nav">
            <AppButton className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>Shop <span>+</span></AppButton>
            <a href="#categories" className="nav-link">Collections</a>
            <a href="#campaign" className="nav-link">Campaigns</a>
            <a href="#footer" className="nav-link">Archive</a>
          </div>
          <AppButton className="mobile-menu" onClick={() => setMobileOpen(true)} label="Open menu"><Icon name="menu" /></AppButton>
          <a href="#" className="wordmark" aria-label="Ostra home">OSTRA</a>
          <div className="nav-actions">
            <AppButton className="icon-button" onClick={() => setSearchOpen(true)} label="Search"><Icon name="search" /></AppButton>
            <AppButton className="icon-button desktop-icon" label="Account"><Icon name="user" /></AppButton>
            <AppButton className="icon-button bag-button" onClick={() => setCartOpen(true)} label="Cart">
              <Icon name="bag" /><span>{String(cart.length).padStart(2, '0')}</span>
            </AppButton>
          </div>
        </div>
        <div className={`mega-menu ${menuOpen ? 'open' : ''}`}>
          <div>
            <p className="eyebrow">Shop by category</p>
            {['New arrivals', 'Outerwear', 'Tailoring', 'Knitwear', 'Accessories'].map((item, index) => (
              <a href="#shop" key={item}><span>0{index + 1}</span>{item}</a>
            ))}
          </div>
          <div className="mega-feature">
            <img src={images.womens} alt="Model in black dress" />
            <p>Edition 04 / The void</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <img src={images.hero} alt="Model wearing sculptural black outerwear" />
        <div className="hero-meta"><span>Edition 04</span><span>Spring / Summer 2025</span></div>
        <div className="hero-copy">
          <p className="eyebrow">New collection / 2025</p>
          <h1>FORM<br />WITHOUT<br />NOISE</h1>
          <a href="#shop" className="primary-cta">Shop the collection <Icon name="arrow" /></a>
        </div>
        <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
      </section>

      <section className="manifesto" id="campaign">
        <div className="section-number">01 — Manifesto</div>
        <p>Clothing reduced to its most essential form. A study in volume, tension, and the space between.</p>
        <a href="#categories">Discover the collection <Icon name="arrow" /></a>
      </section>

      <section className="categories" id="categories">
        <div className="category category-womens">
          <img src={images.womens} alt="Woman in a minimal black dress" />
          <div className="category-label"><span>01</span><h2>WOMENS</h2><a href="#shop">Explore collection <Icon name="arrow" /></a></div>
        </div>
        <div className="category category-mens">
          <img src={images.mens} alt="Person wearing a structured black suit" />
          <div className="category-label"><span>02</span><h2>MENS</h2><a href="#shop">Explore collection <Icon name="arrow" /></a></div>
        </div>
        <div className="category category-accessories">
          <img src={images.accessories} alt="Editorial silver handbag" />
          <div className="category-label"><span>03</span><h2>OBJECTS</h2><a href="#shop">Explore collection <Icon name="arrow" /></a></div>
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="shop-heading">
          <div><p className="eyebrow">02 — Selected objects</p><h2>NEW ARRIVALS</h2></div>
          <p>An edited study of shape and utility.<br />Designed in London, made in limited numbers.</p>
        </div>
        <div className="filter-bar">
          <div className="filters">
            <Filter label="Size" options={['XS', 'S', 'M', 'L', 'OS']} value={size} setValue={setSize} />
            <Filter label="Color" options={['Black', 'White', 'Grey', 'Silver']} value={color} setValue={setColor} />
            <Filter label="Fit" options={['Slim', 'Regular', 'Relaxed', 'Oversized', 'Structured']} value={fit} setValue={setFit} />
            <Filter label="Price" options={['Under $500', '$500–$800', 'Over $800']} value={price} setValue={setPrice} />
          </div>
          <label className="sort">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price low</option><option>Price high</option></select></label>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <img className="alternate" src={product.alternate} alt="" />
                <div className="product-index">{String(product.id).padStart(2, '0')}</div>
                <AppButton className="quick-add" onClick={() => addToCart(product)}>Quick add <span>+</span></AppButton>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.type}</p></div><span>${product.price.toLocaleString()}</span></div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && <div className="empty-state">No pieces match this study. Adjust the filters.</div>}
      </section>

      <section className="editorial">
        <img src="https://images.unsplash.com/photo-1734106741491-8a3966a977d1?auto=format&fit=crop&w=1800&q=88" alt="Model in an architectural white garment" />
        <div className="editorial-copy"><span>Campaign 04 / 25</span><h2>THE<br />ABSENCE<br />OF EXCESS</h2><a href="#shop">View campaign <Icon name="arrow" /></a></div>
      </section>

      <footer id="footer">
        <div className="footer-top">
          <div className="newsletter">
            <p className="eyebrow">Private list</p>
            <h2>ENTER THE<br />OSTRA WORLD.</h2>
            <form onSubmit={(event) => { event.preventDefault(); setNotice('You are now on the private list') }}>
              <input type="email" required placeholder="Email address" aria-label="Email address" />
              <AppButton type="submit" label="Join newsletter"><Icon name="arrow" /></AppButton>
            </form>
            <small>By subscribing, you agree to our privacy policy.</small>
          </div>
          <div className="footer-links">
            <div><p>Client services</p><a href="#">Contact</a><a href="#">Delivery & returns</a><a href="#">Care guide</a><a href="#">Size guide</a></div>
            <div><p>Ostra</p><a href="#">About</a><a href="#">Stockists</a><a href="#">Journal</a><a href="#">Careers</a></div>
            <div><p>Follow</p><a href="#">Instagram ↗</a><a href="#">Pinterest ↗</a><a href="#">Vimeo ↗</a></div>
          </div>
        </div>
        <div className="footer-wordmark">OSTRA</div>
        <div className="footer-bottom"><span>© 2025 Ostra Studio</span><div><a href="#">Privacy</a><a href="#">Terms</a></div><span>London / 14:32 GMT</span></div>
      </footer>

      <div className={`overlay search-overlay ${searchOpen ? 'visible' : ''}`} aria-hidden={!searchOpen}>
        <div className="overlay-top"><span>Search the collection</span><AppButton className="icon-button" onClick={() => setSearchOpen(false)} label="Close search"><Icon name="close" /></AppButton></div>
        <div className="search-field"><input autoFocus={searchOpen} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="TYPE TO SEARCH" /><span>{String(search ? searchResults.length : 0).padStart(2, '0')}</span></div>
        {search && <div className="search-results">{searchResults.slice(0, 4).map((product) => <a href="#shop" onClick={() => setSearchOpen(false)} key={product.id}><img src={product.image} alt="" /><span>{product.name}<small>${product.price}</small></span></a>)}</div>}
        <div className="search-suggestions"><span>Suggested</span>{['New arrivals', 'Tailoring', 'Black dresses', 'Edition 04'].map((item) => <button key={item} onClick={() => setSearch(item)}>{item}</button>)}</div>
      </div>

      <div className={`drawer-backdrop ${cartOpen ? 'visible' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? 'visible' : ''}`}>
        <div className="drawer-header"><span>Shopping bag ({String(cart.length).padStart(2, '0')})</span><AppButton className="icon-button" onClick={() => setCartOpen(false)} label="Close cart"><Icon name="close" /></AppButton></div>
        <div className="cart-content">
          {cart.length === 0 ? <div className="empty-cart"><p>Your bag is currently empty.</p><AppButton onClick={() => { setCartOpen(false); document.querySelector('#shop')?.scrollIntoView() }}>Explore new arrivals <Icon name="arrow" /></AppButton></div> :
            cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>Black / One size</p><span>${product.price.toLocaleString()}</span><AppButton onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</AppButton></div></div>)}
        </div>
        {cart.length > 0 && <div className="cart-total"><div><span>Subtotal</span><strong>${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</strong></div><p>Shipping and taxes calculated at checkout.</p><AppButton onClick={() => setNotice('Checkout is ready for integration')}>Proceed to checkout <Icon name="arrow" /></AppButton></div>}
      </aside>

      <aside className={`mobile-drawer ${mobileOpen ? 'visible' : ''}`}>
        <div className="drawer-header"><span>Menu</span><AppButton className="icon-button" onClick={() => setMobileOpen(false)} label="Close menu"><Icon name="close" /></AppButton></div>
        <nav>{['Shop', 'Collections', 'Campaigns', 'Archive'].map((item, index) => <a href={item === 'Shop' ? '#shop' : '#categories'} onClick={() => setMobileOpen(false)} key={item}><span>0{index + 1}</span>{item}</a>)}</nav>
        <div className="mobile-drawer-bottom"><a href="#">Account</a><span>London / GBP</span></div>
      </aside>
      {notice && <div className="notice">{notice}</div>}
    </main>
  )
}
