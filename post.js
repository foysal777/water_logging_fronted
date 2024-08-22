function submitForm() {
    let formData = new FormData(document.getElementById('postForm'));
    const token=localStorage.getItem("authToken")
    
    fetch('http://127.0.0.1:8000/team/post/', {
        method: 'POST',
        headers: {
           "Content-Type": "application/json",
        Authorization: `token ${token}`,
        },
        body: formData,
       
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error creating post');
        }
    })
    .then(data => {
        console.log(data);
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('postForm').reset();
        addPostToCardSection(data);
        // Close the modal
        let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
    })
    .catch(error => {
        document.getElementById('errorMessage').style.display = 'block';
        console.error('Error:', error);
    });
}


function addPostToCardSection(post) {
    const cardSection = document.querySelector('.card-section'); 

    const newCard = `
    <div class="card bg-secondary" style="width: 38rem; margin-top: 20px;">
        <img src="${post.image ? post.image : 'images/default.jpeg'}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Title: ${post.title}</h5>
            <p class="card-text">Content: ${post.content}</p> 
            <p class="card-text">Location: ${post.location}</p>
            <p class="card-text">Date: ${new Date(post.created_at).toLocaleString()}</p>
            <p class="card-text">Comment Box: So good</p>
            <a href="#" class="btn btn-primary">Request For Team</a>
        </div>
    </div>`;

    cardSection.insertAdjacentHTML('beforeend', newCard);
}



fetch('http://127.0.0.1:8000/team/post/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Handle the data you received
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
