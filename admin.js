document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem("token");
    console.log(token)
    fetch('http://127.0.0.1:8000/account/api/user-role/', {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
       console.log(data)
        if (data.role === 'normal_user') {
            document.getElementById('normal-user-content').classList.remove('d-none');
        } else if (data.role === 'volunteer_team') {
            document.getElementById('volunteer-team-content').classList.remove('d-none');
        }
    })
    .catch(error => {
        console.error('Error fetching user role:', error);
    });
});



// for voluntter 
document.getElementById('accept-btn').addEventListener('click', function() {
    const teamSelect = document.getElementById('team-select');
    if (teamSelect.classList.contains('d-none')) {
        teamSelect.classList.remove('d-none');
    } else {
        teamSelect.classList.add('d-none');
    }
});






// // Function to load and display posts
const loadPosts = () => {
    const token = localStorage.getItem('token');
    
    fetch("http://127.0.0.1:8000/team/post/", {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        displayPosts(data);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
};

const displayPosts = (posts) => {
    const cardSection = document.querySelector('.card-sections');
    cardSection.innerHTML = "";  

    posts.forEach(post => {
        const postHTML = `
            <div class="card-sections bg-white p-4" style="width: 38rem; margin-top: 20px;   border: 2px solid rgb(46, 128, 243);">
                <div class="d-flex align-items-center mb-3">
                    <img src="images/ano.jpeg" class="rounded-circle me-2" alt="User Image" style="width: 50px; height: 50px;">
                    <span class="fw-bold">Anonymous<br>${new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <hr>
                <h5 class="card-title fw-bold rounded">Title: ${post.title}</h5>
                <p class="card-text">Description: ${post.content}</p>
                <p class="card-text">Location: ${post.location}</p>
                <img src="${post.image_url}" class="card-img-top rounded" alt="Image" style="height: 400px; object-fit: cover;">
                <div class="contact pt-3">
                    <a href="javascript:void(0);" class="btn btn-primary" id="accept-btn">Accept and Send Mail</a>
                    <select class="form-select mt-3 d-none" id="team-select">
                        <option value="Red_team">Red Team</option>
                        <option value="Blue_team">Blue Team</option>
                        <option value="Green_team">Green Team</option>
                        <option value="Yellow_team">Yellow Team</option>
                    </select>
                </div>
            </div>
        `;

        const postElement = document.createElement('div');
        postElement.innerHTML = postHTML;
        cardSection.appendChild(postElement.firstElementChild);
    });
};

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', loadPosts);
