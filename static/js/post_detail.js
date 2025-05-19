document.addEventListener('DOMContentLoaded', function() {
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