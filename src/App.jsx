import { useMemo, useState } from 'react'
import {
  ArrowRight, Search, ShoppingBag, Star, Plus, Minus, X, Clock3,
  MapPin, Heart, Menu as MenuIcon, CheckCircle2, ChefHat, Bike,
  Leaf, Flame, ChevronRight
} from 'lucide-react'

const categories = [
  { name: 'All dishes', emoji: '🍽️' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Asian', emoji: '🍜' },
  { name: 'Healthy', emoji: '🥗' },
  { name: 'Desserts', emoji: '🍰' },
]

const dishes = [
  { id: 1, name: 'The Classic Smash', category: 'Burgers', price: 890, rating: '4.9', time: '20–25 min', tag: 'BESTSELLER', description: 'Double smashed beef, aged cheddar, house sauce and crisp pickles.', image: 'photo-1568901346375-23c9450c58cd', color: 'peach' },
  { id: 2, name: 'Truffle Mushroom', category: 'Pizza', price: 1290, rating: '4.8', time: '25–30 min', tag: 'CHEF’S PICK', description: 'Wood-fired crust, wild mushrooms, mozzarella and truffle oil.', image: 'photo-1579751626657-72bc17010498', color: 'cream' },
  { id: 3, name: 'Tokyo Salmon Bowl', category: 'Asian', price: 1150, rating: '4.9', time: '20–25 min', tag: 'FRESH DAILY', description: 'Salmon, sushi rice, avocado, edamame and sesame dressing.', image: 'photo-1546069901-ba9599a7e63c', color: 'green' },
  { id: 4, name: 'Green Goddess', category: 'Healthy', price: 760, rating: '4.7', time: '15–20 min', tag: 'LIGHT & FRESH', description: 'Avocado, cucumber, leafy greens, seeds and lemon herb dressing.', image: 'photo-1512621776951-a57141f2eefd', color: 'green' },
  { id: 5, name: 'Crispy Chicken Stack', category: 'Burgers', price: 820, rating: '4.8', time: '20–25 min', tag: 'CROWD FAVOURITE', description: 'Buttermilk fried chicken, slaw, spicy mayo and toasted brioche.', image: 'photo-1606755962773-d324e0a13086', color: 'peach' },
  { id: 6, name: 'Creamy Pesto Pasta', category: 'Asian', price: 990, rating: '4.6', time: '20–25 min', tag: 'COMFORT FOOD', description: 'Silky basil pesto, parmesan, cherry tomatoes and fresh herbs.', image: 'photo-1473093295043-cdd812d0e601', color: 'cream' },
  { id: 7, name: 'Berry Cheesecake', category: 'Desserts', price: 590, rating: '4.9', time: '10–15 min', tag: 'SWEET TREAT', description: 'Velvety cheesecake topped with seasonal berries.', image: 'photo-1533134242443-d4fd215305ad', color: 'peach' },
  { id: 8, name: 'Garden Margherita', category: 'Pizza', price: 1090, rating: '4.7', time: '25–30 min', tag: 'VEGETARIAN', description: 'San Marzano tomato, creamy mozzarella and fragrant basil.', image: 'photo-1574071318508-1cdbab80d002', color: 'cream' },
]

const imageUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`
const money = (value) => `Rs. ${value.toLocaleString('en-PK')}`

function App() {
  const [category, setCategory] = useState('All dishes')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [favourites, setFavourites] = useState([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })

  const filteredDishes = useMemo(() => dishes.filter((dish) => {
    const categoryMatch = category === 'All dishes' || dish.category === category
    const searchMatch = `${dish.name} ${dish.category} ${dish.description}`.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  }), [category, search])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const delivery = subtotal > 0 ? 150 : 0
  const total = subtotal + delivery

  function addToCart(dish) {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id)
      return found
        ? current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...dish, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  function toggleFavourite(id) {
    setFavourites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function placeOrder(event) {
    event.preventDefault()
    setOrderPlaced(true)
    setCart([])
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span className="announcement-dot" /> Freshly made, always worth the wait <span className="announcement-divider">·</span> Free delivery on orders over Rs. 2,500</div>
      <header className="navbar">
        <a href="#home" className="brand" aria-label="FoodNest home">
          <span className="brand-mark"><ChefHat size={23} strokeWidth={2.2} /></span>
          <span>food<span className="brand-accent">nest</span><small>GOOD FOOD, GOOD MOOD</small></span>
        </a>
        <nav className={mobileMenu ? 'nav-links nav-links-open' : 'nav-links'}>
          <a className="nav-link active" href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a className="nav-link" href="#menu" onClick={() => setMobileMenu(false)}>Our menu</a>
          <a className="nav-link" href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
          <a className="nav-link" href="#footer" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button search-toggle" aria-label="Focus search" onClick={() => document.getElementById('food-search')?.focus()}><Search size={19} /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18} /><span>My bag</span><b>{cartCount}</b></button>
          <button className="mobile-menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}><MenuIcon size={22} /></button>
        </div>
      </header>

      <main>
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> GOOD FOOD. BETTER DAYS.</div>
            <h1>A little joy<br />in <em>every bite.</em></h1>
            <p className="hero-description">Thoughtfully made favourites, fresh ingredients, and flavours that bring everyone to the table.</p>
            <div className="hero-actions">
              <a href="#menu" className="primary-button">Explore the menu <ArrowRight size={18} /></a>
              <div className="rating-cluster"><div className="avatar-stack"><span>👩🏻</span><span>👨🏽</span><span>👩🏽</span></div><div><div className="stars"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div><strong>4.9/5 <small>from happy eaters</small></strong></div></div>
            </div>
            <div className="hero-perks"><span><CheckCircle2 size={16} /> Fresh ingredients</span><span><CheckCircle2 size={16} /> Made to order</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src={imageUrl('photo-1568901346375-23c9450c58cd')} alt="Juicy gourmet burger with fresh lettuce and tomato" /></div>
            <div className="hero-sticker"><span>Made with</span><strong>♥</strong><span>extra love</span></div>
            <div className="floating-card"><span className="floating-icon"><Clock3 size={18} /></span><div><strong>Quick delivery</strong><small>At your door in 25 min</small></div><span className="online-dot" /></div>
            <div className="hero-scribble">so good!</div>
          </div>
          <div className="hero-bottom-note"><span>01</span><span className="note-line" /> <span>MADE FRESH, JUST FOR YOU</span></div>
        </section>

        <section className="benefit-strip">
          <div className="container benefit-inner">
            <div className="benefit"><span className="benefit-icon"><Leaf size={21} /></span><div><strong>Fresh, always</strong><small>Good ingredients only</small></div></div>
            <div className="benefit"><span className="benefit-icon"><ChefHat size={21} /></span><div><strong>Made with care</strong><small>Crafted by our chefs</small></div></div>
            <div className="benefit"><span className="benefit-icon"><Bike size={21} /></span><div><strong>At your doorstep</strong><small>Quick, careful delivery</small></div></div>
            <div className="benefit"><span className="benefit-icon"><Heart size={21} /></span><div><strong>Made for you</strong><small>A little joy, every day</small></div></div>
          </div>
        </section>

        <section className="menu-section container" id="menu">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</div><h2>Cravings, <em>covered.</em></h2><p>From first bite to last, find your new favourite.</p></div>
            <a href="#menu" className="text-link" onClick={() => { setCategory('All dishes'); setSearch('') }}>View all dishes <ArrowRight size={17} /></a>
          </div>
          <div className="menu-toolbar">
            <div className="category-list">
              {categories.map((item) => <button key={item.name} className={category === item.name ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(item.name)}><span>{item.emoji}</span>{item.name}</button>)}
            </div>
            <label className="search-field"><Search size={17} /><input id="food-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your favourite..." /><kbd>⌕</kbd></label>
          </div>
          <div className="food-grid">
            {filteredDishes.map((dish) => <article className="food-card" key={dish.id}>
              <div className={`food-image ${dish.color}`}><img src={imageUrl(dish.image)} alt={dish.name} loading="lazy" /><span className="food-tag">{dish.tag}</span><button className={favourites.includes(dish.id) ? 'favourite-button is-favourite' : 'favourite-button'} aria-label={`Favourite ${dish.name}`} onClick={() => toggleFavourite(dish.id)}><Heart size={17} fill={favourites.includes(dish.id) ? 'currentColor' : 'none'} /></button></div>
              <div className="food-info"><div className="food-meta"><span><Star size={13} fill="currentColor" /> {dish.rating}</span><span><Clock3 size={13} /> {dish.time}</span></div><h3>{dish.name}</h3><p>{dish.description}</p><div className="food-card-bottom"><strong className="food-price">{money(dish.price)}</strong><button className="add-button" aria-label={`Add ${dish.name} to bag`} onClick={() => addToCart(dish)}><Plus size={18} /></button></div></div>
            </article>)}
          </div>
          {filteredDishes.length === 0 && <div className="empty-results"><span>🥣</span><h3>No dishes found just yet</h3><p>Try another search or choose a different category.</p><button className="primary-button" onClick={() => { setSearch(''); setCategory('All dishes') }}>Show all dishes <ArrowRight size={17} /></button></div>}
          <div className="menu-bottom"><span>GOOD FOOD IS ALWAYS A GOOD IDEA <span className="tiny-heart">♥</span></span><span>{filteredDishes.length} delicious reasons to stay</span></div>
        </section>

        <section className="story-section" id="story"><div className="container story-inner"><div className="story-image"><img src={imageUrl('photo-1556911220-e15b29be8c8f')} alt="Fresh ingredients being prepared in a kitchen" loading="lazy" /><div className="story-image-label"><span>FROM OUR KITCHEN</span><strong>With a little<br /><em>extra love.</em></strong></div></div><div className="story-copy"><div className="eyebrow"><span className="eyebrow-line" /> A SEAT AT OUR TABLE</div><h2>Food tastes better<br />when it feels like <em>home.</em></h2><p>We believe the best meals aren't just about what's on the plate. They're about fresh ingredients, the hands that make them, and the little moments that bring us together.</p><p>That's why every FoodNest dish is prepared to order, with care in every detail and a whole lot of heart.</p><a href="#menu" className="text-link">Find your favourite <ArrowRight size={17} /></a><div className="story-signoff"><span className="signoff-mark">fn.</span><span>Made with love, always.<small>— The FoodNest family</small></span></div></div></div></section>

        <section className="closing-cta container"><div><span className="cta-sparkle">✳</span><h2>Good food is<br /><em>calling your name.</em></h2><p>Your next favourite is only a few clicks away.</p></div><a href="#menu" className="primary-button">Let's get eating <ArrowRight size={18} /></a><div className="cta-decoration">yum<br />yum!</div></section>
      </main>

      <footer id="footer" className="footer"><div className="container footer-main"><a href="#home" className="brand footer-brand"><span className="brand-mark"><ChefHat size={23} /></span><span>food<span className="brand-accent">nest</span><small>GOOD FOOD, GOOD MOOD</small></span></a><p>Good food, good mood, and a little<br />something to look forward to.</p><div className="footer-links"><a href="#home">Home</a><a href="#menu">Our menu</a><a href="#story">Our story</a><a href="mailto:hello@foodnest.example">Get in touch</a></div><div className="footer-location"><MapPin size={16} /><span>Made fresh, delivered with love<br /><small>Pakistan</small></span></div></div><div className="container footer-bottom"><span>© 2026 FoodNest. Made with <span className="tiny-heart">♥</span> and good ingredients.</span><span>Fresh food. Happy hearts.</span></div></footer>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><aside className="side-panel" aria-label="Shopping bag"><div className="panel-header"><div><span className="eyebrow">YOUR GOOD STUFF</span><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={21} /></button></div>{cart.length === 0 ? <div className="empty-cart"><span>🛍️</span><h3>Your bag is taking a little nap.</h3><p>Add something delicious and we'll take it from there.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore the menu <ArrowRight size={17} /></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={imageUrl(item.image)} alt={item.name} /><div className="cart-item-info"><strong>{item.name}</strong><span>{money(item.price)}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><strong className="cart-item-total">{money(item.price * item.quantity)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{money(delivery)}</strong></div>{subtotal < 2500 && <p className="delivery-hint">Add {money(2500 - subtotal)} more for free delivery.</p>}<div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary-button checkout-button" onClick={() => { setCheckoutOpen(true); setCartOpen(false); setOrderPlaced(false) }}>Continue to checkout <ArrowRight size={18} /></button><p className="secure-note">♡ Good food is on its way.</p></div></>}</aside></div>}

      {checkoutOpen && <div className="overlay checkout-overlay"><section className="checkout-modal"><div className="panel-header"><div><span className="eyebrow">ALMOST THERE</span><h2>{orderPlaced ? 'Order received!' : 'Delivery details'}</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X size={21} /></button></div>{orderPlaced ? <div className="order-success"><CheckCircle2 size={54} /><h3>Thanks, {customer.name.split(' ')[0] || 'foodie'}!</h3><p>Your demo order has been placed successfully. This starter project does not send real orders to a restaurant.</p><div className="success-total"><span>Order total</span><strong>{money(total)}</strong></div><button className="primary-button" onClick={() => { setCheckoutOpen(false); setCartOpen(false); setCustomer({ name: '', phone: '', address: '' }) }}>Back to FoodNest <ArrowRight size={18} /></button></div> : <form className="checkout-form" onSubmit={placeOrder}><p className="checkout-intro">Where should we bring all that goodness?</p><label>Full name<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Your name" /></label><label>Phone number<input required type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="03XX XXXXXXX" /></label><label>Delivery address<textarea required rows="3" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="House, street, area, city" /></label><div className="checkout-total"><span>Total to pay (demo)</span><strong>{money(total)}</strong></div><button className="primary-button checkout-button" type="submit">Place demo order <ArrowRight size={18} /></button><p className="secure-note">Demo checkout only — no payment is collected.</p></form>}</section></div>}
    </div>
  )
}

export default App
