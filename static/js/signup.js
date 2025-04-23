// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a subtle animation to the signup form
    const formElement = document.querySelector('form');
    if (formElement) {
        setTimeout(() => {
            formElement.style.opacity = '1';
        }, 100);
    }

    // Add smooth image zoom effect - but more subtle now
    const signupImage = document.querySelector('.img-fluid');
    if (signupImage) {
        // Make sure the image is properly loaded before animation
        if (signupImage.complete) {
            initImageEffect(signupImage);
        } else {
            signupImage.addEventListener('load', function() {
                initImageEffect(signupImage);
            });
        }
    }

    // Better adjust container heights
    adjustHeights();
    window.addEventListener('resize', adjustHeights);

    // Password strength indicator
    const passwordField = document.querySelector('input[name="password1"]');
    if (passwordField) {
        // Create password strength meter
        const meterContainer = document.createElement('div');
        meterContainer.className = 'password-strength-meter';
        const meterBar = document.createElement('div');
        meterContainer.appendChild(meterBar);
        
        // Insert meter after password field
        passwordField.parentNode.insertBefore(meterContainer, passwordField.nextSibling);
        
        // Update strength meter on input
        passwordField.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrengthMeter(meterBar, strength);
        });
    }

    // Add subtle focus effects to form fields
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.querySelector('label')?.classList.add('active-label');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.querySelector('label')?.classList.remove('active-label');
            }
        });
    });

    // Add subtle effects to the form on submit
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="spinner"></span> Signing up...';
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.8';
            }
        });
    }
});

// Function to initialize image effect
function initImageEffect(image) {
    setTimeout(() => {
        image.style.transform = 'scale(1.05)';
    }, 500);
}

// Function to adjust container heights properly
function adjustHeights() {
    const windowHeight = window.innerHeight;
    const formCol = document.querySelector('.col-md-4');
    const imageCol = document.querySelector('.col-md-8');
    
    if (formCol && imageCol && window.innerWidth > 768) {
        formCol.style.height = windowHeight + 'px';
        imageCol.style.height = windowHeight + 'px';
    }
}

// Function to calculate password strength (simple version)
function calculatePasswordStrength(password) {
    // Return a value between 0 and 100
    if (!password) return 0;
    
    let strength = 0;
    
    // Length contribution (max 40%)
    strength += Math.min(password.length * 4, 40);
    
    // Character variety contribution
    if (/[A-Z]/.test(password)) strength += 15; // uppercase
    if (/[a-z]/.test(password)) strength += 15; // lowercase
    if (/[0-9]/.test(password)) strength += 15; // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 15; // special chars
    
    return Math.min(strength, 100);
}

// Function to update the password strength meter
function updatePasswordStrengthMeter(meterBar, strength) {
    meterBar.style.width = strength + '%';
    
    // Update color based on strength
    if (strength < 30) {
        meterBar.style.backgroundColor = '#dc3545'; // red - weak
    } else if (strength < 60) {
        meterBar.style.backgroundColor = '#ffc107'; // yellow - medium
    } else {
        meterBar.style.backgroundColor = '#28a745'; // green - strong
    }
}

// Add subtle parallax effect to the background image - more subtle now
document.addEventListener('mousemove', function(e) {
    const signupImage = document.querySelector('.img-fluid');
    if (signupImage && window.innerWidth > 768) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        signupImage.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    }
});

// Handle form validation messages
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('is-invalid');
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            this.classList.remove('is-invalid');
        }
    });
});