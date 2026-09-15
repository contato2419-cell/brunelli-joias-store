/* ==========================================================================
   Main Controller & Interactions - Brunelli Joias
   ========================================================================== */

(function() {

  // ==========================================================================
  // 1. Live Countdown Timer (00 Dia : 05 Hora : 52 Min : 59 Seg)
  // ==========================================================================
  function initCountdown() {
    let targetTime = Date.now() + (5 * 3600 + 52 * 60 + 59) * 1000;

    function update() {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');

      const dEl = document.getElementById('timer-days');
      const hEl = document.getElementById('timer-hours');
      const mEl = document.getElementById('timer-mins');
      const sEl = document.getElementById('timer-secs');

      if (dEl) dEl.textContent = pad(days);
      if (hEl) hEl.textContent = pad(hours);
      if (mEl) mEl.textContent = pad(mins);
      if (sEl) sEl.textContent = pad(secs);
    }

    update();
    setInterval(update, 1000);
  }

  // ==========================================================================
  // 2. Category Filter Selection (Circles)
  // ==========================================================================
  window.filterByCategory = function(categoryName) {
    const buttons = document.querySelectorAll('.category-circle-item');
    buttons.forEach(b => {
      if (b.getAttribute('data-cat') === categoryName) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });

    window.showToast(`Visualizando peças exclusivas: ${categoryName}`);
    
    // Mapeamento de categorias para os IDs das seções
    const targetMap = {
      'MASCULINO': 'masculino',
      'PULSEIRA FEMININA': 'pulseira-feminina',
      'PULSEIRA FEM.': 'pulseira-feminina',
      'PIERCINGS': 'piercings',
      'ANÉIS': 'aneis',
      'PULSEIRA BERLOQUE/CHARMS': 'berloques',
      'BRINCO ARGOLAS': 'argolas',
      'BRINCOS TARRACHAS': 'tarrachas',
      'CONJUNTO': 'conjunto',
      'COLARES': 'colares'
    };
    
    const targetId = targetMap[categoryName];
    if (targetId) {
      const showcase = document.getElementById(targetId);
      if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ==========================================================================
  // 3. Search Bar Handler
  // ==========================================================================
  window.handleSearch = function() {
    const overlay = document.getElementById('search-overlay-panel');
    const input = document.getElementById('custom-search-input');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (input) setTimeout(() => input.focus(), 300);
    }
  };

  window.closeSearchOverlay = function() {
    const overlay = document.getElementById('search-overlay-panel');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.executeSearch = function() {
    const input = document.getElementById('custom-search-input');
    if (input && input.value.trim() !== "") {
      window.closeSearchOverlay();
      window.showToast(`Buscando joias por: "${input.value.trim()}"...`);
      const showcase = document.getElementById('categorias');
      if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ==========================================================================
  // 4. Mobile Menu Navigation Toggle
  // ==========================================================================
  window.toggleMobileMenu = function() {
    const nav = document.querySelector('.categories-nav-bar');
    if (nav) {
      nav.classList.toggle('active');
    }
  };

  // ==========================================================================
  // 5. Toast Hub
  // ==========================================================================
  window.showToast = function(message) {
    // Notificações desativadas a pedido do usuário
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
  });
})();

function initScrollIndicators() {
  const containers = document.querySelectorAll('.products-grid-container');
  containers.forEach(container => {
    const checkScroll = () => {
      if (window.innerWidth >= 1024) return;
      const existing = container.parentNode.querySelector('.scroll-indicators');
      if (existing) existing.remove();
      
      if (container.scrollWidth > container.clientWidth + 10) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scroll-indicators';
        
        const numItems = container.children.length;
        const itemsPerPage = 2; 
        const numDots = Math.ceil(numItems / itemsPerPage) + (numItems % 2 !== 0 ? 1 : 0);
        const finalDots = numDots > 1 ? numDots : 2; // At least 2 dots if it scrolls
        
        for(let i=0; i<finalDots; i++) {
          const dot = document.createElement('div');
          dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
          wrapper.appendChild(dot);
        }
        
        container.parentNode.insertBefore(wrapper, container.nextSibling);
        
        container.addEventListener('scroll', () => {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const scrollPercent = maxScroll > 0 ? (container.scrollLeft / maxScroll) : 0;
          
          const dots = wrapper.querySelectorAll('.scroll-dot');
          dots.forEach(d => d.classList.remove('active'));
          
          let activeIndex = Math.round(scrollPercent * (dots.length - 1));
          if (activeIndex >= dots.length) activeIndex = dots.length - 1;
          if (dots[activeIndex]) dots[activeIndex].classList.add('active');
        });
      }
    };
    
    setTimeout(checkScroll, 500);
    window.addEventListener('resize', () => {
      setTimeout(checkScroll, 300);
    });
  });
}
document.addEventListener('DOMContentLoaded', initScrollIndicators);

