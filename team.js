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
