function submitForm() {
    // Get the form element
    const form = document.getElementById('postForm');

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Send the form data to the server using fetch
    fetch('http://127.0.0.1:8000/team/create-post/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for Django
        }
    })
    .then(response => response.json())
    .then(data => {
        // Hide any previous messages
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'none';

        if (response.ok) {
            // Show success message and clear form
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
        } else {
            // Show error message
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').style.display = 'block';
    });
}

// Function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
