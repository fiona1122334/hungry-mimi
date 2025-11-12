// 食物資料庫
const foodDatabase = {
  "main-dish": [
    { name: "Ocean Cream Boat", id: "ocean-cream-boat" },
    { name: "Green Sail Adventure", id: "green-sail-adventure" },
    { name: "Garden Cream Path", id: "garden-cream-path" },
    { name: "Green Waves Feast", id: "green-waves-feast" },
    { name: "Sunset Seafood Risotto", id: "sunset-seafood-risotto" },
    { name: "Morning Glow Risotto", id: "morning-glow-risotto" },
    { name: "Cozy Pork Hug", id: "cozy-pork-hug" },
    { name: "Curry Volcano", id: "curry-volcano" },
    { name: "Hero's Steak", id: "hero-steak" }
  ],
  "side-dish": [
    { name: "Little Explorer Salad", id: "little-explorer-salad" },
    { name: "Golden Fry Party", id: "golden-fry-party" },
    { name: "Cheesy Pesto Bread", id: "cheesy-pesto-bread" }
  ],
  "drinks": [
    { name: "Creamy Cheese Dream", id: "creamy-cheese-dream" },
    { name: "Banana Sparkle Milk", id: "banana-sparkle-milk" },
    { name: "Fruit Parade", id: "fruit-parade" }
  ],
  "dessert": [
    { name: "Golden Caramel Pudding", id: "golden-caramel-pudding" },
    { name: "Frosty Rainbow Cream", id: "frosty-rainbow-cream" },
    { name: "Creamy Puff Surprise", id: "creamy-puff-surprise" }
  ]
};

/*// 搜尋功能
const searchModal = document.getElementById("searchModal");
const categorySelect = document.getElementById("categorySelect");
const foodSelect = document.getElementById("foodSelect");
const searchEnterBtn = document.getElementById("searchEnterBtn");

// 開啟搜尋視窗
document.getElementById("openSearch").addEventListener("click", () => {
  searchModal.style.display = "flex";
});

// 關閉搜尋視窗
document.getElementById("closeSearch").addEventListener("click", () => {
  searchModal.style.display = "none";
  // 重置選單
  categorySelect.value = "";
  foodSelect.value = "";
  foodSelect.disabled = true;
  foodSelect.innerHTML = '<option value="">Select Food</option>';
});

// 點擊遮罩關閉
searchModal.addEventListener("click", (e) => {
  if (e.target === searchModal) {
    searchModal.style.display = "none";
    categorySelect.value = "";
    foodSelect.value = "";
    foodSelect.disabled = true;
    foodSelect.innerHTML = '<option value="">Select Food</option>';
  }
});

// 類別選擇改變時更新食物選單
categorySelect.addEventListener("change", () => {
  const category = categorySelect.value;
  
  if (category) {
    foodSelect.disabled = false;
    foodSelect.innerHTML = '<option value="">Select Food</option>';
    
    const foods = foodDatabase[category];
    foods.forEach(food => {
      const option = document.createElement("option");
      option.value = food.id;
      option.textContent = food.name;
      foodSelect.appendChild(option);
    });
  } else {
    foodSelect.disabled = true;
    foodSelect.innerHTML = '<option value="">Select Food</option>';
  }
  
  // 重置食物選擇
  foodSelect.value = "";
});

// 搜尋按鈕
searchEnterBtn.addEventListener("click", () => {
  const foodId = foodSelect.value;
  
  if (foodId) {
    // 關閉搜尋視窗
    searchModal.style.display = "none";
    
    // 滾動到該食物
    const foodElement = document.getElementById(foodId);
    if (foodElement) {
      foodElement.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // 添加閃爍效果
      foodElement.style.transition = "all 0.3s";
      foodElement.style.boxShadow = "0 0 20px #F2AE2E";
      setTimeout(() => {
        foodElement.style.boxShadow = "";
      }, 2000);
    }
    
    // 重置選單
    categorySelect.value = "";
    foodSelect.value = "";
    foodSelect.disabled = true;
    foodSelect.innerHTML = '<option value="">Select Food</option>';
  }
});*/

// 自訂下拉選單類別
class CustomSelect {
  constructor(element) {
    this.element = element;
    this.header = element.querySelector('.select-header');
    this.options = element.querySelector('.select-options');
    this.value = '';
    this.disabled = this.header.classList.contains('disabled');
    
    this.init();
  }
  
  init() {
    // 點擊 header 展開/收起
    this.header.addEventListener('click', () => {
      if (!this.disabled) {
        this.toggle();
      }
    });
    
    // 點擊選項
    this.options.addEventListener('click', (e) => {
      const option = e.target.closest('.select-option');
      if (option) {
        this.selectOption(option);
      }
    });
    
    // 點擊外部關閉
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });
  }
  
  toggle() {
    this.options.classList.toggle('active');
    this.header.classList.toggle('active');
  }
  
  close() {
    this.options.classList.remove('active');
    this.header.classList.remove('active');
  }
  
  selectOption(option) {
    const value = option.dataset.value;
    const text = option.textContent;
    
    // 更新顯示
    this.header.textContent = text;
    this.header.dataset.value = value;
    this.value = value;
    
    // 更新選中狀態
    this.options.querySelectorAll('.select-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    option.classList.add('selected');
    
    this.close();
    
    // 觸發 change 事件
    this.element.dispatchEvent(new Event('change'));
  }
  
  setDisabled(disabled) {
    this.disabled = disabled;
    if (disabled) {
      this.header.classList.add('disabled');
      this.close();
    } else {
      this.header.classList.remove('disabled');
    }
  }
  
  reset() {
    this.value = '';
    this.header.textContent = this.header.dataset.placeholder || 'Select';
    this.header.dataset.value = '';
    this.options.querySelectorAll('.select-option').forEach(opt => {
      opt.classList.remove('selected');
    });
  }
  
  setOptions(optionsData) {
    this.options.innerHTML = '';
    optionsData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'select-option';
      div.dataset.value = item.id;
      div.textContent = item.name;
      this.options.appendChild(div);
    });
  }
}

// 搜尋功能
const searchModal = document.getElementById("searchModal");
const categorySelect = new CustomSelect(document.getElementById("categorySelect"));
const foodSelect = new CustomSelect(document.getElementById("foodSelect"));

// 開啟搜尋視窗
document.getElementById("openSearch").addEventListener("click", () => {
  searchModal.style.display = "flex";
});

// 關閉搜尋視窗
document.getElementById("closeSearch").addEventListener("click", () => {
  closeSearchModal();
});

// 點擊遮罩關閉
searchModal.addEventListener("click", (e) => {
  if (e.target === searchModal) {
    closeSearchModal();
  }
});

function closeSearchModal() {
  searchModal.style.display = "none";
  categorySelect.reset();
  foodSelect.reset();
  foodSelect.setDisabled(true);
}

// 類別選擇改變時更新食物選單
categorySelect.element.addEventListener("change", () => {
  const category = categorySelect.value;
  
  if (category) {
    foodSelect.setDisabled(false);
    const foods = foodDatabase[category];
    foodSelect.setOptions(foods);
  } else {
    foodSelect.setDisabled(true);
    foodSelect.setOptions([]);
  }
  
  foodSelect.reset();
});

// 搜尋按鈕
document.getElementById("searchEnterBtn").addEventListener("click", () => {
  const foodId = foodSelect.value;
  
  if (foodId) {
    // 關閉搜尋視窗
    searchModal.style.display = "none";
    
    // 滾動到該食物
    const foodElement = document.getElementById(foodId);
    if (foodElement) {
      foodElement.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // 添加閃爍效果
      foodElement.style.transition = "all 0.3s";
      foodElement.style.boxShadow = "0 0 20px #F2AE2E";
      setTimeout(() => {
        foodElement.style.boxShadow = "";
      }, 2000);
    }
    
    // 重置選單
    closeSearchModal();
  }
});










/* 音效1 */
$(".shop-btn").click(function () {
    $("#jump-sound")[0].currentTime = 0; // 讓音效可重複快速播放
    $("#jump-sound")[0].play();          // 播放音效
});
$(".logo").click(function () {
    $("#jump-sound")[0].currentTime = 0;
    $("#jump-sound")[0].play();     
});
/* 音效2 */
$(".cart").click(function(e) {
    e.preventDefault(); // 先阻止立即跳頁
    const audio = $("#put-sound")[0];
    audio.currentTime = 0;
    audio.play();

    // 等音效播放 0.5 秒後再跳頁
    setTimeout(() => {
        window.location.href = $(this).parent().attr("href");
    }, 400);
});
$(".search-icon").click(function () {
    $("#put-sound")[0].currentTime = 0;
    $("#put-sound")[0].play();
});
$(".shopping-cart").click(function(e) {
    e.preventDefault(); // 先阻止立即跳頁
    const audio = $("#put-sound")[0];
    audio.currentTime = 0;
    audio.play();

    // 等音效播放 0.5 秒後再跳頁
    setTimeout(() => {
        window.location.href = $(this).parent().attr("href");
    }, 400);
});
/* 音效3 */
$(".search-enter-btn").click(function () {
    $("#light-sound")[0].currentTime = 0;
    $("#light-sound")[0].play();
});
/* 音效4 */
$(".close-btn").click(function () {
    $("#tallcase-sound")[0].currentTime = 0;
    $("#tallcase-sound")[0].play();
});
$(".close-btn-search").click(function () {
    $("#tallcase-sound")[0].currentTime = 0;
    $("#tallcase-sound")[0].play();
});
$(".close").click(function () {
    $("#tallcase-sound")[0].currentTime = 0;
    $("#tallcase-sound")[0].play();
});
$(".close-failed").click(function () {
    $("#tallcase-sound")[0].currentTime = 0;
    $("#tallcase-sound")[0].play();
});
$(".close-button").click(function () {
    $("#tallcase-sound")[0].currentTime = 0;
    $("#tallcase-sound")[0].play();
});
/* 音效5 */
$(".openNewsletter").click(function () {
    $("#cup-sound")[0].currentTime = 0;
    $("#cup-sound")[0].play();
});
$(".food-picture").click(function () {
    $("#cup-sound")[0].currentTime = 0;
    $("#cup-sound")[0].play();          
});
/* 音效6 */
$(".main-dish").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
$(".side-dish").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
$(".drinks").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
$(".dessert").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
$(".Subscribe").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
$(".Contact").click(function () {
    $("#box-sound")[0].currentTime = 0;
    $("#box-sound")[0].play();
});
/* 音效7 */
$(".contact-img").click(function () {
    $("#cat-sound")[0].currentTime = 0;
    $("#cat-sound")[0].play();
});
/* 音效8 */
$(".buy-it").click(function () {
    const coinSound = $("#coin-sound")[0];
    $("#coin-sound")[0].currentTime = 0;
    coinSound.volume = 0.2;
    $("#coin-sound")[0].play();
});


// 取得放大區塊元素
const show_food = document.getElementById("show-food");
const show_food_picture = document.getElementById("show-food-picture");
const show_food_name = document.getElementById("show-food-name");
const show_food_name_comm = document.getElementById("show-food-name-comm");
const show_food_introduction = document.getElementById("show-food-introduction");
const show_food_price = document.getElementById("show-food-price");
const closeBtn = document.getElementById("close");

// 取得所有食物卡片
const all_food_cards = document.querySelectorAll(".food-card");

// 點擊每個卡片的圖片 → 只在大螢幕顯示放大區塊
all_food_cards.forEach(card => {
  let img = card.querySelector("img");
  
  img.addEventListener("click", () => {
    // 檢查螢幕寬度，小螢幕不觸發
    if (window.innerWidth <= 376) {
      return;
    }
    
    // 取得卡片中的資料
    let name = card.querySelector(".food-name")?.childNodes[0].nodeValue.trim();
    let name_comm = card.querySelector(".food-name-comm")?.textContent || "";
    let price = card.querySelector(".food-price")?.textContent || "";
    let introduction = card.querySelector(".food-introduction")?.textContent || "";
  
    show_food_picture.src = img.src;
    show_food_name.textContent = name;
    show_food_name_comm.textContent = name_comm;
    show_food_introduction.textContent = introduction;
    show_food_price.textContent = price;

    // ✅ 顯示整個彈窗（改這裡）
    show_food.style.display = "flex";
  });
});

// 點 × 關閉
closeBtn.addEventListener("click", () => {
  // ✅ 隱藏整個彈窗（改這裡）
  show_food.style.display = "none";
});

// 需要觸發「跳轉失敗畫面」的按鈕們
var triggerIds = ["subscribe-btn", "about-us", "support", "payment", "help", "subscribeModalBtn"];
// 跳轉失敗的畫面
var show_failed = document.getElementById("show-failed");
// 替每一個按鈕加入點擊事件
triggerIds.forEach(function(id) {
    var btn = document.getElementById(id);
    if (btn) { // 避免某些元素不存在造成錯誤
        btn.onclick = function() {
            show_failed.style.display = "block";
        };
    }
});
// 關閉功能
var close_failed_button = document.getElementById("close-failed");
close_failed_button.onclick = function() {
    show_failed.style.display = "none";
};


// 放大視窗中的「加入購物車」按鈕
const enlargedBuyButton = document.querySelector("#show-food .buy-it");
enlargedBuyButton.addEventListener("click", () => {
  const name = show_food_name.textContent;
  const price = show_food_price.textContent;
  const imgSrc = show_food_picture.src;

  // 儲存到購物車
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, imgSrc });
  localStorage.setItem("cart", JSON.stringify(cart));

  // 飛行動畫
  const imgRect = show_food_picture.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const clone = show_food_picture.cloneNode(true);
  clone.classList.add("show-fly-img");
  document.body.appendChild(clone);

  clone.style.left = imgRect.left + "px";
  clone.style.top = imgRect.top + "px";

  setTimeout(() => {
    clone.style.transform = `
      translate(
        ${cartRect.left - imgRect.left}px,
        ${cartRect.top - imgRect.top}px
      )
      scale(0.2)
    `;
    clone.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 900);
});


// 小螢幕專用：下拉選單功能
document.querySelectorAll('.intro-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation(); // 防止觸發其他事件
    
    const intro = this.nextElementSibling;
    intro.classList.toggle('active');
    
    // 改變按鈕箭頭方向
    if (intro.classList.contains('active')) {
      this.textContent = 'Close ▲';
    } else {
      this.textContent = 'See more infos ▼';
    }
  });
});

// Sidebar 小螢幕
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

document.getElementById("openSidebar").addEventListener("click", () => {
  sidebar.classList.add("show");
  overlay.style.display = "block";
});

document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.style.display = "none";
});

// 加入購物車
const cartIcon = document.getElementById("shopping-cart");
const buyButtons = document.querySelectorAll(".buy-it");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".food-card");
    const name = card.querySelector(".food-name").childNodes[0].textContent.trim();
    const price = card.querySelector(".food-price").textContent.trim();
    const imgSrc = card.querySelector("img").getAttribute("src");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, imgSrc });
    localStorage.setItem("cart", JSON.stringify(cart));

    const foodImg = card.querySelector("img");
    if (!foodImg) return;

    const imgRect = foodImg.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = foodImg.cloneNode(true);
    clone.classList.add("fly-img");
    document.body.appendChild(clone);

    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";

    setTimeout(() => {
      clone.style.transform = `
        translate(
          ${cartRect.left - imgRect.left}px,
          ${cartRect.top - imgRect.top}px
        )
        scale(0.2)
      `;
      clone.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      clone.remove();
    }, 900);
  });
});

// Newsletter modal
const newsletter = document.getElementById("newsletterModal");
document.getElementById("openNewsletter").addEventListener("click", () => {
  newsletter.style.display = "flex";
});

document.getElementById("closeNewsletter").addEventListener("click", () => {
  newsletter.style.display = "none";
});

document.getElementById("subscribeModalBtn").addEventListener("click", () => {
  newsletter.style.display = "none";
});


