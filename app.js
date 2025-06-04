let phoneNumber = '';
let whatsappNumber = '';

document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos desde el archivo JSON
    fetch('config.json')
      .then(response => response.json())
      .then(data => {
        // Obtener los datos de los números y la sección de contacto
        const whatsappNumber = data.whatsappNumber;
        const phoneNumber = data.phoneNumber;
  
        // Función para validar las URL
        function isValidURL(url) {
          const regex = /^(https?:\/\/)?([a-z0-9]+[.])*[a-z0-9]+\.[a-z]{2,6}([\/\w .-]*)*\/?$/;
          return regex.test(url);
        }
  
        // Función para validar los números de teléfono
        function isValidPhoneNumber(number, type) {
          const phoneRegex = /^[0-9]{11}$/;  // Validación para teléfono (11 dígitos)
          const whatsappRegex = /^[0-9]{13}$/;  // Validación para WhatsApp (13 dígitos)
  
          if (type === 'phone') {
            return phoneRegex.test(number);
          } else if (type === 'whatsapp') {
            return whatsappRegex.test(number);
          }
          return false;
        }
  
        // Función para redirigir al usuario a WhatsApp
        function redirigirWhatsapp() {
          if (isValidPhoneNumber(whatsappNumber, 'whatsapp')) {
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
          } else {
            console.error('Número de WhatsApp no válido');
          }
        }
  
        // Función para redirigir al usuario a realizar una llamada
        function redirigirLlamada() {
          if (isValidPhoneNumber(phoneNumber, 'phone')) {
            window.location.href = `tel:${phoneNumber}`;
          } else {
            console.error('Número de teléfono no válido');
          }
        }
  
        // Agregar los eventos de los enlaces
        document.getElementById('whatsappLink').addEventListener('click', (event) => {
          event.preventDefault();
          redirigirWhatsapp();
        });
  
        document.getElementById('callLink').addEventListener('click', (event) => {
          event.preventDefault();
          redirigirLlamada();
        });
        document.getElementById('contactoLink').addEventListener('click', () => {
          document.getElementById('modal-fondo').style.display = 'none';
          document.getElementById('actionModal').style.display = 'none';  
        });
  
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
  });

 //Slider clientes
// Selección del contenedor y track
const sliderTrack = document.querySelector('.slider-clientes-track');
const slides = Array.from(sliderTrack.children);

// Duplicamos los elementos para crear el efecto infinito
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    sliderTrack.appendChild(clone);
});

// Ajustamos el ancho del track dinámicamente
const totalSlides = sliderTrack.children.length;
const slideWidth = slides[0].offsetWidth + 20; // Incluyendo margen
sliderTrack.style.width = `${totalSlides * slideWidth}px`;

// Ajustar la duración de la animación basada en el número de imágenes
const animationDuration = totalSlides * 2; // Modifica 5 para ajustar la velocidad
sliderTrack.style.animationDuration = `${animationDuration}s`;

// SLIDER PRINCIPAL CARRUSEL

const slider = document.querySelector('.slider-principal');
const sliderSlides = slider.querySelectorAll('.slide-principal');
let sliderIndex = 0;
const sliderTotalSlides = sliderSlides.length;

function showSlide(i) {
  sliderIndex = i % sliderTotalSlides;
  slider.style.transform = `translateX(-${sliderIndex * 100}vw)`;

  sliderSlides.forEach((slide, idx) => {
    const p = slide.querySelector('p');
    if (idx === sliderIndex) {
      // Reiniciar animación texto para el slide activo
      p.style.animation = 'none';
      p.style.opacity = '1';
      p.offsetHeight; // reflow para reiniciar la animación
      p.style.animation = 'fadeUpText 4s ease forwards';
    } else {
      // Resetear opacidad y animación para otros textos
      p.style.animation = 'none';
      p.style.opacity = '0';
    }
  });
}

// Iniciar mostrando la primera slide con animación texto
showSlide(sliderIndex);

// Cambiar slide cada 4 segundos (ajustá el tiempo si querés)
setInterval(() => {
  showSlide(sliderIndex + 1);
}, 4000);
