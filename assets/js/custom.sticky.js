  (function () {
    // Configuración personalizable
    const options = {
      selector: '.sticky',           // Selector del elemento sticky
      topSpacing: 0,                 // Espaciado superior en píxeles
      className: 'is-sticky',        // Clase que se añade cuando el elemento es sticky
      zIndex: 10                     // Valor de z-index para el elemento sticky
    };

    // Función para inicializar el comportamiento sticky
    function initSticky() {
      const stickyElements = document.querySelectorAll(options.selector);

      stickyElements.forEach((el) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('sticky-wrapper');
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        const originalOffsetTop = wrapper.offsetTop;

        function onScroll() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollTop > originalOffsetTop - options.topSpacing) {
            el.classList.add(options.className);
            el.style.position = 'fixed';
            el.style.top = options.topSpacing + 'px';
            el.style.zIndex = options.zIndex;
            wrapper.style.height = el.offsetHeight + 'px';
          } else {
            el.classList.remove(options.className);
            el.style.position = '';
            el.style.top = '';
            el.style.zIndex = '';
            wrapper.style.height = '';
          }
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', () => {
          wrapper.style.height = el.offsetHeight + 'px';
        });

        // Inicializar en caso de que la página ya esté desplazada
        onScroll();
      });
    }

    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', initSticky);
  })();