import React, { useState, useEffect, useRef } from 'react';

const products = [
  { id: 1, name: 'Jugo de Fresa y Plátano', size: '16oz', price: 2.50, badge: 'Más Vendido', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Smoothie de Mango', size: '10oz', price: 2.50, badge: 'Refrescante', image: './smoothie-de-mango.jpg' },
  { id: 3, name: 'Detox Verde Intenso', size: '16oz', price: 2.50, badge: 'Salud', image: './detox_verde_intenso.jpg' },
  { id: 4, name: 'Shot Inmune de Jengibre', size: '4oz', price: 2.50, badge: 'Energía', image: './shot_inmune_de_jengibre.jpg' },
  { id: 5, name: 'Naranja Prensada al Frío', size: '8oz', price: 2.50, badge: 'Clásico', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Antioxidante de Frutos Rojos', size: '16oz', price: 2.50, badge: 'Premium', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);
  const videoRef = useRef(null);
  const wasVideoPlaying = useRef(false);

  const handleVideoHover = () => {
    try {
      if (videoRef.current) videoRef.current.play();
    } catch (error) {}
  };

  const handleVideoClick = () => {
    try {
      if (videoRef.current) {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    } catch (error) {}
  };

  const handleAudioPlay = () => {
    try {
      if (videoRef.current) {
        wasVideoPlaying.current = !videoRef.current.paused;
        if (wasVideoPlaying.current) {
          videoRef.current.pause();
        }
      }
    } catch (e) {}
  };

  const handleAudioEnded = () => {
    try {
      if (wasVideoPlaying.current && videoRef.current) {
        videoRef.current.play();
      }
    } catch (e) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 50);
      setIsScrolled(currentScrollPos > 50);
      prevScrollPos.current = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);

    // Inicializar carrusel manualmente ya que React lo renderiza después de cargar el script
    try {
      const carouselElement = document.getElementById('heroCarousel');
      if (carouselElement && window.bootstrap) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: 'carousel',
          pause: false
        });
      }
    } catch (e) {}

    // Lógica para cerrar el menú móvil al hacer clic fuera de él
    const handleDocumentClick = (e) => {
      try {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (window.bootstrap && window.bootstrap.Collapse) {
              const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
              bsCollapse.hide();
            } else {
              navbarCollapse.classList.remove('show');
            }
          }
        }
      } catch (err) {}
    };
    
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const addToCart = (product) => {
    try {
      setCart([...cart, product]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (indexToRemove) => {
    try {
      setCart(cart.filter((_, index) => index !== indexToRemove));
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <nav 
        className={`navbar navbar-expand-lg fixed-top transition-all ${isScrolled ? 'navbar-glass py-2' : 'navbar-light bg-white py-3'}`} 
        style={{ 
          transition: 'transform 0.3s ease-in-out, background-color 0.3s ease, padding 0.3s ease',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="./logo.jpg" alt="Holistyc Fresh Logo" style={{ height: '55px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center me-4">
              <li className="nav-item"><a className="nav-link text-dark fw-medium mx-2" href="#inicio" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Inicio</a></li>
              <li className="nav-item"><a className="nav-link text-dark fw-medium mx-2" href="#quienes-somos" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Quiénes Somos</a></li>
              <li className="nav-item"><a className="nav-link text-dark fw-medium mx-2" href="#productos" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Catálogo</a></li>
              <li className="nav-item"><a className="nav-link text-dark fw-medium mx-2" href="#qr-section" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Descubre Más</a></li>
            </ul>
            <button 
              className="btn btn-success btn-add-cart d-flex align-items-center" 
              data-bs-toggle="modal" 
              data-bs-target="#cartModal"
            >
              <i className="bi bi-cart3 fs-5 me-2"></i>
              Mi Carrito
              {cart.length > 0 && (
                <span className="badge bg-white text-success rounded-pill ms-2 fs-6">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <header id="inicio" className="pt-5 mt-4">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img src="./imagen_fondo_carrusel.jpg" className="d-block w-100" alt="Bebidas frescas" />
              <div className="carousel-caption">
                <h2 className="animate__animated animate__fadeInDown">El Verdadero Sabor de la Naturaleza</h2>
                <p className="animate__animated animate__fadeInUp mb-4">Ingredientes orgánicos, sin conservantes ni azúcares añadidos.</p>
                <a href="#productos" className="btn btn-success btn-lg btn-add-cart">Ver Catálogo</a>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src="./jugo_de_mango_carrusel.jpeg" className="d-block w-100" alt="Frutas" />
              <div className="carousel-caption">
                <h2>Extracción Prensada en Frío</h2>
                <p>Mantenemos intactos todos los nutrientes y vitaminas para tu salud.</p>
                <a href="#productos" className="btn btn-success btn-lg btn-add-cart">Ver Catálogo</a>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src="./detox_verde_intenso.jpg" className="d-block w-100" alt="Tamaños" />
              <div className="carousel-caption">
                <h2>La Medida Perfecta Para Ti</h2>
                <p>Elige entre presentaciones de 4oz, 8oz, 10oz y 16oz según tu energía.</p>
                <a href="#productos" className="btn btn-success btn-lg btn-add-cart">Ver Catálogo</a>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon p-3 bg-dark rounded-circle bg-opacity-50" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon p-3 bg-dark rounded-circle bg-opacity-50" aria-hidden="true"></span>
          </button>
        </div>
      </header>

      <section id="quienes-somos" className="container py-5 my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="text-success fw-bold text-uppercase tracking-widest">Nuestra Historia</span>
            <h2 className="display-5 fw-bold text-dark mt-2 mb-4">¿Quiénes Somos?</h2>
            <p className="text-muted fs-5 mb-4">
              En Holistyc Fresh, creemos que la naturaleza tiene el poder de sanar, nutrir y revitalizar. Nuestro compromiso es brindarte las mejores bebidas frutales orgánicas con un enfoque holístico para tu bienestar.
            </p>
            <div className="bg-light p-3 rounded mb-4">
              <p className="mb-2 fw-bold text-dark"><i className="bi bi-mic-fill text-success me-2"></i>Escucha nuestro mensaje:</p>
              <audio 
                controls 
                className="w-100" 
                onPlay={handleAudioPlay} 
                onEnded={handleAudioEnded} 
                onPause={handleAudioEnded} 
                onError={(e) => e.target.style.display = 'none'}
              >
                <source src="./audio hablando sobre holystic.mpeg" type="audio/mpeg" />
              </audio>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg" style={{ background: '#000', cursor: 'pointer' }}>
              <video 
                ref={videoRef}
                className="w-100" 
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                preload="metadata"
                onMouseEnter={handleVideoHover}
                onClick={handleVideoClick}
                onError={(e) => e.target.style.display = 'none'}
              >
                <source src="./video sobre Holistyc.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase tracking-widest">Nuestra Especialidad</span>
            <h2 className="display-5 fw-bold text-dark mt-2">Bebidas Frutales Premium</h2>
            <p className="text-muted fs-5">Selecciona tu favorita y agrégala al carrito.</p>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
            {products.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 product-card border-0 shadow-sm bg-white">
                  <div className="position-relative overflow-hidden">
                    <span className="position-absolute top-0 start-0 m-3 badge bg-success fs-6 z-1">
                      {product.badge}
                    </span>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold fs-4 text-dark mb-0">{product.name}</h5>
                    </div>
                    <p className="text-muted mb-4 d-flex align-items-center">
                      <i className="bi bi-cup-straw text-success me-2 fs-5"></i>
                      Tamaño: <strong className="ms-1 text-dark">{product.size}</strong>
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-3 fw-bold text-success">${product.price.toFixed(2)}</span>
                      <button 
                        className="btn btn-dark btn-add-cart shadow-sm" 
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-plus-lg me-1"></i> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="qr-section" className="container py-5 my-5">
        <div className="row justify-content-center align-items-center g-5 text-center text-md-start">
          <div className="col-md-5">
            <div className="p-2 bg-white shadow-lg rounded-4 d-inline-block transition-all hover-scale" style={{ transform: 'rotate(-3deg)' }}>
              <img 
                src="./Matcha con QR.jpeg" 
                alt="QR Matcha" 
                className="img-fluid rounded-3" 
                style={{ maxHeight: '400px', objectFit: 'contain' }} 
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>
          <div className="col-md-5">
            <span className="badge bg-success mb-3 fs-6 px-3 py-2 rounded-pill">¡Descubre el Matcha!</span>
            <h2 className="display-4 fw-bold text-dark mb-3">Escanea para ver más</h2>
            <p className="text-muted fs-5 mb-4">
              Escanea nuestro código QR para descubrir los beneficios ocultos de nuestro Matcha Premium, promociones exclusivas y la historia detrás de nuestros ingredientes importados.
            </p>
            <a href="#productos" className="btn btn-outline-success btn-lg btn-add-cart">
              Comprar Ahora <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-success bg-opacity-10 py-5">
        <div className="container py-4">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <i className="bi bi-truck fs-1 text-success mb-3"></i>
              <h4 className="fw-bold">Delivery Fresh</h4>
              <p className="text-muted">Entregamos tu pedido frío y en menos de 45 minutos.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check fs-1 text-success mb-3"></i>
              <h4 className="fw-bold">Calidad Certificada</h4>
              <p className="text-muted">Proceso de desinfección avalado y frutas de granja local.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-recycle fs-1 text-success mb-3"></i>
              <h4 className="fw-bold">Eco-Friendly</h4>
              <p className="text-muted">Todos nuestros envases son biodegradables o compostables.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contacto" className="footer-advanced pt-5 pb-3">
        <div className="container">
          <div className="row gy-4 mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="mb-4">
                <img src="./logo.jpg" alt="Holistyc Fresh Logo" height="120" className="bg-white p-2 rounded-3 shadow-sm" style={{ objectFit: 'contain' }} />
              </div>
              <p className="pe-4" style={{ color: '#adb5bd' }}>
                Redefiniendo el concepto de bienestar. Bebidas extraídas con el mayor cuidado para nutrir tu cuerpo y alma en cada sorbo.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a href="https://www.instagram.com/holistyc_fresh/" target="_blank" rel="noopener noreferrer" className="fs-4 text-decoration-none">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="mb-3">Enlaces</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#inicio">Inicio</a></li>
                <li className="mb-2"><a href="#quienes-somos">Quiénes Somos</a></li>
                <li className="mb-2"><a href="#productos">Catálogo</a></li>
                <li className="mb-2"><a href="#qr-section">Descubre Más</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Términos y Condiciones</a></li>
                <li className="mb-2"><a href="#">Política de Privacidad</a></li>
                <li className="mb-2"><a href="#">Envíos y Devoluciones</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-3">Contacto</h5>
              <ul className="list-unstyled" style={{ color: '#adb5bd' }}>
                <li className="mb-2"><i className="bi bi-geo-alt text-success me-2"></i> Universidad Modular Abierta (UMA)</li>
                <li className="mb-2"><i className="bi bi-envelope text-success me-2"></i> holistycfresh@gmail.com</li>
                <li className="mb-2"><i className="bi bi-telephone text-success me-2"></i> +503 7942 1844</li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary mb-4" />
          <div className="text-center" style={{ color: '#adb5bd' }}>
            <small>© {new Date().getFullYear()} Holistyc Fresh. Diseñado con altos estándares profesionales.</small>
          </div>
        </div>
      </footer>

      <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-success text-white border-0 py-3">
              <h5 className="modal-title fw-bold d-flex align-items-center" id="cartModalLabel">
                <i className="bi bi-cart-check fs-4 me-2"></i> Resumen de tu Pedido
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4 bg-light">
              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                  <h4 className="mt-3 text-muted fw-bold">Tu carrito está vacío</h4>
                  <p className="text-muted">¡Anímate a probar nuestras bebidas premium!</p>
                  <button className="btn btn-outline-success mt-2" data-bs-dismiss="modal">Explorar Catálogo</button>
                </div>
              ) : (
                <div className="row">
                  <div className="col-12">
                    <ul className="list-group list-group-flush rounded shadow-sm">
                      {cart.map((item, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" key={index}>
                          <div className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                            <div className="ms-3">
                              <h6 className="my-0 fw-bold">{item.name}</h6>
                              <small className="text-muted d-block"><i className="bi bi-cup-straw"></i> {item.size}</small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="text-success fw-bold fs-5 me-4">${item.price.toFixed(2)}</span>
                            <button 
                              className="btn btn-sm btn-outline-danger rounded-circle" 
                              onClick={() => removeFromCart(index)}
                              title="Eliminar"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer bg-white border-top-0 py-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted d-block">Total a pagar:</span>
                <span className="fw-bold fs-2 text-dark">${total.toFixed(2)}</span>
              </div>
              <button type="button" className="btn btn-success btn-add-cart btn-lg px-5 shadow" data-bs-dismiss="modal" disabled={cart.length === 0}>
                Procesar Pago <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
