// COOLEST Brands — pure vanilla JS

// ============ DATA ============
const CURRENCIES = [
  { code:"BWP", symbol:"P",   country:"Botswana",       flagCode:"bw", rate:1 },
  { code:"ZAR", symbol:"R",   country:"South Africa",   flagCode:"za", rate:1.35 },
  { code:"USD", symbol:"$",   country:"United States",  flagCode:"us", rate:0.073 },
  { code:"EUR", symbol:"€",   country:"Eurozone",       flagCode:"eu", rate:0.068 },
  { code:"GBP", symbol:"£",   country:"United Kingdom", flagCode:"gb", rate:0.058 },
  { code:"NAD", symbol:"N$",  country:"Namibia",        flagCode:"na", rate:1.35 },
  { code:"ZMW", symbol:"ZK",  country:"Zambia",         flagCode:"zm", rate:1.95 },
  { code:"KES", symbol:"KSh", country:"Kenya",          flagCode:"ke", rate:9.5 },
  { code:"NGN", symbol:"₦",   country:"Nigeria",        flagCode:"ng", rate:110 },
];

const CATEGORIES = [
  { slug:"tees",        label:"T-Shirts" },
  { slug:"hoodies",     label:"Hoodies" },
  { slug:"caps",        label:"Caps" },
  { slug:"accessories", label:"Accessories" },
];

const COLORS  = ["Black","White","Grey"];
const SIZES   = ["XS","S","M","L","XL","XXL"];
const GENDERS = ["Men","Women","Unisex"];

const PRODUCTS = [
  { id:"coolest-tee-black",  name:"Coolest Logo Tee — Black",       category:"tees",        price:550 },
  { id:"coolest-tee-white",  name:"Coolest Logo Tee — Off White",   category:"tees",        price:550 },
  { id:"coolest-tee-grey",   name:"Coolest Logo Tee — Grey",        category:"tees",        price:550 },
  { id:"coolest-oversized",  name:"Coolest Oversized Tee — Black",  category:"tees",        price:620 },
  { id:"coolest-boxy-tee",   name:"Coolest Boxy Tee — White",       category:"tees",        price:620 },
  { id:"coolest-hoodie-blk", name:"Coolest Heavyweight Hoodie — Black", category:"hoodies", price:1250 },
  { id:"coolest-hoodie-gry", name:"Coolest Heavyweight Hoodie — Grey",  category:"hoodies", price:1250 },
  { id:"coolest-zip-hoodie", name:"Coolest Zip Hoodie — Black",     category:"hoodies",     price:1450 },
  { id:"coolest-cap-black",  name:"Coolest Monogram Cap — Black",   category:"caps",        price:380 },
  { id:"coolest-cap-white",  name:"Coolest Monogram Cap — White",   category:"caps",        price:380 },
  { id:"coolest-trucker",    name:"Coolest Trucker Cap — Grey",     category:"caps",        price:420 },
  { id:"coolest-tote",       name:"Coolest Canvas Tote",            category:"accessories", price:260 },
];

// Preview imagery: supplied portrait photos are intentionally reused across products.
const PRODUCT_IMAGES = {
  "coolest-tee-black": "assets/coolest-dj.jpeg",
  "coolest-tee-white": "assets/coolest-model.jpeg",
  "coolest-tee-grey": "assets/coolest-dj.jpeg",
  "coolest-oversized": "assets/coolest-model.jpeg",
  "coolest-boxy-tee": "assets/coolest-dj.jpeg",
  "coolest-hoodie-blk": "assets/coolest-hoodieblack.jpeg",
  "coolest-hoodie-gry": "assets/coolest-model.jpeg",
  "coolest-zip-hoodie": "assets/coolest-hoodieblack.jpeg",
  "coolest-cap-black": "assets/coolest-1cap.jpeg",
  "coolest-cap-white": "assets/coolest-1cap.jpeg",
  "coolest-trucker": "assets/coolest-1cap.jpeg",
  "coolest-tote": "assets/coolest-hoodieblack.jpeg",
};

const CATEGORY_IMAGES = {
  tees: "assets/coolest-dj.jpeg",
  hoodies: "assets/coolest-hoodieblack.jpeg",
  caps: "assets/coolest-1cap.jpeg",
  accessories: "assets/coolest-model.jpeg",
};

// ============ STATE ============
const flagUrl = (code) => `https://flagcdn.com/w40/${code}.png`;

function getCurrency(){
  const code = localStorage.getItem("currency") || "BWP";
  return CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
}
function setCurrency(code){
  localStorage.setItem("currency", code);
  location.reload();
}
function formatPrice(bwp){
  const c = getCurrency();
  const v = bwp * c.rate;
  return `${c.symbol} ${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}

const CART_KEY = "coolest-cart-v2";
function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(item){
  const cart = getCart();
  const key = `${item.productId}|${item.color||""}|${item.size||""}|${item.gender||""}`;
  const existing = cart.find(i => `${i.productId}|${i.color||""}|${i.size||""}|${i.gender||""}` === key);
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCart(cart);
  toast("Added to cart");
}
function updateCartCount(){
  const n = getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = n;
    el.style.display = n ? "flex" : "none";
  });
}

// ============ TOAST ============
function toast(msg){
  let el = document.querySelector(".toast");
  if (!el){ el = document.createElement("div"); el.className="toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(()=>el.classList.remove("show"), 1800);
}

// ============ HEADER / FOOTER ============
function renderHeader(){
  const c = getCurrency();
  const currencyMenu = CURRENCIES.map(cur => `
    <button type="button" data-code="${cur.code}">
      <img src="${flagUrl(cur.flagCode)}" alt=""/>
      <span>${cur.code} — ${cur.country}</span>
    </button>`).join("");

  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="brand" aria-label="COOLEST Brands home">
        <img src="assets/logo.png" alt="COOLEST Brands"/>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="index.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="index.html#about">About</a>
      </nav>
      <div class="header-actions">
        <div class="currency">
          <button type="button" class="currency-btn" id="curr-btn" aria-label="Change currency">
            <img src="${flagUrl(c.flagCode)}" alt=""/>
            <span class="code">${c.code}</span>
          </button>
          <div class="currency-menu" id="curr-menu" role="menu">${currencyMenu}</div>
        </div>
        <a href="profile.html" class="icon-btn" aria-label="Profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>
        </a>
        <a href="cart.html" class="icon-btn cart-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-2 10H8L6 6zM6 6L5 3H2M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
          <span class="cart-count">0</span>
        </a>
        <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-drawer" id="mobile-drawer">
    <div class="backdrop" data-close></div>
    <div class="panel">
      <button type="button" class="close" data-close aria-label="Close menu">✕</button>
      <a href="index.html">Home</a>
      <a href="shop.html">Shop All</a>
      <a href="shop.html?category=tees">T-Shirts</a>
      <a href="shop.html?category=hoodies">Hoodies</a>
      <a href="shop.html?category=caps">Caps</a>
      <a href="shop.html?category=accessories">Accessories</a>
      <a href="profile.html">Profile</a>
      <a href="cart.html">Cart</a>
    </div>
  </div>`;
}

function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo.png" alt="COOLEST Brands"/>
        <p>Minimalist streetwear from Botswana. Considered garments in black, white and grey. Established 2017.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2h-3c-3 0-4 2-4 4.5V10H7v4h3v8h3z"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3v3.3A5 5 0 0 0 20 8v3a8 8 0 0 1-4-1.2V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 13 15V3h3z"/></svg></a>
          <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 3h3l-7 8 8 10h-6l-5-6-6 6H2l7-9L1 3h6l4 5 7-5z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="shop.html">All Products</a>
        <a href="shop.html?category=tees">T-Shirts</a>
        <a href="shop.html?category=hoodies">Hoodies</a>
        <a href="shop.html?category=caps">Caps</a>
        <a href="shop.html?category=accessories">Accessories</a>
      </div>
      <div class="footer-col">
        <h4>Account</h4>
        <a href="profile.html">Profile</a>
        <a href="cart.html">Cart</a>
        <a href="checkout.html">Checkout</a>
      </div>
      <div class="footer-col">
        <h4>Info</h4>
        <a href="index.html#about">About</a>
        <a href="#">Contact</a>
        <a href="#">Shipping</a>
        <a href="#">Returns</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} COOLEST Brands</span>
      <span>Est. 2017 · Botswana</span>
    </div>
  </footer>`;
}

function mountShell(){
  const h = document.querySelector("[data-header]");
  const f = document.querySelector("[data-footer]");
  if (h) h.innerHTML = renderHeader();
  if (f) f.innerHTML = renderFooter();

  // Currency dropdown
  const btn = document.getElementById("curr-btn");
  const menu = document.getElementById("curr-menu");
  if (btn && menu){
    btn.addEventListener("click", (e)=>{ e.stopPropagation(); menu.classList.toggle("open"); });
    document.addEventListener("click", ()=>menu.classList.remove("open"));
    menu.querySelectorAll("button").forEach(b => b.addEventListener("click", ()=>setCurrency(b.dataset.code)));
  }

  // Mobile drawer
  const toggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (toggle && drawer){
    toggle.addEventListener("click", ()=>drawer.classList.add("open"));
    drawer.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", ()=>drawer.classList.remove("open")));
    drawer.querySelectorAll(".panel a").forEach(a => a.addEventListener("click", ()=>drawer.classList.remove("open")));
  }

  updateCartCount();
}

// ============ PRODUCT CARD + MODAL ============
function productImage(p){
  const image = PRODUCT_IMAGES[p.id];
  return image
    ? `<img src="${image}" alt="${p.name}"/>`
    : `<div class="placeholder">COOLEST</div>`;
}
function cartProductImage(item){
  const image = PRODUCT_IMAGES[item.productId];
  return image ? `<img src="${image}" alt="${item.name}"/>` : `<div class="placeholder"></div>`;
}
function productCard(p){
  return `
    <div class="product-card" data-product="${p.id}" role="button" tabindex="0">
      <div class="product-media">${productImage(p)}</div>
      <div class="product-info">
        <div class="name">${p.name}</div>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
    </div>`;
}
function bindProductCards(){
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", ()=>openModal(card.dataset.product));
    card.addEventListener("keydown", (e)=>{
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(card.dataset.product); }
    });
  });
}

function openModal(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if (!p) return;
  const isCap = p.category === "caps";
  const isAccessory = p.category === "accessories";
  const noSize = isCap || isAccessory;

  const state = {
    color: COLORS[0],
    size: noSize ? null : SIZES[2],
    gender: noSize ? null : "Unisex",
    qty: 1,
  };

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop open";
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button type="button" class="modal-close" aria-label="Close">✕</button>
      <div class="modal-media">${productImage(p)}</div>
      <div class="modal-body">
        <div class="collection">Coolest Collection</div>
        <h3>${p.name}</h3>
        <div class="price">${formatPrice(p.price)}</div>

        <div class="opt-group">
          <div class="lbl">Color</div>
          <div class="opt-list" data-opt="color">
            ${COLORS.map(c=>`<button type="button" class="chip ${c===state.color?"active":""}" data-val="${c}">${c}</button>`).join("")}
          </div>
        </div>

        ${!noSize ? `
        <div class="opt-group">
          <div class="lbl">Size</div>
          <div class="opt-list" data-opt="size">
            ${SIZES.map(s=>`<button type="button" class="chip ${s===state.size?"active":""}" data-val="${s}">${s}</button>`).join("")}
          </div>
        </div>
        <div class="opt-group">
          <div class="lbl">Fit</div>
          <div class="opt-list" data-opt="gender">
            ${GENDERS.map(g=>`<button type="button" class="chip ${g===state.gender?"active":""}" data-val="${g}">${g}</button>`).join("")}
          </div>
        </div>` : ""}

        <div class="opt-group">
          <div class="lbl">Quantity</div>
          <div class="qty">
            <button type="button" data-q="-1">−</button>
            <span id="qty-val">1</span>
            <button type="button" data-q="1">+</button>
          </div>
        </div>

        <button type="button" class="btn-primary" id="add-btn">Add to Cart · ${formatPrice(p.price)}</button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);
  document.body.style.overflow = "hidden";

  const close = ()=>{ backdrop.remove(); document.body.style.overflow=""; };
  backdrop.addEventListener("click", (e)=>{ if(e.target===backdrop) close(); });
  backdrop.querySelector(".modal-close").addEventListener("click", close);

  backdrop.querySelectorAll(".opt-list").forEach(list => {
    list.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", ()=>{
        list.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
        chip.classList.add("active");
        state[list.dataset.opt] = chip.dataset.val;
      });
    });
  });

  backdrop.querySelectorAll(".qty button").forEach(b => {
    b.addEventListener("click", ()=>{
      state.qty = Math.max(1, state.qty + parseInt(b.dataset.q,10));
      backdrop.querySelector("#qty-val").textContent = state.qty;
      backdrop.querySelector("#add-btn").textContent = `Add to Cart · ${formatPrice(p.price*state.qty)}`;
    });
  });

  backdrop.querySelector("#add-btn").addEventListener("click", ()=>{
    addToCart({
      productId: p.id, name: p.name, price: p.price,
      color: state.color, size: state.size, gender: state.gender, qty: state.qty,
    });
    close();
  });
}

// ============ HERO SLIDESHOW ============
function initHero(){
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const slides = hero.querySelectorAll(".slide");
  if (slides.length < 2) return;
  let i = 0;
  setInterval(()=>{
    slides[i].classList.remove("active");
    i = (i+1) % slides.length;
    slides[i].classList.add("active");
  }, 5000);
}

// ============ RENDER HELPERS ============
function renderProductGrid(selector, list){
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = list.map(productCard).join("");
  bindProductCards();
}

// ============ CART PAGE ============
function renderCartPage(){
  const wrap = document.querySelector("[data-cart]");
  if (!wrap) return;
  const cart = getCart();
  if (!cart.length){
    wrap.innerHTML = `<div class="empty">Your cart is empty. <a href="shop.html" class="link-underline">Shop now</a></div>`;
    return;
  }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  wrap.innerHTML = `
    <div class="cart-list">
      ${cart.map((i,idx)=>`
        <div class="cart-row">
          <div class="thumb">${cartProductImage(i)}</div>
          <div class="info">
            <div class="title">${i.name}</div>
            <div class="meta">${[i.color,i.size,i.gender].filter(Boolean).join(" · ")}</div>
            <div class="meta">${formatPrice(i.price)} × ${i.qty} = ${formatPrice(i.price*i.qty)}</div>
          </div>
          <div class="row-actions">
            <div class="qty">
              <button type="button" data-cart-dec="${idx}">−</button>
              <span>${i.qty}</span>
              <button type="button" data-cart-inc="${idx}">+</button>
            </div>
            <button type="button" data-cart-remove="${idx}" class="link-underline">Remove</button>
          </div>
        </div>`).join("")}
    </div>
    <div class="cart-total"><span>Subtotal</span><span>${formatPrice(total)}</span></div>
    <div class="cart-actions">
      <a href="checkout.html" class="btn-primary" style="display:inline-block;width:auto;padding:16px 32px">Checkout</a>
    </div>`;
  wrap.querySelectorAll("[data-cart-inc]").forEach(b=>b.addEventListener("click",()=>{const c=getCart();c[b.dataset.cartInc].qty++;saveCart(c);renderCartPage();}));
  wrap.querySelectorAll("[data-cart-dec]").forEach(b=>b.addEventListener("click",()=>{const c=getCart();const idx=b.dataset.cartDec;c[idx].qty=Math.max(1,c[idx].qty-1);saveCart(c);renderCartPage();}));
  wrap.querySelectorAll("[data-cart-remove]").forEach(b=>b.addEventListener("click",()=>{const c=getCart();c.splice(b.dataset.cartRemove,1);saveCart(c);renderCartPage();}));
}

// ============ CHECKOUT ============
function renderCheckoutSummary(){
  const sum = document.querySelector("[data-checkout-summary]");
  if (!sum) return;
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping = subtotal > 0 ? 60 : 0;
  const total = subtotal + shipping;
  sum.innerHTML = `
    ${cart.map(i=>`<div class="summary-line"><span>${i.name} × ${i.qty}</span><span>${formatPrice(i.price*i.qty)}</span></div>`).join("")}
    ${cart.length ? "" : `<div class="empty">Cart is empty</div>`}
    <div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    <div class="summary-line"><span>Shipping</span><span>${formatPrice(shipping)}</span></div>
    <div class="summary-line total"><span>Total</span><span>${formatPrice(total)}</span></div>
  `;
  const form = document.querySelector("[data-checkout-form]");
  if (form){
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      if (!cart.length){ toast("Cart is empty"); return; }
      saveCart([]);
      toast("Order placed — thank you!");
      setTimeout(()=>{ location.href = "index.html"; }, 1200);
    });
  }
}

// ============ BOOT ============
document.addEventListener("DOMContentLoaded", ()=>{
  mountShell();
  initHero();

  // Home page — featured
  if (document.querySelector("[data-featured]")){
    renderProductGrid("[data-featured]", PRODUCTS.slice(0,8));
  }

  // Home — categories
  const catGrid = document.querySelector("[data-categories]");
  if (catGrid){
    catGrid.innerHTML = CATEGORIES.map(c=>`
      <a href="shop.html?category=${c.slug}" class="cat-card">
        <img src="${CATEGORY_IMAGES[c.slug]}" alt="${c.label}"/>
        <h3>${c.label}</h3>
        <span class="go">Shop ${c.label}</span>
      </a>`).join("");
  }

  // Shop page
  const shopGrid = document.querySelector("[data-shop]");
  if (shopGrid){
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const list = cat ? PRODUCTS.filter(p=>p.category===cat) : PRODUCTS;
    const label = cat ? (CATEGORIES.find(c=>c.slug===cat)?.label || "Shop") : "All Products";
    const titleEl = document.querySelector("[data-shop-title]");
    if (titleEl) titleEl.textContent = label;

    const pills = document.querySelector("[data-shop-pills]");
    if (pills){
      pills.innerHTML = `
        <a class="pill ${!cat?"active":""}" href="shop.html">All</a>
        ${CATEGORIES.map(c=>`<a class="pill ${cat===c.slug?"active":""}" href="shop.html?category=${c.slug}">${c.label}</a>`).join("")}`;
    }
    renderProductGrid("[data-shop]", list);
  }

  renderCartPage();
  renderCheckoutSummary();
});
