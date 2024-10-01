
// Function to open the modal with post data for editing
function openEditModal(post) {
    document.getElementById('editTitle').value = post.title;
    document.getElementById('editContent').value = post.content;
    document.getElementById('editLocation').value = post.location;
    document.getElementById('editPostId').value = post.id;

    const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
    editPostModal.show();
}

// Event listener for the save button in the edit modal
document.getElementById('saveEditBtn').addEventListener('click', () => {
    const form = document.getElementById('editPostForm');
    const formData = new FormData(form);
    const postId = formData.get('postId');

    const jsonFormData = {};
    formData.forEach((value, key) => {
        jsonFormData[key] = value;
    });

    const token = localStorage.getItem('token');

    fetch(`https://water-backend-api.vercel.app/team/post/${postId}/`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonFormData)
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    load_post(); // Reload the posts after updating
                    const editPostModal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
                    editPostModal.hide();
                });
            } else {
                response.json().then(data => showError(data.detail || 'Error updating post.'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error updating post.');
        });
});

// Function to delete a post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const token = localStorage.getItem('token');

        fetch(`https://water-backend-api.vercel.app/team/post/${postId}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    load_post(); // Reload the posts after deleting
                } else {
                    response.json().then(data => showError(data.detail || 'Error deleting post.'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError('Error deleting post.');
            });
    }
}

// display all post 
const display_post = (posts) => {
    const cardSection = document.querySelector('.card-section');
    cardSection.innerHTML = "";

    const token = localStorage.getItem('token'); 
    
       
    fetch('https://water-backend-api.vercel.app/account/api/user-role/', {
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
 

    posts.forEach((post) => {
        console.log(data)
        console.log(post)
        const date = new Date(post.created_at);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

        let cardHTML = `
            <div class="card text-start p-4" style="width: 38rem; margin-top: 20px; border-radius: 20px; border: 2px solid rgb(46, 128, 243);">
                <div class="d-flex align-items-center mb-3">
                    <img src="images/ano.jpeg" class="rounded-circle me-2" alt="User Image" style="width: 50px; height: 50px;">
                    <span class="fw-bold"> Anonymous </br> ${formattedDate} </span>
                </div>
                <hr>
                <h5 class="fw-bold rounded text-primary">Title : ${post.title}</h5>
                <p class="">Description : ${post.content}</p>
                <p class="card-text">Location: ${post.location}</p>
                <img src="${post.image_url}" class="card-img-top rounded" alt="Image" style="height: 400px; object-fit: cover;">
                <div class="contact pt-3">
                    <a href="team.html" class="btn btn-primary">Contact Our Team</a> 
                    <a href="javascript:void(0);" class="btn btn-success edit-post-btn" data-post-id="${post.id}">Edit Post</a> 
                    <a href="javascript:void(0);" class="btn btn-danger delete-post-btn" data-post-id="${post.id}">Delete Post</a> 
                </div>
        `;

        console.log(data.role)
        if (data.role === 'volunteer_team') {
      
          
            cardHTML += `
                <div class="contact pt-3">
                    <a href="javascript:void(0);" class="btn btn-primary" id="accept-btn-${post.id}">Accept and Send Mail</a>
                    <select class="form-select mt-3 d-none" id="team-select-${post.id}">
                        <option value="Red_Team">Red Team</option>
                        <option value="Blue_Team">Blue Team</option>
                        <option value="Green_Team">Green Team</option>
                        <option value="Yellow_Team">Yellow Team</option>
                    </select>
                    <button class="btn btn-success mt-3 d-none" id="send-mail-btn-${post.id}">Send Email</button>
                </div>
            `;
        }

        cardHTML += `</div>`;

        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;

        cardElement.querySelector('.edit-post-btn').addEventListener('click', () => openEditModal(post));
        cardElement.querySelector('.delete-post-btn').addEventListener('click', () => deletePost(post.id));

       console.log(cardElement.innerHTML)

        if (data.role === 'volunteer_team') {
          
            const acceptBtn = cardElement.querySelector(`#accept-btn-${post.id}`);
            const teamSelect = cardElement.querySelector(`#team-select-${post.id}`);
            const sendMailBtn = cardElement.querySelector(`#send-mail-btn-${post.id}`);

            acceptBtn.addEventListener('click', () => {
                teamSelect.classList.remove('d-none');
                sendMailBtn.classList.remove('d-none');
            });

            sendMailBtn.addEventListener('click', () => {
                const selectedTeam = teamSelect.value;

                if (selectedTeam) {
                    const token = localStorage.getItem('token');
                    fetch('https://water-backend-api.vercel.app/team/send-team-email/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            team_name: selectedTeam,
                            post_id: post.id
                        })
                    })
                        .then(response => {
                            console.log(response)
                            if (response.ok) {
                                alert('Email sent successfully!');
                            } else {
                                alert('Failed to send email.');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }
            });
        }

        cardSection.appendChild(cardElement);
    });


})
.catch(error => console.error('Error fetching user data:', error));


    console.log(cardSection.innerHTML)
};







// ***************************************

function submitForm() {
    const form = document.getElementById('postForm');
    const formData = new FormData(form);
    const imageFile = formData.get('image');

    if (imageFile) {
        const imgbbApiKey = 'add07eb16060304e9d624f9962001708';
        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

        const imgbbData = new FormData();
        imgbbData.append('image', imageFile);

        fetch(imgbbUrl, {
            method: 'POST',
            body: imgbbData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const imageUrl = data.data.url;
                    formData.append('image_url', imageUrl);
                    formData.delete('image');
                    submitPost(formData);
                } else {
                    showError('Error uploading image to imgbb.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError('Error uploading image to imgbb.');
            });
    } else {
        submitPost(formData);
    }
}

function submitPost(formData) {
    const jsonFormData = {};

    formData.forEach((value, key) => {
        jsonFormData[key] = value;
    });

    const token = localStorage.getItem('token');

    fetch('https://water-backend-api.vercel.app/team/post/', {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonFormData)
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    addCard(data);

                    showSuccess();
                    document.getElementById('postForm').reset();
                });
            } else {
                response.json().then(data => showError(data.detail || 'Error creating post.'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error creating post.');
        });
}

function addCard(data) {
    const cardSection = document.querySelector('.card-section');

    const cardHTML = `
        <div class="card bg-secondary" style="width: 38rem; margin-top: 20px;">
            <img src="${data.image_url}" class="card-img-top" alt="Image"  style="height: 400px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">Title: ${data.title}</h5>
                <p class="card-text">Description: ${data.content}</p>
                <p class="card-text">Location: ${data.location}</p>
                <p class="card-text">Time : ${data.created_at}</p>
                <a href="team.html" class="btn btn-primary">Contact Our Team</a>
            </div>
        </div>
    `;

    cardSection.insertAdjacentHTML('beforeend', cardHTML);
}



function showSuccess() {
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
}






const load_post = () => {

    const token = localStorage.getItem('token');
    fetch("https://water-backend-api.vercel.app/team/post/", {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },


    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            display_post(data);
        });
};


load_post();  
