document.addEventListener('DOMContentLoaded', function() {
    // Fetch the role from localStorage
    const userRole = localStorage.getItem('roleData') || 'normal_user';  

    // Update the role display in profile.js
    document.getElementById('role-text').textContent = userRole;
});


