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