// script.js — Complete BaZi & Material List Implementation

// —— 干支与五行映射 ——
const HEAVENLY_STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const EARTHLY_BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ELEMENT_MAP = {
  '甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth',
  '庚':'Metal','辛':'Metal','壬':'Water','癸':'Water',
  '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth',
  '巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'
};
const CH_ELEMENT = {
  Wood: '木 (Wood)',
  Fire: '火 (Fire)',
  Earth: '土 (Earth)',
  Metal: '金 (Metal)',
  Water: '水 (Water)'
};

// —— 产品数据库 ——
const products = [
  // Wood Element Products
  { 
    id: 'green-phantom-quartz', 
    name: 'Green Phantom Quartz', 
    chineseName: '绿幽灵水晶',
    meaning: 'Enhances career and wealth', 
    element: 'Wood', 
    colors: ['Green', 'Teal', 'Emerald'],
    image: 'images/GreenPhantomQuartz.png',
    price: 25.00,
    description: 'A powerful crystal that enhances career success and attracts wealth through its connection to the Wood element.'
  },
  { 
    id: 'peach-wood', 
    name: 'Peach Wood', 
    chineseName: '桃木',
    meaning: 'Wards off evil spirits', 
    element: 'Wood', 
    colors: ['Brown', 'Beige'],
    image: 'images/PeachWood.png',
    price: 15.00,
    description: 'Traditional Chinese wood known for its protective properties against negative energies.'
  },
  { 
    id: 'hainan-agarwood', 
    name: 'Hainan Agarwood', 
    chineseName: '海南沉香',
    meaning: 'Calms the mind and body', 
    element: 'Wood', 
    colors: ['Brown', 'Dark Brown'],
    image: 'images/HainanAgarwood.png',
    price: 45.00,
    description: 'Premium agarwood from Hainan, known for its calming and meditative properties.'
  },
  { 
    id: 'green-sandalwood', 
    name: 'Green Sandalwood', 
    chineseName: '绿檀木',
    meaning: 'Brings tranquility and spiritual growth', 
    element: 'Wood', 
    colors: ['Green', 'Dark Green'],
    image: 'images/GreenSandalwood.png',
    price: 20.00,
    description: 'Sacred wood that promotes spiritual growth and inner peace.'
  },
  
  // Fire Element Products
  { 
    id: 'alashan-agate', 
    name: 'Alashan Agate', 
    chineseName: '阿拉善玛瑙',
    meaning: 'Enhances vitality and courage', 
    element: 'Fire', 
    colors: ['Red', 'Orange', 'Coral'],
    image: 'images/AlashanAgate.png',
    price: 30.00,
    description: 'Vibrant agate that boosts energy, courage, and personal power.'
  },
  { 
    id: 'red-agate', 
    name: 'Red Agate', 
    chineseName: '红玛瑙',
    meaning: 'Boosts confidence and courage', 
    element: 'Fire', 
    colors: ['Red', 'Pink'],
    image: 'images/RedAgate.png',
    price: 18.00,
    description: 'Stimulates confidence and courage through its fiery energy.'
  },
  { 
    id: 'rose-quartz', 
    name: 'Rose Quartz', 
    chineseName: '粉水晶',
    meaning: 'Encourages love and compassion', 
    element: 'Fire', 
    colors: ['Pink', 'Rose'],
    image: 'images/PinkCristal.png',
    price: 22.00,
    description: 'The stone of love that opens the heart chakra and attracts loving relationships.'
  },
  
  // Earth Element Products
  { 
    id: 'xinjiang-old-yellow-jade', 
    name: 'Xinjiang Old Yellow Jade', 
    chineseName: '新疆老黄玉',
    meaning: 'Brings stability and protection', 
    element: 'Earth', 
    colors: ['Yellow', 'Gold', 'Amber'],
    image: 'images/XinjiangOldYellowJade.png',
    price: 65.00,
    description: 'Ancient jade that provides grounding energy and protection.'
  },
  { 
    id: 'xinjiang-hetian-jade', 
    name: 'Xinjiang Hetian Jade', 
    chineseName: '新疆和田玉',
    meaning: 'Symbolizes purity and moral integrity', 
    element: 'Earth', 
    colors: ['White', 'Cream', 'Beige'],
    image: 'images/XinjiangHetianJade.png',
    price: 85.00,
    description: 'Premium jade known as the "king of jades" for its purity and spiritual properties.'
  },
  { 
    id: 'shoushan-imperial-stone', 
    name: 'Shoushan Imperial Stone', 
    chineseName: '寿山石帝王石',
    meaning: 'Attracts wealth and prosperity', 
    element: 'Earth', 
    colors: ['Yellow', 'Gold', 'Brown'],
    image: 'images/ShoushanImperialStone.png',
    price: 55.00,
    description: 'Imperial stone that attracts wealth and prosperity through its royal energy.'
  },
  
  // Metal Element Products
  { 
    id: 'white-cats-eye', 
    name: 'White Cat\'s Eye Stone', 
    chineseName: '白猫眼石',
    meaning: 'Enhances intuition and insight', 
    element: 'Metal', 
    colors: ['White', 'Silver', 'Gray'],
    image: 'images/WhiteCatEyeStone.png',
    price: 35.00,
    description: 'Mystical stone that enhances intuition and provides spiritual insight.'
  },
  { 
    id: 'sheep-fat-white-jade', 
    name: 'Sheep Fat White Jade', 
    chineseName: '羊脂白玉',
    meaning: 'Symbolizes purity and nobility', 
    element: 'Metal', 
    colors: ['White', 'Cream'],
    image: 'images/SheepFatWhiteJade.png',
    price: 95.00,
    description: 'The purest form of jade, symbolizing nobility and spiritual purity.'
  },
  
  // Water Element Products
  { 
    id: 'south-africa-blue-lace-agate', 
    name: 'South African Blue Lace Agate', 
    chineseName: '南非蓝纹玉',
    meaning: 'Promotes communication and clarity', 
    element: 'Water', 
    colors: ['Blue', 'Light Blue', 'Teal'],
    image: 'images/SouthAfricaBlueLaceAgate.png',
    price: 28.00,
    description: 'Beautiful agate that enhances communication and mental clarity.'
  },
  { 
    id: 'obsidian', 
    name: 'Obsidian', 
    chineseName: '黑曜石',
    meaning: 'Protects against negativity', 
    element: 'Water', 
    colors: ['Black', 'Dark Blue'],
    image: 'images/Obsidian.png',
    price: 15.00,
    description: 'Powerful protective stone that shields against negative energies.'
  }
];

// Legacy materials array for backward compatibility
const materials = products;

// 月令主气（简化旺衰：得令看月支五行）
const MONTH_COMMAND = {
  寅: 'Wood', 卯: 'Wood',
  巳: 'Fire', 午: 'Fire',
  申: 'Metal', 酉: 'Metal',
  亥: 'Water', 子: 'Water',
  辰: 'Earth', 戌: 'Earth', 丑: 'Earth', 未: 'Earth'
};

function isYangStem(stem) {
  return HEAVENLY_STEMS.indexOf(stem) % 2 === 0;
}

/**
 * 四柱排盘：委托 lunar-javascript（CDN 全局 Solar）
 * 文档: https://github.com/6tail/lunar-javascript
 */
function calculateBaZi(dt) {
  if (typeof Solar === 'undefined') {
    throw new Error('lunar-javascript failed to load (Solar is undefined)');
  }
  const solar = Solar.fromYmdHms(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate(),
    dt.getHours(),
    dt.getMinutes(),
    dt.getSeconds() || 0
  );
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();
  return {
    year: eightChar.getYear(),
    month: eightChar.getMonth(),
    day: eightChar.getDay(),
    hour: eightChar.getTime(),
    ganZhi: eightChar.getDay(),
    star: typeof lunar.getXiu === 'function' ? lunar.getXiu() : '',
    tenGods: {
      year: eightChar.getYearShiShenGan(),
      month: eightChar.getMonthShiShenGan(),
      day: eightChar.getDayShiShenGan(),
      hour: eightChar.getTimeShiShenGan()
    },
    naYin: {
      year: eightChar.getYearNaYin(),
      month: eightChar.getMonthNaYin(),
      day: eightChar.getDayNaYin(),
      hour: eightChar.getTimeNaYin()
    }
  };
}

// —— 五行生克关系 ——
const ELEMENT_RELATIONS = {
  Wood: { generated_by: 'Water', generates: 'Fire', restricted_by: 'Metal', restricts: 'Earth' },
  Fire: { generated_by: 'Wood', generates: 'Earth', restricted_by: 'Water', restricts: 'Metal' },
  Earth: { generated_by: 'Fire', generates: 'Metal', restricted_by: 'Wood', restricts: 'Water' },
  Metal: { generated_by: 'Earth', generates: 'Water', restricted_by: 'Fire', restricts: 'Wood' },
  Water: { generated_by: 'Metal', generates: 'Wood', restricted_by: 'Earth', restricts: 'Fire' }
};

// —— 五行对应的颜色和数字 ——
const ELEMENT_COLORS = {
  Wood: ['Green', 'Teal', 'Emerald', 'Dark Green'],
  Fire: ['Red', 'Orange', 'Pink', 'Purple', 'Coral', 'Rose'],
  Earth: ['Yellow', 'Brown', 'Beige', 'Amber'],
  Metal: ['White', 'Silver', 'Gray', 'Platinum', 'Gold', 'Cream'],
  Water: ['Black', 'Dark Blue', 'Navy', 'Midnight Blue', 'Blue', 'Light Blue']
};

const ELEMENT_NUMBERS = {
  Wood: [3, 4, 8],
  Fire: [2, 7, 9],
  Earth: [5, 6, 0],
  Metal: [1, 6, 7],
  Water: [1, 2, 6]
};

// —— 十神系统 ——
const TEN_GODS = {
  '比肩': 'Same Element (比肩)',
  '劫财': 'Same Element Rob (劫财)', 
  '食神': 'Output Element (食神)',
  '伤官': 'Output Element Hurt (伤官)',
  '偏财': 'Wealth Element (偏财)',
  '正财': 'Wealth Element Direct (正财)',
  '七杀': 'Kill Element (七杀)',
  '正官': 'Official Element (正官)',
  '偏印': 'Print Element (偏印)',
  '正印': 'Print Element Direct (正印)'
};

function getTenGods(dayStem, otherStem) {
  const dayElement = ELEMENT_MAP[dayStem];
  const otherElement = ELEMENT_MAP[otherStem];
  const samePolarity = isYangStem(dayStem) === isYangStem(otherStem);
  const relations = ELEMENT_RELATIONS[dayElement];

  if (otherElement === dayElement) return samePolarity ? '比肩' : '劫财';
  if (otherElement === relations.generated_by) return samePolarity ? '偏印' : '正印';
  if (otherElement === relations.generates) return samePolarity ? '食神' : '伤官';
  if (otherElement === relations.restricts) return samePolarity ? '偏财' : '正财';
  if (otherElement === relations.restricted_by) return samePolarity ? '七杀' : '正官';
  return '偏财';
}

/** 以日主旺衰取喜用神（子平简化）：得令/生扶 vs 克泄耗 */
function analyzeElements(pillars, dayPillar) {
  const dayStem = dayPillar[0];
  const dayMaster = ELEMENT_MAP[dayStem];
  const relations = ELEMENT_RELATIONS[dayMaster];
  const monthBranch = pillars[1][1];
  const monthQi = MONTH_COMMAND[monthBranch];

  const cnt = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  pillars.forEach((pillar, i) => {
    const stemEl = ELEMENT_MAP[pillar[0]];
    const branchEl = ELEMENT_MAP[pillar[1]];
    // 天干权重略高于地支；月支再加权（月令）
    cnt[stemEl] += 2;
    cnt[branchEl] += i === 1 ? 3 : 1;
  });

  let support = cnt[dayMaster] + cnt[relations.generated_by];
  let drain =
    cnt[relations.generates] +
    cnt[relations.restricts] +
    cnt[relations.restricted_by];

  // 月令得气：同我/生我为助，克我/泄我/耗我为损
  if (monthQi === dayMaster) support += 4;
  else if (monthQi === relations.generated_by) support += 3;
  else if (monthQi === relations.restricted_by) drain += 4;
  else if (monthQi === relations.restricts) drain += 3;
  else if (monthQi === relations.generates) drain += 2;

  const isWeak = support <= drain;

  // 身弱喜印比，忌官杀财食伤；身强喜食伤财官，忌印比
  let favorable;
  let unfavorable;
  if (isWeak) {
    favorable = [dayMaster, relations.generated_by];
    unfavorable = [relations.restricted_by, relations.restricts, relations.generates];
  } else {
    favorable = [relations.generates, relations.restricts];
    unfavorable = [dayMaster, relations.generated_by, relations.restricted_by];
  }

  favorable = [...new Set(favorable)];
  unfavorable = [...new Set(unfavorable)].filter(el => !favorable.includes(el));

  return {
    favorable,
    unfavorable,
    luckyColors: [...new Set(favorable.flatMap(el => ELEMENT_COLORS[el]))],
    luckyNumbers: [...new Set(favorable.flatMap(el => ELEMENT_NUMBERS[el]))],
    unluckyColors: [...new Set(unfavorable.flatMap(el => ELEMENT_COLORS[el]))],
    unluckyNumbers: [...new Set(unfavorable.flatMap(el => ELEMENT_NUMBERS[el]))],
    elementCounts: cnt,
    dayMaster,
    strength: isWeak ? 'weak' : 'strong'
  };
}

// —— 产品推荐：① 喜用神材质优先 ② 无对应材质时才按幸运色；始终排除忌神材质 ——
function getRecommendedProducts(favorableElements, luckyColors, unfavorableElements = [], limit = 6) {
  const unlucky = new Set(unfavorableElements || []);
  const fav = favorableElements || [];
  const colors = new Set(luckyColors || []);

  const notUnlucky = (p) => !unlucky.has(p.element);

  // 1) 材质五行 ∈ 喜用神（且不是忌神）
  const byElement = products.filter(
    (p) => fav.includes(p.element) && notUnlucky(p)
  );

  if (byElement.length > 0) {
    // 尽量覆盖每个喜用神各至少一件，再补齐其余同元素材质
    const picked = [];
    const used = new Set();
    for (const el of fav) {
      const hit = byElement.find((p) => p.element === el && !used.has(p.id));
      if (hit) {
        picked.push(hit);
        used.add(hit.id);
      }
    }
    for (const p of byElement) {
      if (picked.length >= limit) break;
      if (!used.has(p.id)) {
        picked.push(p);
        used.add(p.id);
      }
    }
    return picked.slice(0, limit);
  }

  // 2) 没有任何喜用神材质时，才用幸运色兜底（仍排除忌神五行）
  return products
    .filter((p) => notUnlucky(p) && p.colors.some((c) => colors.has(c)))
    .slice(0, limit);
}

function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Create product detail modal
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div class="product-detail">
        <div class="product-image">
          <img src="${product.image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name)}" alt="${product.name}">
        </div>
        <div class="product-details">
          <h2>${product.name}</h2>
          <p class="chinese-name">${product.chineseName}</p>
          <p class="price">$${product.price}</p>
          <p class="element">${product.element} Element</p>
          <p class="description">${product.description}</p>
          <p class="meaning"><strong>Meaning:</strong> ${product.meaning}</p>
          <p class="colors"><strong>Available Colors:</strong> ${product.colors.join(', ')}</p>
          
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" max="10" value="1">
          </div>
          
          <div class="add-to-cart">
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
            <button onclick="buyNow('${product.id}')">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function showAllProducts() {
  // Hide birthdate section and show all products
  document.getElementById('birthdate-input').style.display = 'none';
  document.getElementById('material-list').style.display = 'block';
  
  // Update the materials container with all products
  const container = document.getElementById('materials-container');
  container.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'material-card product-card';
    card.onclick = () => showProductDetails(product.id);
    
    const src = product.image || `https://via.placeholder.com/250x150?text=${encodeURIComponent(product.name)}`;
    card.innerHTML = `
      <img src="${src}" alt="${product.name}">
      <div class="material-card-content">
        <h3>${product.name}</h3>
        <p class="chinese-name">${product.chineseName}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Element:</strong> ${product.element}</p>
        <p><strong>Colors:</strong> ${product.colors.join(', ')}</p>
        <p><strong>Meaning:</strong> ${product.meaning}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function closeModal() {
  const modal = document.querySelector('.product-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

function addToCart(productId, { silent = false } = {}) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const quantityEl = document.getElementById('quantity');
  const quantity = parseInt(quantityEl && quantityEl.value ? quantityEl.value : '1', 10) || 1;

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if (!silent) alert(`${product.name} added to cart!`);
  closeModal();
}

function buyNow(productId) {
  addToCart(productId, { silent: true });
  showCart();
  checkout();
}

// —— 导航功能 ——
function showAnalysisPage() {
  document.getElementById('birthdate-input').style.display = 'block';
  document.getElementById('material-list').style.display = 'none';
  document.getElementById('cart-section').style.display = 'none';
  updateActiveNav('nav-analysis');
}

function showProductsPage() {
  document.getElementById('birthdate-input').style.display = 'none';
  document.getElementById('material-list').style.display = 'block';
  document.getElementById('cart-section').style.display = 'none';
  updateActiveNav('nav-products');
  showAllProducts();
}

function showCart() {
  document.getElementById('birthdate-input').style.display = 'none';
  document.getElementById('material-list').style.display = 'none';
  document.getElementById('cart-section').style.display = 'block';
  updateActiveNav('nav-cart');
  displayCart();
}

function updateActiveNav(activeId) {
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartContent = document.getElementById('cart-content');
  
  if (cart.length === 0) {
    cartContent.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  
  let total = 0;
  const cartHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image || 'https://via.placeholder.com/50x50'}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price} × ${item.quantity} = $${itemTotal.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
  }).join('');
  
  cartContent.innerHTML = `
    <div class="cart-items">${cartHTML}</div>
    <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) {
    alert('Your cart is empty.');
    return;
  }

  const apiBase = window.CHECKOUT_API_BASE || '';
  const btn = document.querySelector('.cart-total button');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Redirecting to Stripe…';
  }

  fetch(`${apiBase}/api/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      successUrl: `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}success.html`,
      cancelUrl: `${window.location.href.split('#')[0]}`
    })
  })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Checkout failed (${res.status})`);
      if (!data.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    })
    .catch((err) => {
      console.error(err);
      alert(
        'Checkout is not configured yet.\n\n' +
          'Add STRIPE_SECRET_KEY on Vercel, then set window.CHECKOUT_API_BASE to your Vercel URL if this site is on GitHub Pages.\n\n' +
          err.message
      );
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Proceed to Checkout';
      }
    });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// —— 渲染与交互逻辑 ——
window.addEventListener('DOMContentLoaded', () => {
  // Initialize cart count
  updateCartCount();

  // Deep links from knowledge/nav
  if (location.hash === '#products') {
    showProductsPage();
  } else if (location.hash === '#cart') {
    showCart();
  } else {
    updateActiveNav('nav-analysis');
    document.getElementById('material-list').style.display = 'none';
  }
  
  const mCont = document.getElementById('materials-container');
  materials.forEach(mat => {
    const card = document.createElement('div'); 
    card.className = 'material-card';
    card.onclick = () => showProductDetails(mat.id);
    const src = mat.image || `https://via.placeholder.com/250x150?text=${encodeURIComponent(mat.name)}`;
    card.innerHTML = `<img src="${src}" alt="${mat.name}"><div class="material-card-content">` +
      `<h3>${mat.name}</h3><p><strong>Price:</strong> $${mat.price}</p>` +
      `<p><strong>Meaning:</strong> ${mat.meaning}</p>` +
      `<p><strong>Element:</strong> ${mat.element}</p></div>`;
    mCont.appendChild(card);
  });

  document.getElementById('analyze-button').addEventListener('click', () => {
    const bd = document.getElementById('birthdate').value;
    const bt = document.getElementById('birthtime').value;
    const res = document.getElementById('analysis-result'); 
    res.innerHTML = '';

    if (!bd || !bt) { 
      res.innerHTML = '<div class="error">Please enter birth date and time.</div>'; 
      return; 
    }
    
    const dt = new Date(`${bd}T${bt}`); 
    if (isNaN(dt)) { 
      res.innerHTML = '<div class="error">Invalid date/time.</div>'; 
      return; 
    }

    let bz;
    try {
      bz = calculateBaZi(dt);
    } catch (err) {
      res.innerHTML = `<div class="error">BaZi library error: ${err.message}</div>`;
      return;
    }
    const analysis = analyzeElements([bz.year, bz.month, bz.day, bz.hour], bz.day);

    const formatE = arr => arr.map(e => `<span class="element-${e.toLowerCase()}">${CH_ELEMENT[e]}</span>`).join(', ');
    const strengthLabel = analysis.strength === 'weak' ? '身弱 (Weak)' : '身强 (Strong)';
    const dm = `Day Master: ${bz.day} (` +
      `<span class="element-${ELEMENT_MAP[bz.day[0]].toLowerCase()}">${CH_ELEMENT[ELEMENT_MAP[bz.day[0]]]}</span>` +
      `) · ${strengthLabel}`;
    const colorize = gh => gh.split('').map(ch => {
      const el = ELEMENT_MAP[ch];
      return el ? `<span class="element-${el.toLowerCase()}">${ch}</span>` : ch;
    }).join('');
    const fourPillars = `${colorize(bz.year)}　${colorize(bz.month)}　${colorize(bz.day)}　${colorize(bz.hour)}`;

    // 十神优先用 lunar-javascript；本地 getTenGods 作兜底
    const dayStem = bz.day[0];
    const tenGods = bz.tenGods || {
      year: getTenGods(dayStem, bz.year[0]),
      month: getTenGods(dayStem, bz.month[0]),
      day: '日主',
      hour: getTenGods(dayStem, bz.hour[0])
    };

    const table = `<h3>BaZi Chart with 10 Gods (十神)</h3><table>` +
      `<tr><th>Pillar</th><th>GanZhi</th><th>Element</th><th>10 Gods</th></tr>` +
      `<tr><td>Year</td><td>${colorize(bz.year)}</td><td>${formatE([ELEMENT_MAP[bz.year[0]], ELEMENT_MAP[bz.year[1]]])}</td><td>${tenGods.year}</td></tr>` +
      `<tr><td>Month</td><td>${colorize(bz.month)}</td><td>${formatE([ELEMENT_MAP[bz.month[0]], ELEMENT_MAP[bz.month[1]]])}</td><td>${tenGods.month}</td></tr>` +
      `<tr><td>Day</td><td>${colorize(bz.day)}</td><td>${formatE([ELEMENT_MAP[bz.day[0]], ELEMENT_MAP[bz.day[1]]])}</td><td>${tenGods.day}</td></tr>` +
      `<tr><td>Hour</td><td>${colorize(bz.hour)}</td><td>${formatE([ELEMENT_MAP[bz.hour[0]], ELEMENT_MAP[bz.hour[1]]])}</td><td>${tenGods.hour}</td></tr>` +
      `</table>`;

    const recommendedProducts = getRecommendedProducts(
      analysis.favorable,
      analysis.luckyColors,
      analysis.unfavorable
    );
    const starLine = bz.star
      ? `<p><strong>二十八宿:</strong> ${bz.ganZhi || bz.day} · ${bz.star}</p>`
      : '';
    const naYinLine = bz.naYin
      ? `<p><strong>纳音:</strong> ${bz.naYin.year} / ${bz.naYin.month} / ${bz.naYin.day} / ${bz.naYin.hour}</p>`
      : '';

    res.innerHTML = `
      <div class="analysis-summary">
        <h3>Your BaZi Analysis</h3>
        <p><strong>Four Pillars (四柱):</strong> ${fourPillars}</p>
        <p><strong>${dm}</strong></p>
        <p><strong>Lucky Elements (喜用神):</strong> ${formatE(analysis.favorable)}</p>
        <p><strong>Unlucky Elements (忌神):</strong> ${formatE(analysis.unfavorable)}</p>
        <p><strong>Lucky Colors:</strong> ${analysis.luckyColors.join(', ')}</p>
        <p><strong>Lucky Numbers:</strong> ${analysis.luckyNumbers.join(', ')}</p>
        ${starLine}
        ${naYinLine}
        <p style="color:#888;font-size:12px;">Pillars via <a href="https://github.com/6tail/lunar-javascript" target="_blank" rel="noopener">lunar-javascript</a></p>
      </div>
      ${table}
      <div class="recommended-products">
        <h3>Recommended Bracelet Materials</h3>
        <div class="product-grid">
          ${recommendedProducts.map(product => `
            <div class="product-card" onclick="showProductDetails('${product.id}')">
              <img src="${product.image || 'https://via.placeholder.com/200x150?text=' + encodeURIComponent(product.name)}" alt="${product.name}">
              <div class="product-info">
                <h4>${product.name}</h4>
                <p class="chinese-name">${product.chineseName}</p>
                <p class="price">$${product.price}</p>
                <p class="element">${product.element} Element</p>
              </div>
            </div>
          `).join('')}
        </div>
        <button id="view-all-products" onclick="showAllProducts()">View All Products</button>
      </div>`;
  });
});
