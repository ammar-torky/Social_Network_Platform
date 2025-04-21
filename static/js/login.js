// Enhanced Login Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to body
    document.body.classList.add('loaded');
    
    // Animated background gradient
    const body = document.body;
    let gradientPos = 0;
    
    function animateGradient() {
      gradientPos += 0.2;
      body.style.backgroundImage = `linear-gradient(${gradientPos}deg, #6a11cb 0%, #2575fc 100%)`;
      requestAnimationFrame(animateGradient);
    }
    
    // Uncomment if you want animated gradient
    // animateGradient();
    
    // Form input focus effects
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
      // Create and add floating label effect
      const label = input.previousElementSibling;
      
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        if (label) label.classList.add('active');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
          if (label) label.classList.remove('active');
        }
      });
      
      // Check if field has value on page load
      if (input.value !== '') {
        input.parentElement.classList.add('focused');
        if (label) label.classList.add('active');
      }
    });
    
    // Image parallax effect
    const image = document.querySelector('.col-md-8 img');
    if (image) {
      document.addEventListener('mousemove', function(e) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 10;
        
        image.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.05)`;
      });
    }
    
    // Simple form validation
    const loginForm = document.querySelector('form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        let isValid = true;
        
        // Reset errors
        clearErrors();
        
        // Validate username
        if (!username.value.trim()) {
          showError(username, 'Please enter your username');
          isValid = false;
        }
        
        // Validate password
        if (!password.value.trim()) {
          showError(password, 'Please enter your password');
          isValid = false;
        }
        
        if (!isValid) {
          e.preventDefault();
        } else {
          // Add loading effect
          const submitBtn = document.querySelector('input[type="submit"]');
          submitBtn.value = 'Logging..';
          submitBtn.style.background = 'linear-gradient(90deg, #5700b3, #1e63e0)';
          
          // Add a nice loading spinner
          submitBtn.style.position = 'relative';
          submitBtn.style.paddingRight = '40px';
          
          const spinner = document.createElement('span');
          spinner.className = 'spinner';
          spinner.style.position = 'absolute';
          spinner.style.right = '15px';
          spinner.style.top = '50%';
          spinner.style.transform = 'translateY(-50%)';
          spinner.style.width = '20px';
          spinner.style.height = '20px';
          spinner.style.border = '3px solid rgba(255,255,255,0.3)';
          spinner.style.borderTop = '3px solid white';
          spinner.style.borderRadius = '50%';
          spinner.style.animation = 'spin 1s linear infinite';
          submitBtn.appendChild(spinner);
          
          // Add spin animation
          const style = document.createElement('style');
          style.innerHTML = `
            @keyframes spin {
              0% { transform: translateY(-50%) rotate(0deg); }
              100% { transform: translateY(-50%) rotate(360deg); }
            }
          `;
          document.head.appendChild(style);
        }
      });
    }
    
    // Error handling functions
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = message;
      errorMessage.style.color = '#dc3545';
      errorMessage.style.fontSize = '12px';
      errorMessage.style.marginTop = '5px';
      errorMessage.style.animation = 'fadeIn 0.3s ease';
      formGroup.appendChild(errorMessage);
      
      input.style.borderColor = '#dc3545';
    }
    
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.remove());
      
      const inputs = document.querySelectorAll('.form-control');
      inputs.forEach(input => {
        input.style.borderColor = '#e1e1e1';
      });
    }
  });