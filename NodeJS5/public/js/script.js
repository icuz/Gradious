let ustatus = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
};

document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
        fetch('http://localhost:8080/buddylist')
            .then(response => response.json())
            .then(data => {
                users = data;
                localStorage.setItem('users', JSON.stringify(users));

                if (Array.isArray(users)) {
                    users.forEach(user => {
                        addUserToDOM(user);
                    });
                } else {
                    console.error('Fetched data is not an array:', users);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        users.forEach(addUserToDOM);
    }
});

var updatingUserId = null;

function visibileUserForm() {
    var form = document.getElementById('addUserForm');
    form.style.display = 'block';
    var button = document.getElementById('addUserButton');
    if (updatingUserId) {
		document.getElementById('add').style.display = 'none';
		document.getElementById('update').style.display = 'block';
    } else {
        document.getElementById('add').style.display = 'block';
    	document.getElementById('update').style.display = 'none';
    }
}

function addUserToDOM(user) {
    var root = document.getElementById('root');
    var userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = `
        <div class="img-container">
            <img src="${user.profilePicture}" class='user-image ${user.presence}' alt="user image" />
        </div>
        <div class="user-detail">
            <p class="user-name">${user.name}</p>
            <p class="user-message">${user.statusMessage}</p>
        </div>
        <div class='three-btn'>
            <div class="dropdown">
                <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
                <ul class="dropdown-menu">
                    <li><button onclick='deleteItem("${user.userId}")' class="dropdown-item ">Delete</button></li>
                    <li><button onclick='update("${user.userId}")' class="dropdown-item">Edit</button></li>
                </ul>
            </div>
        </div>
    `;
    root.appendChild(userDiv); 
}

function addUser() {
	var form = document.getElementById('addUserForm');
	var name = form.elements['name'].value;
	var profilePicture = form.elements['profilePicLink'].value;
	var statusMessage = form.elements['statusMessage'].value;
	var presenceValue = form.elements['presence'].value;
	var presence = ustatus[presenceValue];

    console.log('Name:', name);
    console.log('Profile Picture:', profilePicture);
    console.log('Status Message:', statusMessage);
    console.log('Presence Value:', presenceValue);
    console.log('Presence:', presence);

	// Data validation
	if (!name || !profilePicture || !statusMessage || !presence) {
		alert('All fields must be filled out');
		return;
	}

	if (typeof name !== 'string' || typeof profilePicture !== 'string' || typeof statusMessage !== 'string' || typeof presence !== 'string') {
		alert('Invalid data format');
		return;
	}

	var userId = 'USR' + Math.floor(Math.random() * 10000);
	var newUser = {
		userId: userId,
		name: name,
		profilePicture: profilePicture,
		statusMessage: statusMessage,
		presence: presence
	};

	var users = JSON.parse(localStorage.getItem('users')) || [];
	users.unshift(newUser);
	localStorage.setItem('users', JSON.stringify(users));
	addUserToDOM(newUser);
}

function deleteItem(userId) {
	var users = JSON.parse(localStorage.getItem('users'));
	var newUsers = users.filter(user => user.userId !== userId);
	localStorage.setItem('users', JSON.stringify(newUsers));
	window.location.reload();
}

function update(userId) {
	document.getElementById('addUserForm').dataset.userId = userId;
	updatingUserId = userId;
	visibileUserForm();
	document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(user => user.userId === userId);

    if (user) {
        var form = document.getElementById('addUserForm');
        form.elements['name'].value = user.name;
        form.elements['profilePicLink'].value = user.profilePicture;
        form.elements['statusMessage'].value = user.statusMessage;
        var presenceValue;
        switch(user.presence) {
            case 'one':
                presenceValue = '1';
                break;
            case 'two':
                presenceValue = '2';
                break;
            case 'three':
                presenceValue = '3';
                break;
			case 'four':
				presenceValue = '4';
				break;			
            default:
                presenceValue = '0';
        }
        form.elements['presence'].value = presenceValue;

        form.dataset.userId = userId;
    }
}

function updateUser() {
	var userId = document.getElementById('addUserForm').dataset.userId;

	var users = JSON.parse(localStorage.getItem('users'));
	var userIndex = users.findIndex(user => user.userId === userId);

	if (userIndex !== -1) {
		var form = document.getElementById('addUserForm');
		var name = form.elements['name'].value;
		var profilePicture = form.elements['profilePicLink'].value;
		var statusMessage = form.elements['statusMessage'].value;
		var presenceValue = form.elements['presence'].value;
		var presence = ustatus[presenceValue];

		if (!name || !profilePicture || !statusMessage || !presence) {
			alert('All fields are required');
			return;
		}

		users[userIndex] = {
			...users[userIndex],
			name,
			profilePicture,
			statusMessage,
			presence
		};

		localStorage.setItem('users', JSON.stringify(users));
	}
}
