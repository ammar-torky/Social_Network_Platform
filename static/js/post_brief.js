document.addEventListener('DOMContentLoaded', function() {
    console.log('Post brief JS loaded');
    
    // Add animation to the post content
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        postContent.style.opacity = '0';
        postContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            postContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            postContent.style.opacity = '1';
            postContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 100);
        });
    });
    
    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Function to toggle read more/less
function toggleReadMore() {
    console.log('Toggle read more called');
    const shortText = document.getElementById('short-text');
    const fullText = document.getElementById('full-text');
    const btn = document.getElementById('read-more-btn');
    
    if (shortText.style.display !== 'none') {
        // Show full text
        shortText.style.display = 'none';
        fullText.style.display = 'inline';
        fullText.style.opacity = '0';
        
        setTimeout(() => {
            fullText.style.transition = 'opacity 0.3s ease';
            fullText.style.opacity = '1';
        }, 10);
        
        btn.innerHTML = 'Read less';
        btn.style.color = '#ff8c66';
    } else {
        // Show short text
        fullText.style.opacity = '0';
        
        setTimeout(() => {
            shortText.style.display = 'inline';
            fullText.style.display = 'none';
            shortText.style.opacity = '0';
            
            setTimeout(() => {
                shortText.style.transition = 'opacity 0.3s ease';
                shortText.style.opacity = '1';
            }, 10);
        }, 300);
        
        btn.innerHTML = 'Read more';
        btn.style.color = '#ff6347';
    }
}
