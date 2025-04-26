// profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animations to profile elements
    const profileCard = document.querySelector('.col-md-3 .card');
    const profileImage = document.querySelector('.img-thumbnail');
    
    if (profileCard && profileImage) {
        // Add hover effect to profile image
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 6px 12px rgba(106, 90, 205, 0.5)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(106, 90, 205, 0.3)';
        });
        
        // Add smooth appearance animation for profile card
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            profileCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            profileCard.style.opacity = '1';
            profileCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Enhance post cards with staggered animations
    const postCards = document.querySelectorAll('.col-md-8 .card');
    
    if (postCards.length) {
        postCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * (index + 1));
        });
    }
    
    // Enhance Read More functionality with smooth transition
    window.toggleReadMore = function(postId) {
        const moreText = document.getElementById("more-" + postId);
        const btnText = document.getElementById("btn-" + postId);
        const descElement = document.getElementById("desc-" + postId);
    
        if (moreText.style.display === "none") {
            // Expand text
            moreText.style.display = "inline";
            moreText.style.opacity = "0";
            setTimeout(() => {
                moreText.style.transition = "opacity 0.3s ease";
                moreText.style.opacity = "1";
            }, 10);
            btnText.innerHTML = "Read Less";
            btnText.style.color = "#ff6b6b";
        } else {
            // Collapse text
            moreText.style.transition = "opacity 0.3s ease";
            moreText.style.opacity = "0";
            setTimeout(() => {
                moreText.style.display = "none";
            }, 300);
            btnText.innerHTML = "Read More";
            btnText.style.color = "#6a5acd";
        }
    };
    
    // Fix delete confirmation with enhanced UI
    const deleteButtons = document.querySelectorAll('.btn-danger');
    
    if (deleteButtons.length) {
        deleteButtons.forEach(btn => {
            // Remove default onclick behavior
            btn.removeAttribute('onclick');
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Store a reference to the form
                const deleteForm = btn.closest('form');
                
                // Create and show a custom confirmation dialog
                const overlay = document.createElement('div');
                overlay.className = 'delete-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                const dialog = document.createElement('div');
                dialog.className = 'delete-dialog';
                dialog.style.cssText = `
                    background-color: white;
                    border-radius: 15px;
                    padding: 20px 30px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                    animation: scaleIn 0.3s ease forwards;
                `;
                
                // Create dialog content
                dialog.innerHTML = `
                    <h4 style="color: #ff6b6b; margin-bottom: 15px;">Confirm Deletion</h4>
                    <p style="color: #555; margin-bottom: 20px;">Are you sure you want to delete this post? This action cannot be undone.</p>
                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button class="cancel-delete-btn" style="
                            padding: 8px 20px;
                            border-radius: 20px;
                            border: 1px solid #6a5acd;
                            background-color: white;
                            color: #6a5acd;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">Cancel</button>
                        <button class="confirm-delete-btn" style="
                            padding: 8px 20px;
                            border-radius: 20px;
                            border: none;
                            background-color: #ff6b6b;
                            color: white;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">Delete</button>
                    </div>
                `;
                
                // Add dialog to overlay
                overlay.appendChild(dialog);
                document.body.appendChild(overlay);
                
                // Add style for animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes scaleIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
                
                // Function to remove the overlay
                const removeOverlay = () => {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 300);
                };
                
                // Add event listeners directly to the buttons
                const cancelBtn = dialog.querySelector('.cancel-delete-btn');
                const confirmBtn = dialog.querySelector('.confirm-delete-btn');
                
                cancelBtn.addEventListener('click', function() {
                    removeOverlay();
                });
                
                confirmBtn.addEventListener('click', function() {
                    if (deleteForm) {
                        deleteForm.submit();
                    }
                });
            });
        });
    }
    
    // Enhance buttons with hover effects
    const allButtons = document.querySelectorAll('.btn');
    
    if (allButtons.length) {
        allButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});