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
    
    fetch('http://127.0.0.1:8000/team/post/', { 
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
    fetch("http://127.0.0.1:8000/team/post/" , {
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
  
  const display_post = (posts) => {
    const cardSection = document.querySelector('.card-section');
    cardSection.innerHTML = "";

    posts.forEach((post) => {
        console.log(post);

        // Parse the created_at time and format it
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

        const cardHTML = `
            <div class="card bg-secondary text-start p-3" style="width: 38rem; margin-top: 20px;">
                <div class="d-flex align-items-center mb-3">
                    <img src="images/ano.jpeg" class="rounded-circle me-2" alt="User Image" style="width: 50px; height: 50px;">
                    <span class="fw-bold"> Anonymous </br> ${formattedDate} </span>
                </div>
                <h5 class="card-title  rounded ">Title : ${post.title}</h5>
                <p class="card-text">Description : ${post.content}</p>
                <p class="card-text pt-2">Location: ${post.location}</p>
                <img src="${post.image_url}" class="card-img-top rounded" alt="Image" style="height: 400px; object-fit: cover;">
                <div class="">       
                 
               
                </div>
                <div class="contact pt-3"> 
                    <a href="team.html" class="btn btn-primary">Contact Our Team</a> 
                </div> 
            </div>
        `;

        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;

        cardSection.appendChild(cardElement.firstElementChild);
    });
};

load_post();
