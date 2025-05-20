document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // CTA button scroll to categories
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
                window.scrollTo({
                    top: categoriesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Modal functionality
    const modal = document.getElementById('previewModal');
    const previewButtons = document.querySelectorAll('.preview-button');
    const closeModal = document.querySelector('.close-modal');
    const previewVideo = document.getElementById('previewVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalResolution = document.getElementById('modalResolution');
    const modalSize = document.getElementById('modalSize');
    const modalFormat = document.getElementById('modalFormat');
    const modalDownload = document.getElementById('modalDownload');

    // Sample wallpaper data (in a real application, this would come from a database)
    const wallpaperData = [
        {
            id: 1,
            title: 'Tropical Rainforest',
            description: 'Experience the lush, vibrant atmosphere of a tropical rainforest with gentle leaf movements and occasional wildlife.',
            videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-trees-in-the-jungle-2740-large.mp4',
            resolution: '1920x1080',
            size: '15.2 MB',
            format: 'MP4'
        },
        {
            id: 2,
            title: 'Sunset Beach Waves',
            description: 'Relax with the gentle rhythm of ocean waves at sunset, featuring golden hour colors and soothing water movements.',
            videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-1164-large.mp4',
            resolution: '3840x2160',
            size: '24.7 MB',
            format: 'MP4'
        },
        {
            id: 3,
            title: 'Snowy Mountain Peak',
            description: 'Majestic snow-capped mountain peaks with subtle cloud movements and pristine winter scenery.',
            videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4',
            resolution: '2560x1440',
            size: '18.9 MB',
            format: 'MP4'
        },
        {
            id: 4,
            title: 'Calm Lake Reflection',
            description: 'Peaceful lake scene with perfect reflections of surrounding mountains and subtle ripples on the water surface.',
            videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
            resolution: '1920x1080',
            size: '12.5 MB',
            format: 'MP4'
        }
    ];

    // Open modal with wallpaper preview
    previewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const wallpaper = wallpaperData[index] || wallpaperData[0];
            
            // Set modal content
            modalTitle.textContent = wallpaper.title;
            modalDescription.textContent = wallpaper.description;
            modalResolution.textContent = wallpaper.resolution;
            modalSize.textContent = wallpaper.size;
            modalFormat.textContent = wallpaper.format;
            
            // Set video source
            const videoSource = previewVideo.querySelector('source');
            videoSource.src = wallpaper.videoSrc;
            previewVideo.load();
            previewVideo.play();
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        previewVideo.pause();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            previewVideo.pause();
        }
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-button, #modalDownload');
    downloadButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // In a real application, this would trigger a download
            // For this demo, we'll just show an alert
            alert('Download started! In a real application, this would download the wallpaper file.');
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive updates about new wallpapers.`);
                emailInput.value = '';
            }
        });
    }

    // Animated entrance for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .wallpaper-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.category-card, .wallpaper-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});

