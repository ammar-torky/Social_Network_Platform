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
    
    // Post caption hover effect
    const captions = document.querySelectorAll('.post-caption');
    captions.forEach(caption => {
        caption.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        caption.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add hover effect to view more buttons
    const viewMoreButtons = document.querySelectorAll('.btn-info');
    viewMoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)';
        });
    });
    
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

// Enhanced Read More functionality
function toggleReadMore(postId) {
    const shortText = document.getElementById('short-' + postId);
    const fullText = document.getElementById('full-' + postId);
    const btn = document.getElementById('btn-' + postId);
    
    if (shortText.style.display !== 'none') {
        // Transition to show full text
        shortText.style.opacity = '1';
        
        // Start fade out animation
        shortText.style.transition = 'opacity 0.3s ease';
        shortText.style.opacity = '0';
        
        setTimeout(() => {
            // Hide short text and show full text
            shortText.style.display = 'none';
            fullText.style.display = 'inline';
            
            // Set initial opacity for fade in
            fullText.style.opacity = '0';
            fullText.style.transition = 'opacity 0.3s ease';
            
            // Start fade in animation
            setTimeout(() => {
                fullText.style.opacity = '1';
            }, 50);
            
            // Change button text with animation
            btn.innerHTML = 'Read less';
            btn.style.backgroundColor = 'rgba(78, 115, 223, 0.2)';
            
            setTimeout(() => {
                btn.style.backgroundColor = 'rgba(78, 115, 223, 0.1)';
            }, 300);
        }, 300);
    } else {
        // Transition to show short text
        fullText.style.opacity = '1';
        
        // Start fade out animation
        fullText.style.transition = 'opacity 0.3s ease';
        fullText.style.opacity = '0';
        
        setTimeout(() => {
            // Hide full text and show short text
            fullText.style.display = 'none';
            shortText.style.display = 'inline';
            
            // Set initial opacity for fade in
            shortText.style.opacity = '0';
            shortText.style.transition = 'opacity 0.3s ease';
            
            // Start fade in animation
            setTimeout(() => {
                shortText.style.opacity = '1';
            }, 50);
            
            // Change button text with animation
            btn.innerHTML = 'Read more';
            btn.style.backgroundColor = 'rgba(78, 115, 223, 0.2)';
            
            setTimeout(() => {
                btn.style.backgroundColor = 'rgba(78, 115, 223, 0.1)';
            }, 300);
        }, 300);
    }
}