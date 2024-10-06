document.addEventListener('DOMContentLoaded', function() {
    // Fetch the role from localStorage
    const userRole = localStorage.getItem('roleData') || 'normal_user';  

    // Update the role display in profile.js
    document.getElementById('role-text').textContent = userRole;
});




fetch('https://water-backend-api.vercel.app/account/api/user-role/', {
    method: 'GET',
    headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
    }
})
.then(response => {
    if (response.ok) {
        return response.json();  
    } else {
        throw new Error('Network response was not ok');
    }
})
.then(data => {
    console.log(data);
    const profileCard = document.getElementById('profile-card');
    profileCard.innerHTML = `
        <img src="images/profile.png" alt="User Photo">
        <h4>${data.first_name}</h4>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Email:</strong> ${data.email}</p>
    `;
})
.catch(error => console.error('Error fetching user data:', error));
