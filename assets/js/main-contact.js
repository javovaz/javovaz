const steps = document.querySelectorAll('.step');
let currentStep = 0;

// Mostrar la siguiente sección
function nextStep() {
    steps[currentStep].classList.remove('active');
    currentStep++;
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
    }
}

// Validar cada paso (excepto el de contacto que tiene su propia validación)
function validateStep(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(`error-${id}`);
    if (input.value.trim() === '') {
        error.style.display = 'block';
        return false;
    }
    error.style.display = 'none';
    nextStep();
}

// Validar los campos de contacto (teléfono y email)
function validateContacto() {
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const errorTelefono = document.getElementById('error-telefono');
    const errorEmail = document.getElementById('error-email');
    let isValid = true;

    // Validación del teléfono
    if (telefonoInput.value.trim() === '') {
        errorTelefono.textContent = 'Por favor, ingresa tu número de teléfono.';
        errorTelefono.style.display = 'block';
        isValid = false;
    } else if (!/^\d+$/.test(telefonoInput.value)) {
        errorTelefono.textContent = 'Por favor, ingresa un número de teléfono válido (solo dígitos).';
        errorTelefono.style.display = 'block';
        isValid = false;
    } else {
        errorTelefono.style.display = 'none';
    }

    // Validación del email
    if (emailInput.value.trim() === '') {
        errorEmail.textContent = 'Por favor, ingresa tu dirección de correo electrónico.';
        errorEmail.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        errorEmail.textContent = 'Por favor, ingresa una dirección de correo electrónico válida.';
        errorEmail.style.display = 'block';
        isValid = false;
    } else {
        errorEmail.style.display = 'none';
    }

    if (isValid) {
        nextStep();
    }
}

// Función para enviar los datos por WhatsApp y pasar al step 8
function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value;
    const proyecto = document.getElementById('proyecto').value;
    const web = document.getElementById('web').value;
    const interes = document.getElementById('interes').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const medio = document.getElementById('medio-contacto').value;
    const codPaisElement = document.getElementById('selected-code');
    const codPais = codPaisElement ? codPaisElement.textContent : '+54'; // Valor por defecto si no se encuentra el elemento

    const mensaje = `Hola! Soy ${nombre}. Tengo un proyecto de ${proyecto}. Sitio web: ${web}. Me interesa: ${interes}. Podés contactarme por ${medio}. Teléfono: ${codPais} ${telefono}. Email: ${email}`;

    const url = `https://wa.me/5492235480277?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    // Avanzar directamente al step 8 (thank you page)
    steps[currentStep].classList.remove('active');
    currentStep = 7; // El índice del step 8 es 7 (los índices son base 0)
    steps[currentStep].classList.add('active');
}

// Configurar dropdown para el código de país
const countrySelect = document.getElementById("custom-codigo-pais");
countrySelect.addEventListener("click", () => {
    countrySelect.classList.toggle("open");
});

const options = document.querySelectorAll('.custom-dropdown .dropdown-options li');
options.forEach(option => {
    option.addEventListener('click', function () {
        const countryCode = this.getAttribute('data-value');
        const flagImg = this.querySelector('img').src;

        // Actualiza visual en dropdown
        const selectedContainer = document.getElementById('custom-codigo-pais').querySelector('.selected');
        selectedContainer.querySelector('img').src = flagImg;
        selectedContainer.querySelector('span').textContent = countryCode;

        // Actualiza campo oculto
        document.getElementById('codigo-pais').value = countryCode;

        // Actualiza placeholder de teléfono
        const tel = document.getElementById('telefono');
        switch (countryCode) {
            case '+54':
                tel.placeholder = '911 1234 5678';
                break;
            case '+34':
                tel.placeholder = '612 345 678';
                break;
            case '+1':
                tel.placeholder = '555 123 4567';
                break;
            case '+39':
                tel.placeholder = '312 123 4567';
                break;
            default:
                tel.placeholder = 'Ej: código local + número';
        }

        // Actualiza el texto visible del código de país
        const selectedCodeElement = document.getElementById('selected-code');
        if (selectedCodeElement) {
            selectedCodeElement.textContent = countryCode;
        }
    });
});

// Mostrar nombre en pasos posteriores
const nombre = document.getElementById('nombre');
nombre.addEventListener('blur', function () {
    const nombrePreview = document.getElementById('nombre-preview');
    const nombrePreview2 = document.getElementById('nombre-preview2');
    nombrePreview.textContent = nombre.value;
    nombrePreview2.textContent = nombre.value;
});