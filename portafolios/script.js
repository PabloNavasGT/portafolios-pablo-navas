document.addEventListener('DOMContentLoaded', () => {

    // Language & Translation System (Optimized)
    let currentLang = 'es';
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');

    const setLanguage = (lang) => {
        currentLang = lang;
        
        document.querySelectorAll('[data-en]').forEach(el => {
            // Guarda el texto original en español la primera vez
            if (!el.dataset.es) el.dataset.es = el.textContent.trim();
            // Alterna entre los dos textos guardados
            el.textContent = (lang === 'en') ? el.dataset.en : el.dataset.es;
        });

        // Estilos visuales de los botones
        btnEn.classList.toggle('bg-brand-red', lang === 'en');
        btnEn.classList.toggle('text-white', lang === 'en');
        btnEn.classList.toggle('text-gray-400', lang !== 'en');

        btnEs.classList.toggle('bg-brand-red', lang === 'es');
        btnEs.classList.toggle('text-white', lang === 'es');
        btnEs.classList.toggle('text-gray-400', lang !== 'es');
    };

    btnEs.addEventListener('click', () => setLanguage('es'));
    btnEn.addEventListener('click', () => setLanguage('en'));
    
    // Mobile Menu Setup
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Skills Filter Logic
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-brand-red', 'shadow-lg', 'shadow-brand-red/30');
                b.classList.add('bg-gray-800', 'hover:bg-gray-700', 'border', 'border-gray-700');
            });
            
            btn.classList.add('active', 'bg-brand-red', 'shadow-lg', 'shadow-brand-red/30');
            btn.classList.remove('bg-gray-800', 'hover:bg-gray-700', 'border', 'border-gray-700');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal Logic for Skills
    const skillModal = document.getElementById('skillModal');
    const skillModalBackdrop = document.getElementById('skillModalBackdrop');
    const skillModalContent = document.getElementById('skillModalContent');
    const closeSkillModal = document.getElementById('closeSkillModal');
    
    const modalIcon = document.getElementById('modalSkillIcon');
    const modalTitle = document.getElementById('modalSkillTitle');
    const modalDesc = document.getElementById('modalSkillDesc');

    const openModal = (card) => {
        // Get data from clicked card based on current language
        const titleEn = card.getAttribute('data-title-en');
        const title = (currentLang === 'en' && titleEn) ? titleEn : card.getAttribute('data-title');
        
        const descEn = card.getAttribute('data-desc-en');
        const descEs = card.getAttribute('data-desc-es') || card.getAttribute('data-desc');
        const desc = (currentLang === 'en' && descEn) ? descEn : descEs;

        const iconHTML = card.getAttribute('data-icon');

        // Populate modal
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalIcon.innerHTML = iconHTML;

        // Show modal
        skillModal.classList.remove('hidden');
        
        requestAnimationFrame(() => {
            skillModalBackdrop.classList.remove('opacity-0');
            skillModalBackdrop.classList.add('opacity-100');
            
            skillModalContent.classList.remove('scale-95', 'opacity-0');
            skillModalContent.classList.add('scale-100', 'opacity-100');
        });
        
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        skillModalBackdrop.classList.remove('opacity-100');
        skillModalBackdrop.classList.add('opacity-0');
        
        skillModalContent.classList.remove('scale-100', 'opacity-100');
        skillModalContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            skillModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    skillCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeSkillModal.addEventListener('click', closeModal);
    skillModalBackdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !skillModal.classList.contains('hidden')) {
            closeModal();
        }
    });

});
