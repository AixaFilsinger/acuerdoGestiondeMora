emailjs.init('H1lUhKUJeG2jMCjfo'); 

const btn = document.getElementById('boton-contacto');
const form = document.getElementById('form');
const modalContacto = new bootstrap.Modal(document.getElementById('modal-contacto')); 

form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  btn.innerText = 'Enviando...'; 

  const serviceID = 'service_1zdjs8i';
  const templateID = 'template_lfy1oyv';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.innerText = 'Enviar'; 
      modalContacto.show();
      form.reset(); 
    })
    .catch((err) => {
      btn.innerText = 'Enviar'; 
      alert(`Error: ${JSON.stringify(err)}`);
    });
});