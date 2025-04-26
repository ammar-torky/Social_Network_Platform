// Modern interactive elements for home page
document.addEventListener('DOMContentLoaded', function() {
    // Stagger animation for post cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.08 * index}s`;
    });

    // Add hover effect to post cards
    cards.forEach(card => {
        if (!card.classList.contains('card-body')) {
            // Add subtle highlight effect on hover
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.07)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            });
        }
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add like functionality - smaller and more modern
    const addLikeButtons = () => {
        const postCards = document.querySelectorAll('.card:not(.card-body)');
        
        postCards.forEach(card => {
            const cardBody = card.querySelector('.card-body');
            let actionArea = cardBody.querySelector('.btn-info').parentNode;
            
            // Create a dedicated action area div if it doesn't exist
            if (!cardBody.querySelector('.post-actions')) {
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('post-actions');
                
                // Move the existing button to this div
                const viewBtn = cardBody.querySelector('.btn-info');
                const parent = viewBtn.parentNode;
                
                // Clone existing button first
                const clonedBtn = viewBtn.cloneNode(true);
                
                // Create the actions div and append the cloned button
                actionsDiv.appendChild(clonedBtn);
                
                // Add the actions div after the original button
                viewBtn.insertAdjacentElement('afterend', actionsDiv);
                
                // Remove the original button
                viewBtn.remove();
                
                // Update actionArea to the new div
                actionArea = actionsDiv;
            }
            
            // Only add like button if it doesn't exist yet
            if (!actionArea.querySelector('.like-button')) {
                const likeButton = document.createElement('button');
                likeButton.classList.add('btn', 'like-button');
                likeButton.innerHTML = '<i class="fa fa-heart-o"></i> <span>0</span>';
                
                let liked = false;
                let likeCount = 0;
                
                likeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    liked = !liked;
                    likeCount = liked ? likeCount + 1 : likeCount - 1;
                    
                    this.innerHTML = liked ? 
                        `<i class="fa fa-heart"></i> <span>${likeCount}</span>` : 
                        `<i class="fa fa-heart-o"></i> <span>${likeCount}</span>`;
                    
                    // Add a small animation
                    this.classList.add('pulse');
                    setTimeout(() => {
                        this.classList.remove('pulse');
                    }, 300);
                });
                
                actionArea.appendChild(likeButton);
            }
        });
    };
    
    // Execute the function after a small delay to ensure DOM is ready
    setTimeout(addLikeButtons, 300);

    // Add read more/less functionality to long posts - improved
    const addReadMoreToLongTexts = () => {
        const postTexts = document.querySelectorAll('.card-text');
        
        postTexts.forEach(text => {
            const content = text.textContent;
            
            if (content.length > 120) { // Shorter threshold for mobile-friendly design
                const shortText = content.substring(0, 120) + '...';
                const fullText = content;
                
                text.textContent = shortText;
                text.dataset.fullText = fullText;
                text.dataset.shortText = shortText;
                
                const readMoreBtn = document.createElement('a');
                readMoreBtn.href = '#';
                readMoreBtn.classList.add('read-more-btn');
                readMoreBtn.textContent = 'Read more';
                
                let expanded = false;
                
                readMoreBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (expanded) {
                        text.textContent = text.dataset.shortText;
                        this.textContent = 'Read more';
                    } else {
                        text.textContent = text.dataset.fullText;
                        this.textContent = 'Read less';
                    }
                    
                    expanded = !expanded;
                    
                    // Re-append the button after changing text
                    text.appendChild(document.createTextNode(' '));
                    text.appendChild(this);
                });
                
                text.appendChild(document.createTextNode(' '));
                text.appendChild(readMoreBtn);
            }
        });
    };
    
    // Execute the function after a small delay
    setTimeout(addReadMoreToLongTexts, 300);

    // Add loading animation when clicking on "View Details" - improved
    const detailButtons = document.querySelectorAll('.btn-info');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Save original text
            const originalText = this.innerHTML;
            
            // Show loading spinner
            this.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            // Simulate loading delay (in a real app, this would be removed)
            setTimeout(() => {
                // In a real app, this timeout would be removed as the page navigation
                // would naturally occur without need to restore the button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 5000); // Long timeout to ensure it shows during page transition
        });
    });

    // Add modern animations and effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Time indicator style */
        .time-indicator {
            position: relative;
            display: inline-flex;
            align-items: center;
            color: #a0aec0;
            font-size: 0.75rem;
        }
        
        .time-indicator::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: #a0aec0;
            border-radius: 50%;
            margin-right: 5px;
        }
        
        /* Card hover interaction */
        .card:not(.card-body)::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #3D365C, #102E50);
            transition: width 0.3s ease;
        }
        
        .card:not(.card-body):hover::after {
            width: 100%;
        }
        
        /* Button press effect */
        .btn:active {
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add timestamp formatting
    const formatTimeAgo = () => {
        const timeLinks = document.querySelectorAll('.card-link:not([href^="/user/"]):not(.read-more-btn)');
        
        timeLinks.forEach(link => {
            // Add time indicator class for styling
            link.classList.add('time-indicator');
        });
    };
    
    setTimeout(formatTimeAgo, 300);
    
    // Add post interaction effects
    const addPostInteraction = () => {
        const postCards = document.querySelectorAll('.card:not(.card-body)');
        
        postCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a button or link
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || 
                    e.target.parentElement.tagName === 'BUTTON' || e.target.parentElement.tagName === 'A') {
                    return;
                }
                
                // Add subtle highlight effect
                this.style.backgroundColor = '#f7fafc';
                setTimeout(() => {
                    this.style.backgroundColor = '#fff';
                }, 200);
            });
        });
    };
    
    setTimeout(addPostInteraction, 300);
});