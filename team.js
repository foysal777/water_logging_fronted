
// start 
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://water-backend-d44x.onrender.com/team/teams/')
        .then(response => response.json())
        .then(data => {
            let teamsContainer = document.getElementById('teams');
            data.forEach(team => {
                let teamCard = document.createElement('div');
                teamCard.classList.add('card', 'mb-3');
                teamCard.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-primary fw-bold">${team.name}</h5>
                            <button class="btn btn-success" onclick="addVolunteer('${team.id}')">Join Volunteer</button>
                        </div>
                        <ul class="list-group list-group-flush">
                            ${team.members.map(member => {
                                if (member.is_pending) {
                                    return `
                                        <li class="list-group-item">
                                            <div class="d-flex justify-content-between">
                                                <strong>${member.name}</strong>
                                                <span>Contact: ${member.contact_number}</span>
                                                <button class="btn btn-primary btn-sm" onclick="acceptVolunteer('${member.id}')">Member</button>
                                            </div>
                                        </li>
                                    `;
                                }
                            }).join('')}
                        </ul>
                    </div>
                `;
                teamsContainer.appendChild(teamCard);
            });
        })
        .catch(error => console.error('Error:', error));
});

function addVolunteer(teamId) {
    

    const token = localStorage.getItem('token');
    fetch('https://water-backend-d44x.onrender.com/account/api/user-role/' , {
 
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    }


    )

         
        .then(response => response.json())
        .then(userInfo => {
         console.log(userInfo)
            let data = {
                team_id: teamId,
                first_name: userInfo.first_name,
                email: userInfo.email 
            };
            console.log(data)     
            const token = localStorage.getItem('token');
            fetch('https://water-backend-d44x.onrender.com/team/join-volunteer/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                 
                console.log('Success:', result);
                alert("Join request has been Sent")
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => console.error('Error:', error));
}



function acceptVolunteer(memberId) {
    const token = localStorage.getItem('token');
    console.log("fammilly")

    fetch(`https://water-backend-d44x.onrender.com/team/team/accept-volunteer/${memberId}/`, {

        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }

    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            alert(data.message || 'Volunteer accepted successfully');

            location.reload();
        })
        .catch(error => console.error('Error:', error));
}





// For sending Email ******************************
function sendTeamEmail(teamName) {
    const token = localStorage.getItem('token');

    fetch('https://water-backend-d44x.onrender.com/team/send-team-email/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: teamName })
    })
        .then(response => {
            if (!response.ok) {

                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.error) {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}
