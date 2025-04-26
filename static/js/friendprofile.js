// friend_profile.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth load animation for profile section
    const profileSection = document.querySelector('.col-md-3');
    const postsSection = document.querySelector('.col-md-8');
    
    if (profileSection) {
        profileSection.style.opacity = '0';
        profileSection.style.transform = 'translateY(20px)';
        profileSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            profileSection.style.opacity = '1';
            profileSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (postsSection) {
        postsSection.style.opacity = '0';
        postsSection.style.transform = 'translateY(20px)';
        postsSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            postsSection.style.opacity = '1';
            postsSection.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add subtle animation to posts
    const posts = document.querySelectorAll('.col-md-8 .card .card');
    
    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
        
        // Add hover effect
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add click animation to follow/unfollow button
    const actionButton = document.querySelector('.col-md-3 .btn');
    
    if (actionButton) {
        actionButton.addEventListener('click', function() {
            this.classList.add('clicked');
            
            // Store the original text
            const originalText = this.innerText;
            const isFollowButton = this.classList.contains('btn-success');
            
            // Show loading state
            this.innerHTML = '<span class="spinner"></span> Processing...';
            
            // Simulate network request
            setTimeout(() => {
                // Reset button text
                this.innerText = originalText;
                this.classList.remove('clicked');
            }, 600);
        });
    }
    
    // Add profile image hover effect
    const profileImage = document.querySelector('.col-md-3 .img-fluid');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add style for spinner
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s linear infinite;
            margin-right: 5px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .btn.clicked {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
});