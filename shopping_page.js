let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-list");
const totalDiv = document.getElementById("total");

// 合併重複商品，計算數量
let cartMap = {};
cart.forEach(item => {
    const key = item.name;
    if (cartMap[key]) {
        cartMap[key].quantity += 1;
    } else {
        cartMap[key] = { ...item, quantity: 1 };
    }
});

const cartItems = Object.values(cartMap);

function renderCart() {
    cartList.innerHTML = "";
    const checkoutButton = document.getElementById("checkout");
    if (cartItems.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty! Go pick out your favorite meals!</p>";
        totalDiv.textContent = "";
        checkoutButton.classList.add("hidden"); // 添加 hidden class
        return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {
        const price = parseFloat(item.price.replace("$", ""));
        total += price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
            <div class="cart-cart">
                <span>$${price.toFixed(2)}</span>
                <div class="quantity-control">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <button class="remove-btn" data-index="${index}">Delete all</button>
            </div>
        `;
        cartList.appendChild(div);
    });

    totalDiv.textContent = `Total: $${total.toFixed(2)}`;

    // 刪除
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            saveCart();
            renderCart();
        });
    });

    // 增加數量
    document.querySelectorAll(".increase-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            cartItems[index].quantity += 1;
            saveCart();
            renderCart();
        });
    });

    // 減少數量
    document.querySelectorAll(".decrease-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
            } else {
                // 如果數量為1，再按就刪除
                cartItems.splice(index, 1);
            }
            saveCart();
            renderCart();
        });
    });
}

/* 音效 */
$(".back-page").click(function(e) {
    e.preventDefault(); // 先阻止立即跳頁
    const audio = $("#tallcase-sound")[0];
    audio.currentTime = 0;
    audio.play();

    // 等音效播放 0.5 秒後再跳頁
    setTimeout(() => {
        window.location.href = $(this).parent().attr("href");
    }, 200);
});
$(".close").click(function () {
    $("#tallcase-sound")[0].currentTime = 0; // 讓音效可重複快速播放
    $("#tallcase-sound")[0].play();          // 播放音效
});

// 將 cartItems 轉回 localStorage
function saveCart() {
    let flatCart = [];
    cartItems.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            flatCart.push({
                name: item.name,
                price: item.price,
                imgSrc: item.imgSrc
            });
        }
    });
    localStorage.setItem("cart", JSON.stringify(flatCart));
}

//按下結帳
var checkout_button = document.getElementById("checkout");
var show_checkout_failed = document.getElementById("show-checkout-failed");
checkout_button.onclick = function(){
    show_checkout_failed.style.display = "block";
}
// 添加關閉功能
var close_button = document.getElementById("close");
close_button.onclick = function(){
    show_checkout_failed.style.display = "none";
}

// 初始化渲染
renderCart();
