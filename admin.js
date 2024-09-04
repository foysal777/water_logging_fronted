// document.addEventListener('DOMContentLoaded', function() {
//     const token = localStorage.getItem("token");
//     console.log(token)
//     fetch('http://127.0.0.1:8000/account/api/user-role/', {
//         method: 'GET',
//         headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json",
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//        console.log(data)
//         if (data.role === 'normal_user') {
//             document.getElementById('normal-user-content').classList.remove('d-none');
//         } else if (data.role === 'volunteer_team') {
//             document.getElementById('volunteer-team-content').classList.remove('d-none');
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching user role:', error);
//     });
// });



// for voluntter 





// // Function to load and display posts
// // Function to load posts from the server
// const loadPosts = () => {
//     const token = localStorage.getItem('token');
    
//     fetch("http://127.0.0.1:8000/team/post/", {
//         method: 'GET',
//         headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json",
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         displayPosts(data);
//     })
//     .catch(error => {
//         console.error('Error fetching posts:', error);
//     });
// };

// // Function to display posts on the page
// const displayPosts = (posts) => {
//     const cardSection = document.querySelector('.card-sections');
//     cardSection.innerHTML = "";  

//     posts.forEach(post => {
//         const postHTML = `
//             <div class="card-sections bg-white p-4" style="width: 38rem; margin-top: 20px; border: 2px solid rgb(46, 128, 243);">
//                 <div class="d-flex align-items-center mb-3">
//                     <img src="images/ano.jpeg" class="rounded-circle me-2" alt="User Image" style="width: 50px; height: 50px;">
//                     <span class="fw-bold">Anonymous<br>${new Date(post.created_at).toLocaleDateString()}</span>
//                 </div>
//                 <hr>
//                 <h5 class="card-title fw-bold rounded text-primary">Title: ${post.title}</h5>
//                 <p class="card-text">Description: ${post.content}</p>
//                 <p class="card-text">Location: ${post.location}</p>
//                 <img src="${post.image_url}" class="card-img-top rounded" alt="Image" style="height: 400px; object-fit: cover;">
//                 <div class="contact pt-3">
//                     <a href="javascript:void(0);" class="btn btn-primary" id="accept-btn">Accept and Send Mail</a>
//                     <select class="form-select mt-3 d-none" id="team-select">
//                         <option value="Red_Team">Red Team</option>
//                         <option value="Blue_Team">Blue Team</option>
//                         <option value="Green_Team">Green Team</option>
//                         <option value="Yellow_Team">Yellow Team</option>
//                     </select>
//                     <button class="btn btn-success mt-3 d-none" id="send-mail-btn">Send Email</button>
//                 </div>
//             </div>
//         `;

//         const postElement = document.createElement('div');
//         postElement.innerHTML = postHTML;
//         cardSection.appendChild(postElement.firstElementChild);
//     });
// };

// // Event listener for the Accept and Send Mail and Send Email buttons
// document.querySelector('.card-sections').addEventListener('click', function(event) {
//     // Handle the Accept and Send Mail button click
//     if (event.target && event.target.id === 'accept-btn') {
//         const card = event.target.closest('.card-sections');
//         const teamSelect = card.querySelector('#team-select');
//         const sendMailBtn = card.querySelector('#send-mail-btn');
        
//         // Toggle the visibility of the team select dropdown and send mail button
//         teamSelect.classList.toggle('d-none');
//         sendMailBtn.classList.toggle('d-none');
//     }
    
//     // Handle the Send Email button click
//     if (event.target && event.target.id === 'send-mail-btn') {
//         const card = event.target.closest('.card-sections');
//         const selectedTeam = card.querySelector('#team-select').value;
        
//         if (selectedTeam) {
//             sendTeamEmails(selectedTeam);
//         } else {
//             alert('Please select a team before sending an email.');
//         }
//     }
// });

// // Function to send email to the selected team
// function sendTeamEmails(team) {
//     console.log(`Sending email to ${team}`);
    
//     const token = localStorage.getItem('token');

//     fetch('http://127.0.0.1:8000/team/send-team-email/', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Token ${token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ team_name: team })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.message) {
//             alert(data.message);
//         } else if (data.error) {
//             alert('Error: ' + data.error);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// }

// // Load posts when the page is ready
// document.addEventListener('DOMContentLoaded', loadPosts);
