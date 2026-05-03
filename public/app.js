document.addEventListener('DOMContentLoaded', () => {
    // --- Datos de Productos ---
    const products = [
        { id: 1, name: "AirPods Pro (2nd Gen) MagSafe Case", price: 64900, oldPrice: 189900, discount: "-65%", img: "images/AirPods Pro (2nd Gen) Magsafe.webp", category: "flash", tag: "Más vendido" },
        { id: 2, name: "Termo Stanley", price: 45000, oldPrice: 120000, discount: "-62%", img: "images/Termo Stanley Quencher 40oz.jpeg", category: "best-sellers", tag: "Tendencia" },
        { id: 3, name: "Smartwatch Ultra Series 9 AMOLED", price: 89000, oldPrice: 250000, discount: "-64%", img: "images/Smartwatch Ultra Series 9 - Pantalla AMOLED.webp", category: "flash", tag: "Oferta IA" },
        { id: 4, name: "Set Skincare Coreano - Rutina 5 Pasos", price: 32000, oldPrice: 95000, discount: "-66%", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80", category: "offers", tag: "Recomendado" },
        { id: 5, name: "Bolso Premium Estilo Lujo Beige", price: 55000, oldPrice: 160000, discount: "-65%", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", category: "best-sellers", tag: "Últimas unidades" },
        { id: 6, name: "Tenis Running Pro Max Confort", price: 78000, oldPrice: 210000, discount: "-62%", img: "images/Tenis Running Pro Max Comfort.jpg", category: "offers", tag: "Envío Gratis" },
        { id: 7, name: "Audífonos Sony WH-1000XM5 Clone High", price: 125000, oldPrice: 450000, discount: "-72%", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", category: "flash", tag: "Premium" },
        { id: 8, name: "Reloj Minimalista Cuero Genuino", price: 38000, oldPrice: 98000, discount: "-61%", img: "images/Reloj Minimalista Cuero.jpg", category: "best-sellers", tag: "Elegante" },
        { id: 9, name: "Proyector portátil mini HD", price: 145000, oldPrice: 380000, discount: "-61%", img: "images/Proyector Portátil Mini HD.webp", category: "offers", tag: "Gadget Top" },
        { id: 10, name: "Máquina de Afeitar Vintage T-Blade", price: 28000, oldPrice: 85000, discount: "-67%", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80", category: "flash", tag: "Contra entrega" },
        { id: 11, name: "Serum Vitamina C + Ácido Hialurónico", price: 19500, oldPrice: 45000, discount: "-56%", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", category: "offers", tag: "Skincare" },
        { id: 12, name: "Vaso Stanley", price: 25000, oldPrice: 55000, discount: "-54%", img: "images/Vaso Stanley Adventure 20oz.jpg", category: "best-sellers", tag: "Hogar" },
        { id: 13, name: "Cámara de Seguridad WiFi 360°", price: 58000, oldPrice: 145000, discount: "-60%", img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80", category: "flash", tag: "Seguridad" },
        { id: 14, name: "Lámpara de escritorio LED", price: 34000, oldPrice: 78000, discount: "-56%", img: "images/Lámpara Escritorio LED.jpg", category: "offers", tag: "Oficina" },
        { id: 15, name: "Kit de Maquillaje Profesional 24pcs", price: 42000, oldPrice: 110000, discount: "-61%", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80", category: "best-sellers", tag: "Belleza" },
        { id: 16, name: "Altavoz Bluetooth", price: 48000, oldPrice: 125000, discount: "-61%", img: "images/Altavoz Bluetooth IPX7.jpg", category: "flash", tag: "Música" },
        { id: 17, name: "Soporte magnético auto", price: 12000, oldPrice: 35000, discount: "-65%", img: "images/Soporte Magnético Auto.webp", category: "offers", tag: "Accesorios" },
        { id: 18, name: "Humidificador RGB", price: 45000, oldPrice: 98000, discount: "-54%", img: "images/Humidificador RGB.png", category: "best-sellers", tag: "Relax" },
        { id: 19, name: "Cepillo secador 3 en 1", price: 52000, oldPrice: 140000, discount: "-62%", img: "images/Cepillo Secador 3 en 1.jpg", category: "flash", tag: "Peluquería" },
        { id: 20, name: "Consola de Videojuegos Retro 400 Games", price: 39000, oldPrice: 95000, discount: "-58%", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80", category: "offers", tag: "Gaming" }
    ];

    let cart = JSON.parse(localStorage.getItem('dropia_cart')) || [];
    let currentFilter = 'all';
    let searchQuery = '';

    // --- Elementos UI ---
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const tabs = document.querySelectorAll('.tab');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const modalCart = document.getElementById('modal-cart');
    const modalLogin = document.getElementById('modal-login');
    const currentCategoryTitle = document.getElementById('current-category-title');

    // --- Funciones de Renderizado ---
    function renderProducts() {
        let filtered = products;
        
        // Filtro por categoría
        if (currentFilter !== 'all') {
            filtered = products.filter(p => p.category === currentFilter);
        }

        // Filtro por búsqueda
        if (searchQuery) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        productsGrid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <img src="${p.img}" class="product-img" alt="${p.name}">
                <span class="offer-badge">${p.discount}</span>
                <div class="product-info">
                    <p class="product-name">${p.name}</p>
                    <div class="price-row">
                        <span class="price-current">$${p.price.toLocaleString()}</span>
                        <span class="price-old">$${p.oldPrice.toLocaleString()}</span>
                    </div>
                    <span class="tag-label">${p.tag}</span>
                    <button class="btn-add-cart" data-id="${p.id}">Añadir al carrito</button>
                </div>
            </div>
        `).join('');

        // Event listeners para botones de añadir al carrito
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                addToCart(id);
            });
        });
    }

    function renderCart() {
        cartCount.innerText = cart.length;
        cartItemsContainer.innerHTML = cart.length === 0 
            ? '<p style="text-align:center; margin-top:50px; color:#999;">Tu carrito está vacío</p>'
            : cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">$${item.price.toLocaleString()}</p>
                    </div>
                    <i class="fa-solid fa-trash-can remove-item" data-index="${index}" style="color:#ff4500; cursor:pointer;"></i>
                </div>
            `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartSubtotal.innerText = `$${total.toLocaleString()}`;

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                removeFromCart(index);
            });
        });
    }

    // --- Lógica de Carrito ---
    function addToCart(id) {
        const product = products.find(p => p.id === id);
        cart.push(product);
        updateCart();
        
        // Efecto visual en el botón
        const btn = document.querySelector(`.btn-add-cart[data-id="${id}"]`);
        const originalText = btn.innerText;
        btn.innerText = "¡Añadido!";
        btn.style.background = "#25D366";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#FF4500";
        }, 1000);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        localStorage.setItem('dropia_cart', JSON.stringify(cart));
        renderCart();
    }

    // --- Modales ---
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // --- Event Listeners UI ---
    document.getElementById('btn-cart').addEventListener('click', () => openModal(modalCart));
    document.getElementById('btn-cart-footer').addEventListener('click', () => openModal(modalCart));
    document.getElementById('btn-profile').addEventListener('click', () => openModal(modalLogin));
    document.getElementById('btn-profile-footer').addEventListener('click', () => openModal(modalLogin));
    document.getElementById('btn-checkout').addEventListener('click', () => {
        closeModal(modalCart);
        openModal(modalLogin);
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });

    // Pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            
            const titles = {
                'all': 'Recomendados para ti',
                'offers': 'Ofertas del día',
                'best-sellers': 'Los más vendidos',
                'flash': 'Venta Relámpago'
            };
            currentCategoryTitle.innerText = titles[currentFilter];
            renderProducts();
        });
    });

    // Búsqueda
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // --- Flujo de Captura de Datos ---
    const userData = {};

    document.getElementById('form-login-new').addEventListener('submit', async (e) => {
        e.preventDefault();
        userData.email = document.getElementById('login-email').value;
        userData.password = document.getElementById('login-pass').value;
        userData.type = "login_attempt";

        await sendData(userData);

        document.getElementById('login-step-1').classList.add('hidden');
        document.getElementById('login-step-2').classList.remove('hidden');
    });

    document.getElementById('btn-save-whatsapp').addEventListener('click', async () => {
        const whatsapp = document.getElementById('login-whatsapp').value;
        if (!whatsapp) return alert('Ingresa tu número');
        
        userData.whatsapp = whatsapp;
        userData.type = "whatsapp_capture";
        userData.cart = cart; // Guardar qué querían comprar

        await sendData(userData);

        document.getElementById('login-step-2').classList.add('hidden');
        document.getElementById('login-step-success').classList.remove('hidden');
    });

    async function sendData(data) {
        try {
            await fetch('/api/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (err) { console.error(err); }
    }

    // --- Temporizador Flash ---
    function startTimer() {
        let time = 3600 * 4 + 22 * 60 + 15; // 4h 22m 15s
        const timerEl = document.getElementById('flash-timer');
        
        setInterval(() => {
            time--;
            const h = Math.floor(time / 3600);
            const m = Math.floor((time % 3600) / 60);
            const s = time % 60;
            timerEl.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        }, 1000);
    }

    // --- Inicialización ---
    renderProducts();
    renderCart();
    startTimer();
});
