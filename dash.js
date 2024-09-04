const token = localStorage.getItem('token');

fetch('http://127.0.0.1:8000/team/pending_request/', {
    method: 'GET', 
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {

    let table = `
        <table class="table-container table-bordered">
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Request to team</th>
                </tr>
            </thead>
            <tbody>
    `;
    

    data.forEach(request => {
        table += `
            <tr>
                <td>${request.team}</td>
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.contact_number}</td>
                <td><button class="btn btn-success accept-button" data-id="${request.id}">Accept</button></td>
            </tr>
        `;
    });
    
   
    table += `
            </tbody>
        </table>
    `;
    
   
    document.getElementById('pending-requests').innerHTML = table;


    document.querySelectorAll('.accept-button').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            acceptRequest(requestId);
        });
    });
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById('pending-requests').innerHTML = `<p>Error loading data: ${error.message}</p>`;
});

// Function to handle request acceptance

function acceptRequest(requestId) {
    fetch(`http://127.0.0.1:8000/team/members/${requestId}/update-status/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            is_pending: true,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Request accepted:', data);

        // Update the user's role if the request is accepted
        return fetch(`http://127.0.0.1:8000/account/api/user-role/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: "volunteer_team"
            })
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user role');
        }
        return response.json();
    })
    .then(roleData => {
        console.log('User role updated:', roleData);
        
        // Remove the request row from the table
        document.querySelector(`button[data-id="${requestId}"]`).closest('tr').remove();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to accept the request or update the user role. Please try again.');
    });
}
