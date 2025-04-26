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
        // إزالة أي تأثيرات على التركيز أو عند الخروج
        searchBox.addEventListener('focus', function() {
            // لا يوجد أي تغييرات في الحجم أو أي تأثيرات أخرى
        });
        
        searchBox.addEventListener('blur', function() {
            // لا يوجد أي تغييرات في الحجم أو أي تأثيرات أخرى
        });
    }
});
