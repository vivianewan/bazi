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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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

// —— 累计天数计算 ——
// 基准日期：1900-01-01
function calculateTotalDays(date) {
  const baseDate = new Date(1900, 0, 1); // 基准日期
  const diffTime = date - baseDate; // 时间差（毫秒）
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 转换为天数
}

// —— 干支与二十八宿计算 ——
function calculateGanZhiAndStars(totalDays) {
  const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const GANZHI_CYCLE = [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
  ];
  const TWENTY_EIGHT_STARS = [
    '角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁',
    '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸'
  ];
  const ganZhiIndex = (totalDays + 9) % 60; // 偏移量9
  const starIndex = (totalDays + 23) % 28; // 偏移量23
  return {
    ganZhi: GANZHI_CYCLE[ganZhiIndex],
    star: TWENTY_EIGHT_STARS[starIndex]
  };
}

// —— 四柱计算函数 ——
function getYearStem(y) { return HEAVENLY_STEMS[(y - 4 + 1000) % 10]; }
function getYearBranch(y) { return EARTHLY_BRANCHES[(y - 4 + 1200) % 12]; }
function getMonthStem(y, m) { const i = HEAVENLY_STEMS.indexOf(getYearStem(y)); return HEAVENLY_STEMS[(i * 2 + m - 2 + 1000) % 10]; }
function getMonthBranch(m) { return EARTHLY_BRANCHES[(m + 1) % 12]; }
function getDayStem(d) { const base = new Date(1900, 0, 1); const days = Math.floor((d - base) / 86400000); return HEAVENLY_STEMS[(days + 6) % 10]; }
function getDayBranch(d) { const base = new Date(1900, 0, 1); const days = Math.floor((d - base) / 86400000); return EARTHLY_BRANCHES[days % 12]; }
function getHourBranch(h) { h = (h + 24) % 24; if (h < 1 || h >= 23) return '子'; if (h < 3) return '丑'; if (h < 5) return '寅'; if (h < 7) return '卯'; if (h < 9) return '辰'; if (h < 11) return '巳'; if (h < 13) return '午'; if (h < 15) return '未'; if (h < 17) return '申'; if (h < 19) return '酉'; if (h < 21) return '戌'; return '亥'; }
function getHourStem(ds, h) { const si = HEAVENLY_STEMS.indexOf(ds); const bi = Math.floor((h + 1) / 2) % 12; return HEAVENLY_STEMS[(si * 2 + bi) % 10]; }

function calculateBaZi(dt) {
  const y = dt.getFullYear(), m = dt.getMonth() + 1, h = dt.getHours();
  const yS = getYearStem(y), yB = getYearBranch(y);
  const mS = getMonthStem(y, m), mB = getMonthBranch(m);
  const dS = getDayStem(dt), dB = getDayBranch(dt);
  const hB = getHourBranch(h), hS = getHourStem(dS, h);
  return { year: yS + yB, month: mS + mB, day: dS + dB, hour: hS + hB };
}

// —— 五行生克关系 ——
const ELEMENT_RELATIONS = {
  Wood: { generated_by: 'Water', generates: 'Fire', restricted_by: 'Metal' },
  Fire: { generated_by: 'Wood', generates: 'Earth', restricted_by: 'Water' },
  Earth: { generated_by: 'Fire', generates: 'Metal', restricted_by: 'Wood' },
  Metal: { generated_by: 'Earth', generates: 'Water', restricted_by: 'Fire' },
  Water: { generated_by: 'Metal', generates: 'Wood', restricted_by: 'Earth' }
};

// —— 五行对应的颜色和数字 ——
const ELEMENT_COLORS = {
  Wood: ['Green', 'Teal', 'Light Blue', 'Emerald'],
  Fire: ['Red', 'Orange', 'Pink', 'Purple', 'Coral'],
  Earth: ['Yellow', 'Brown', 'Beige', 'Gold', 'Amber'],
  Metal: ['White', 'Silver', 'Gray', 'Platinum'],
  Water: ['Black', 'Dark Blue', 'Navy', 'Midnight Blue']
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
  
  if (dayElement === otherElement) {
    return '比肩';
  }
  
  const relations = ELEMENT_RELATIONS[dayElement];
  
  if (otherElement === relations.generated_by) {
    return '正印';
  }
  if (otherElement === relations.generates) {
    return '食神';
  }
  if (otherElement === relations.restricted_by) {
    return '正官';
  }
  if (otherElement === relations.restricts) {
    return '正财';
  }
  
  return '偏财';
}

function analyzeElements(pillars, dayP) {
  const arr = pillars.flatMap(p => [p[0], p[1]]).map(c => ELEMENT_MAP[c]);
  const cnt = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  arr.forEach(e => cnt[e]++);
  const entries = Object.entries(cnt);
  const max = Math.max(...entries.map(([, c]) => c));
  const min = Math.min(...entries.map(([, c]) => c));
  const strong = entries.find(([, c]) => c === max)[0];
  const weak = entries.find(([, c]) => c === min)[0];
  const fav = [weak]; const gen = ELEMENT_RELATIONS[weak].generated_by; if (gen !== weak) fav.push(gen);
  const unf = [strong]; const rst = ELEMENT_RELATIONS[strong].restricted_by; if (rst !== strong) unf.push(rst);
  
  // Get lucky colors and numbers for favorable elements
  const luckyColors = [...new Set(fav.flatMap(el => ELEMENT_COLORS[el]))];
  const luckyNumbers = [...new Set(fav.flatMap(el => ELEMENT_NUMBERS[el]))];
  const unluckyColors = [...new Set(unf.flatMap(el => ELEMENT_COLORS[el]))];
  const unluckyNumbers = [...new Set(unf.flatMap(el => ELEMENT_NUMBERS[el]))];
  
  return { 
    favorable: fav, 
    unfavorable: unf,
    luckyColors,
    luckyNumbers,
    unluckyColors,
    unluckyNumbers,
    elementCounts: cnt
  };
}

// —— 产品推荐系统 ——
function getRecommendedProducts(favorableElements, luckyColors) {
  return products.filter(product => 
    favorableElements.includes(product.element) ||
    product.colors.some(color => luckyColors.includes(color))
  ).slice(0, 6); // Show top 6 recommendations
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

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const quantity = document.getElementById('quantity').value;
  
  // Simple cart implementation (you can integrate with Shopify here)
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity),
      image: product.image
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
  closeModal();
}

function buyNow(productId) {
  // Redirect to checkout or integrate with Shopify
  alert('Redirecting to checkout...');
  // window.location.href = 'https://your-shopify-store.com/cart';
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
  alert('Redirecting to checkout...');
  // Integrate with Shopify or payment processor
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// —— AI Chatbot Functions ——
let isChatOpen = false;

function toggleChat() {
  const chatbot = document.getElementById('chatbot-container');
  isChatOpen = !isChatOpen;
  
  if (isChatOpen) {
    chatbot.style.display = 'block';
    document.getElementById('chat-input').focus();
    // Add welcome message if first time
    if (document.getElementById('chatbot-messages').children.length === 0) {
      addChatMessage('assistant', 'Hello! I\'m your BaZi AI Assistant. I can help you understand your BaZi analysis, explain stone meanings, and recommend the perfect bracelet for you. What would you like to know?');
    }
  } else {
    chatbot.style.display = 'none';
  }
}

function addChatMessage(sender, message) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  
  const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-text">${message}</div>
      <div class="message-time">${timestamp}</div>
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addChatMessage('user', message);
  input.value = '';
  
  // Show typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message assistant typing';
  typingDiv.innerHTML = `
    <div class="message-content">
      <div class="message-text">🤖 AI is thinking...</div>
    </div>
  `;
  document.getElementById('chatbot-messages').appendChild(typingDiv);
  
  try {
    // Get AI response
    const response = await getAIResponse(message);
    
    // Remove typing indicator
    document.getElementById('chatbot-messages').removeChild(typingDiv);
    
    // Add AI response
    addChatMessage('assistant', response);
  } catch (error) {
    // Remove typing indicator
    document.getElementById('chatbot-messages').removeChild(typingDiv);
    
    // Add error message
    addChatMessage('assistant', 'Sorry, I\'m having trouble connecting right now. Please try again later.');
    console.error('Chatbot error:', error);
  }
}

async function getAIResponse(userMessage) {
  // Check if AI is enabled (admin control)
  const aiEnabled = document.getElementById('ai-enabled').checked;
  
  if (!aiEnabled) {
    // Use smart fallback responses instead of generic message
    return await generateLocalResponse(userMessage, '');
  }

  // Create context about the website and products
  const context = `
You are a BaZi AI Assistant for a Chinese astrology bracelet customizer website. 
You help customers understand their BaZi analysis, explain stone meanings, and recommend bracelets.

Website Context:
- We offer personalized BaZi analysis with 10 Gods system
- We have 20+ stones across 5 elements (Wood, Fire, Earth, Metal, Water)
- Products include: Green Phantom Quartz, Xinjiang Hetian Jade, Alashan Agate, Obsidian, etc.
- We provide lucky colors, numbers, and element analysis
- Customers can get personalized stone recommendations

Available Stones by Element:
Wood: Green Phantom Quartz, Peach Wood, Hainan Agarwood, Green Sandalwood
Fire: Alashan Agate, Red Agate, Rose Quartz
Earth: Xinjiang Old Yellow Jade, Xinjiang Hetian Jade, Shoushan Imperial Stone
Metal: White Cat's Eye Stone, Sheep Fat White Jade
Water: South African Blue Lace Agate, Obsidian

Be helpful, knowledgeable about Chinese astrology, and encourage customers to try the BaZi analysis.
Keep responses concise but informative.
  `;

  // Always try API route first (for Vercel deployment)
  // Fallback to local config only if API route fails
  try {
    return await generateOpenAIResponse(userMessage, context);
  } catch (error) {
    console.log('API route failed, using fallback:', error);
    return await generateLocalResponse(userMessage, context);
  }
}

async function generateOpenAIResponse(message, context) {
  try {
    console.log('Attempting API call to /api/chat');
    
    // Use Vercel API route for serverless function
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        context: context
      })
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Re-throw to trigger fallback
  }
}

async function generateLocalResponse(message, context) {
  const lowerMessage = message.toLowerCase();
  
  // BaZi related responses
  if (lowerMessage.includes('bazi') || lowerMessage.includes('八字')) {
    return "BaZi (八字) is the Chinese system of four pillars representing your birth year, month, day, and hour. Each pillar contains a heavenly stem and earthly branch, revealing your elemental balance and personality traits. Try our BaZi analysis to discover your lucky elements, colors, and recommended stones!";
  }
  
  if (lowerMessage.includes('element') || lowerMessage.includes('五行')) {
    return "The Five Elements (五行) are Wood, Fire, Earth, Metal, and Water. Each element has specific characteristics, colors, and stones. Your BaZi analysis will show which elements are strong or weak in your chart, helping us recommend the perfect stones for your bracelet.";
  }
  
  if (lowerMessage.includes('stone') || lowerMessage.includes('crystal') || lowerMessage.includes('jade')) {
    return "We have beautiful stones for each element! For Wood: Green Phantom Quartz and Green Sandalwood. For Fire: Alashan Agate and Rose Quartz. For Earth: Xinjiang Hetian Jade and Shoushan Imperial Stone. For Metal: White Cat's Eye Stone. For Water: Obsidian and Blue Lace Agate. Each stone has unique properties and meanings!";
  }
  
  if (lowerMessage.includes('lucky') || lowerMessage.includes('color') || lowerMessage.includes('number')) {
    return "Your lucky colors and numbers are determined by your BaZi analysis! Based on your birth date and time, we calculate which elements are favorable for you, then recommend corresponding colors and numbers. Try our analysis to discover your personalized lucky elements!";
  }
  
  if (lowerMessage.includes('bracelet') || lowerMessage.includes('recommend')) {
    return "Our AI analyzes your BaZi to recommend the perfect stones for your bracelet! We match your favorable elements with corresponding stones and colors. After your analysis, you'll see personalized recommendations that bring you luck and positive energy.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
    return "I can help you with: 1) Understanding BaZi analysis and the 10 Gods system, 2) Explaining stone meanings and properties, 3) Recommending bracelets based on your elements, 4) Understanding lucky colors and numbers. Try our BaZi analysis first to get personalized insights!";
  }
  
  // Default response
  return "That's a great question! I'm here to help you understand BaZi analysis, stone meanings, and find the perfect bracelet for you. Try our BaZi analysis to get personalized recommendations, or ask me about specific stones or elements. What would you like to know more about?";
}

// —— Admin Panel Functions ——
function showAdminPanel() {
  // Check if user is authenticated as admin
  const isAdmin = checkAdminAuth();
  
  if (!isAdmin) {
    const password = prompt('🔐 Admin Access Required\n\nEnter admin password:');
    if (password === 'magicbaziadmin88') { // Change this to your secure password
      sessionStorage.setItem('adminAuth', 'true');
      showAdminPanelContent();
    } else if (password !== null) {
      alert('❌ Invalid password. Access denied.');
    }
  } else {
    showAdminPanelContent();
  }
}

function showAdminPanelContent() {
  const modal = document.getElementById('admin-modal');
  modal.style.display = 'flex';
  updateStatusDisplay();
}

function checkAdminAuth() {
  return sessionStorage.getItem('adminAuth') === 'true';
}

function closeAdminPanel() {
  const modal = document.getElementById('admin-modal');
  modal.style.display = 'none';
}

function logoutAdmin() {
  sessionStorage.removeItem('adminAuth');
  closeAdminPanel();
  alert('✅ Admin session ended. You will need to re-authenticate to access admin controls.');
}

function updateStatusDisplay() {
  const aiEnabled = document.getElementById('ai-enabled').checked;
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.getElementById('status-text');
  
  if (aiEnabled) {
    statusDot.style.backgroundColor = '#4CAF50';
    statusText.textContent = 'Real AI Active';
  } else {
    statusDot.style.backgroundColor = '#FF9800';
    statusText.textContent = 'Fallback Mode';
  }
}

// Add event listener for AI toggle
document.addEventListener('DOMContentLoaded', () => {
  const aiToggle = document.getElementById('ai-enabled');
  if (aiToggle) {
    aiToggle.addEventListener('change', updateStatusDisplay);
  }
});

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// —— 渲染与交互逻辑 ——
window.addEventListener('DOMContentLoaded', () => {
  // Initialize cart count
  updateCartCount();
  
  // Set default active navigation
  updateActiveNav('nav-analysis');
  
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

    const totalDays = calculateTotalDays(dt);
    const { ganZhi, star } = calculateGanZhiAndStars(totalDays);
    const bz = calculateBaZi(dt);
    const analysis = analyzeElements([bz.year, bz.month, bz.day, bz.hour], bz.day);

    const formatE = arr => arr.map(e => `<span class="element-${e.toLowerCase()}">${CH_ELEMENT[e]}</span>`).join(', ');
    const dm = `Day Master: ${bz.day} (` + `<span class="element-${ELEMENT_MAP[bz.day[0]].toLowerCase()}">${CH_ELEMENT[ELEMENT_MAP[bz.day[0]]]}</span>)`;
    const colorize = gh => gh.split('').map(ch => {
      const el = ELEMENT_MAP[ch];
      return el ? `<span class="element-${el.toLowerCase()}">${ch}</span>` : ch;
    }).join('');

    // Calculate 10 Gods for each pillar
    const dayStem = bz.day[0];
    const tenGods = {
      year: getTenGods(dayStem, bz.year[0]),
      month: getTenGods(dayStem, bz.month[0]),
      day: '日主 (Day Master)',
      hour: getTenGods(dayStem, bz.hour[0])
    };

    const table = `<h3>BaZi Chart with 10 Gods (十神)</h3><table>` +
      `<tr><th>Pillar</th><th>GanZhi</th><th>Element</th><th>10 Gods</th></tr>` +
      `<tr><td>Year</td><td>${colorize(bz.year)}</td><td>${formatE([ELEMENT_MAP[bz.year[0]], ELEMENT_MAP[bz.year[1]]])}</td><td>${tenGods.year}</td></tr>` +
      `<tr><td>Month</td><td>${colorize(bz.month)}</td><td>${formatE([ELEMENT_MAP[bz.month[0]], ELEMENT_MAP[bz.month[1]]])}</td><td>${tenGods.month}</td></tr>` +
      `<tr><td>Day</td><td>${colorize(bz.day)}</td><td>${formatE([ELEMENT_MAP[bz.day[0]], ELEMENT_MAP[bz.day[1]]])}</td><td>${tenGods.day}</td></tr>` +
      `<tr><td>Hour</td><td>${colorize(bz.hour)}</td><td>${formatE([ELEMENT_MAP[bz.hour[0]], ELEMENT_MAP[bz.hour[1]]])}</td><td>${tenGods.hour}</td></tr>` +
      `</table>`;

    // Get recommended products
    const recommendedProducts = getRecommendedProducts(analysis.favorable, analysis.luckyColors);

    res.innerHTML = `
      <div class="analysis-summary">
        <h3>Your BaZi Analysis</h3>
      <p><strong>GanZhi:</strong> ${ganZhi}</p>
      <p><strong>Star:</strong> ${star}</p>
        <p><strong>Lucky Elements:</strong> ${formatE(analysis.favorable)}</p>
        <p><strong>Unlucky Elements:</strong> ${formatE(analysis.unfavorable)}</p>
        <p><strong>Lucky Colors:</strong> ${analysis.luckyColors.join(', ')}</p>
        <p><strong>Lucky Numbers:</strong> ${analysis.luckyNumbers.join(', ')}</p>
      <p><strong>${dm}</strong></p>
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
