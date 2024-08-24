document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8000/team/teams/')
        .then(response => response.json())
        .then(data => {
            let teamsContainer = document.getElementById('teams');
            data.forEach(team => {
                let teamCard = document.createElement('div');
                teamCard.classList.add('card', 'mb-3');
                teamCard.innerHTML = `
                    <div class="card-body ">
                        <h5 class="card-title text-primary fw-bold text-center">${team.name}</h5>
                        <ul class="list-group list-group-flush">
                            ${team.members.map(member => `
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <strong>${member.name}</strong>
                                        <span class="ml-3">Contact: ${member.contact_number}</span>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                teamsContainer.appendChild(teamCard);
            });
        })
        .catch(error => console.error('Error:', error));
});





// For sending Email 

function sendTeamEmail(teamName) {
    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/team/send-team-email/', {
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
