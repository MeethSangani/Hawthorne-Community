// Intersection Observer for fade-in effect (existing)
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Optional: remove 'visible' class when out of view
            // entry.target.classList.remove('visible'); 
        }
    });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Welcome card animation (existing)
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.welcome-card'); // Ensure this class exists on your welcome card
    if (card) { // Check if the card element exists
        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        cardObserver.observe(card);
    }

    // Map Toggle Logic (existing)
    const toggleMapBtn = document.getElementById('toggleMapBtn');
    const mapContainer = document.getElementById('mapContainer');

    // Initialize map to hidden and button to 'Show Map' if it's not already open
    // This assumes the initial state in HTML is max-height: 0; padding-top: 0;
    // If you want it open by default, change the initial style.
    let isMapVisible = false; // Initial state: hidden
    mapContainer.style.maxHeight = '0';
    mapContainer.style.paddingTop = '0';
    if (toggleMapBtn) { // Check if the button exists
        toggleMapBtn.textContent = 'Show Map'; 

        toggleMapBtn.addEventListener('click', () => {
            isMapVisible = !isMapVisible;
            mapContainer.style.maxHeight = isMapVisible ? '1000px' : '0'; // Large enough value to show content
            mapContainer.style.paddingTop = isMapVisible ? '1rem' : '0';
            toggleMapBtn.textContent = isMapVisible ? 'Hide Map' : 'Show Map';
        });

        // Optionally, if you want the map to be open by default on larger screens
        // or close it on smaller screens if it was open on desktop
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        function handleMediaQueryChange(e) {
            if (e.matches) { // Desktop view
                if (!isMapVisible) { // If currently hidden on desktop
                    mapContainer.style.maxHeight = '0';
                    mapContainer.style.paddingTop = '0';
                    isMapVisible = false;
                    toggleMapBtn.textContent = 'Show Map';
                }
            } else { // Mobile view
                if (isMapVisible) { // If currently visible on mobile
                    mapContainer.style.maxHeight = '0';
                    mapContainer.style.paddingTop = '0';
                    isMapVisible = false;
                    toggleMapBtn.textContent = 'Show Map';
                }
            }
        }
        handleMediaQueryChange(mediaQuery); // Run once on load
        mediaQuery.addListener(handleMediaQueryChange); // Listen for changes
    }


    // Mobile Navigation Toggle (NEW)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggles the 'active' class on the nav element
            // Optionally, change hamburger icon to 'X'
            const icon = mobileMenuButton.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 'fa-times' for an 'X' icon
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked (optional but good UX)
        const navLinks = mainNav.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
});