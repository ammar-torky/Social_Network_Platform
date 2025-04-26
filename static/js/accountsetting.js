// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add custom sections to the form for organization
    enhanceFormLayout();
    
    // Setup profile picture preview functionality
    setupProfilePicPreview();
    
    // Add form validation
    setupFormValidation();
    
    // Add animation effects
    addAnimationEffects();
});

// Function to enhance the form layout
function enhanceFormLayout() {
    const form = document.querySelector('form');
    
    // Get all form groups
    const formGroups = form.querySelectorAll('.form-group');
    
    // If there are form groups, proceed with the enhancement
    if (formGroups.length > 0) {
        // Create a header section
        const headerDiv = document.createElement('div');
        headerDiv.className = 'settings-header';
        headerDiv.innerHTML = `
            <h2>Account Settings</h2>
            <p>Update your personal information</p>
        `;
        
        // Insert the header at the beginning of the form
        form.insertBefore(headerDiv, form.firstChild);
        
        // Create a profile pic preview section for the profile_pic field
        const profilePicField = form.querySelector('input[type="file"]');
        if (profilePicField) {
            const profilePicGroup = profilePicField.closest('.form-group');
            
            // Create preview container
            const previewDiv = document.createElement('div');
            previewDiv.className = 'profile-pic-preview';
            
            // Get the current profile pic URL if available
            let currentPicUrl = '/static/media/profile_pics/default.jpg'; // Default
            
            // Try to extract the current image URL from any help text or elsewhere
            const helpText = profilePicGroup.querySelector('small.text-muted');
            if (helpText && helpText.textContent.includes('Currently:')) {
                const match = helpText.textContent.match(/Currently: (.*?)(?:\.| |$)/);
                if (match && match[1]) {
                    currentPicUrl = match[1];
                }
            }
            
            // Add the preview image element
            previewDiv.innerHTML = `
                <img src="${currentPicUrl}" class="current-photo" id="profile-preview" alt="Profile Picture Preview">
                <p class="text-muted">Current profile picture</p>
            `;
            
            // Insert before the file input
            profilePicGroup.insertBefore(previewDiv, profilePicField.parentNode);
            
            // Customize the file input
            const fileLabel = profilePicGroup.querySelector('label');
            if (fileLabel) {
                fileLabel.textContent = 'Change Profile Picture';
            }
        }
        
        // Group name fields in a section
        const nameSection = document.createElement('div');
        nameSection.className = 'form-section';
        nameSection.innerHTML = '<h3 class="section-title">Personal Information</h3>';
        
        // Find first_name and last_name fields
        const firstNameGroup = form.querySelector('.form-group:has(input[name="first_name"])');
        const lastNameGroup = form.querySelector('.form-group:has(input[name="last_name"])');
        
        if (firstNameGroup && lastNameGroup) {
            // Move these fields to the name section
            form.insertBefore(nameSection, firstNameGroup);
            nameSection.appendChild(firstNameGroup);
            nameSection.appendChild(lastNameGroup);
        }
        
        // Create a bio section
        const bioGroup = form.querySelector('.form-group:has(textarea[name="bio"])');
        if (bioGroup) {
            const bioSection = document.createElement('div');
            bioSection.className = 'form-section';
            bioSection.innerHTML = '<h3 class="section-title">About You</h3>';
            
            form.insertBefore(bioSection, bioGroup);
            bioSection.appendChild(bioGroup);
            
            // Add placeholder to bio textarea
            const bioTextarea = bioGroup.querySelector('textarea');
            if (bioTextarea) {
                bioTextarea.setAttribute('placeholder', 'Tell us something about yourself...');
            }
        }
    }
    
    // Enhance submit button
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        submitBtn.className = 'btn btn-primary';
        submitBtn.value = 'Save Changes';
    }
}

// Function to setup profile picture preview
function setupProfilePicPreview() {
    const profileInput = document.querySelector('input[type="file"]');
    const previewImg = document.getElementById('profile-preview');
    
    if (profileInput && previewImg) {
        profileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    // Add a brief animation
                    previewImg.style.transition = 'transform 0.3s ease';
                    previewImg.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        previewImg.style.transform = 'scale(1)';
                    }, 300);
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
}

// Function to setup basic form validation
function setupFormValidation() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validate first name and last name fields (if they exist)
            const firstNameInput = form.querySelector('input[name="first_name"]');
            const lastNameInput = form.querySelector('input[name="last_name"]');
            
            if (firstNameInput) {
                if (firstNameInput.value.trim() === '') {
                    markInvalid(firstNameInput, 'Please enter your first name');
                    isValid = false;
                } else {
                    markValid(firstNameInput);
                }
            }
            
            if (lastNameInput) {
                if (lastNameInput.value.trim() === '') {
                    markInvalid(lastNameInput, 'Please enter your last name');
                    isValid = false;
                } else {
                    markValid(lastNameInput);
                }
            }
            
            // If validation fails, prevent form submission
            if (!isValid) {
                event.preventDefault();
                
                // Scroll to the first invalid field
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

// Utility function to mark a field as invalid
function markInvalid(inputElement, message) {
    inputElement.classList.add('is-invalid');
    
    // Remove any existing feedback
    const existingFeedback = inputElement.nextElementSibling;
    if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
        existingFeedback.remove();
    }
    
    // Add feedback message
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    
    inputElement.parentNode.insertBefore(feedback, inputElement.nextSibling);
}

// Utility function to mark a field as valid
function markValid(inputElement) {
    inputElement.classList.remove('is-invalid');
    
    // Remove any existing feedback
    const existingFeedback = inputElement.nextElementSibling;
    if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
        existingFeedback.remove();
    }
}

// Function to add animation effects
function addAnimationEffects() {
    const form = document.querySelector('form');
    
    if (form) {
        // Add animation to form groups
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Add hover effect to inputs
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.style.transform = 'translateY(-5px)';
                this.parentNode.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.style.transform = 'translateY(0)';
            });
        });
    }
}