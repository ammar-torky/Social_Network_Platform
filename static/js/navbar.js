  
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (href !== '/' && currentPath.includes(href))) {
                link.parentElement.classList.add('active');
            }
        });
    
        const searchBox = document.querySelector('.form-control');
        if (searchBox) {
            searchBox.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.03)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            searchBox.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        }
    });
    