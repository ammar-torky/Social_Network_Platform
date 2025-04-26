// Modern Profile Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initial animations with modern timing
    animateProfileElements();
    
    // Create a modern hover effect for all cards
    setupCardHoverEffects();
    
    // Enhanced button interactions
    setupButtonInteractions();
    
    // Add scroll animations
    setupScrollAnimations();
});

function animateProfileElements() {
    // Animate profile card with smooth entrance
    const profileCard = document.querySelector('.col-md-3 .card');
    fadeInElement(profileCard, 300);
    
    // Stagger animation for all posts
    const posts = document.querySelectorAll('.col-md-8 .card .card');
    posts.forEach((post, index) => {
        fadeInElement(post, 400 + (index * 120));
    });
    
    // Subtle animation for the new post button
    const newPostBtn = document.querySelector('a h1');
    if (newPostBtn) {
        fadeInElement(newPostBtn, 600);
    }
}

function fadeInElement(element, delay) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

function setupCardHoverEffects() {
    // Enhanced hover effect for all cards
    const allCards = document.querySelectorAll('.card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Special effect for profile image
    const profileImg = document.querySelector('.img-thumbnail');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function setupButtonInteractions() {
    // Delete button confirmation with modern styling
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this post?')) {
                e.preventDefault();
            }
        });
    });
    
    // Enhanced "New Post" button interaction
    const newPostBtn = document.querySelector('a h1');
    if (newPostBtn) {
        newPostBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#4299e1';
            this.style.color = 'white';
            this.style.boxShadow = '0 5px 15px rgba(66, 153, 225, 0.3)';
            if (this.querySelector('.fa-pencil')) {
                this.querySelector('.fa-pencil').style.color = 'white';
            }
        });
        
        newPostBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#ebf8ff';
            this.style.color = '#2d3748';
            this.style.boxShadow = 'none';
            if (this.querySelector('.fa-pencil')) {
                this.querySelector('.fa-pencil').style.color = '#4299e1';
            }
        });
    }
    
    // Add hover effects to all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 5px 15px rgba(66, 153, 225, 0.3)';
            } else if (this.classList.contains('btn-danger')) {
                this.style.boxShadow = '0 5px 15px rgba(245, 101, 101, 0.3)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function setupScrollAnimations() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll reveal effect for posts
    const allPosts = document.querySelectorAll('.col-md-8 .card .card');
    
    // Only set up scroll animation if we have a reasonable number of posts
    if (allPosts.length > 3) {
        window.addEventListener('scroll', function() {
            allPosts.forEach(post => {
                const postPosition = post.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (postPosition < screenPosition) {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Initialize post visibility
        allPosts.forEach((post, index) => {
            if (index > 2) { // Keep first 3 posts visible
                post.style.opacity = '0';
                post.style.transform = 'translateY(30px)';
                post.style.transition = 'all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)';
            }
        });
    }
}