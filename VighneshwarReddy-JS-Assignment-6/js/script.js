let ustatus = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};

let users = [
	{
		"userId": "USR00001",
		"name": "Harry Porter",
		"profilePicture": "https://imgs.search.brave.com/Wi82NjW8Kl23dNEKnfdXxr34F3Vr8WLBx8yohrszXGE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZC9kNy9IYXJyeV9Q/b3R0ZXJfY2hhcmFj/dGVyX3Bvc3Rlci5q/cGcvNTEycHgtSGFy/cnlfUG90dGVyX2No/YXJhY3Rlcl9wb3N0/ZXIuanBn",
		"statusMessage": "Expelliarmus",
		"presence": "one"
	},
	{
		"userId": "USR00002",
		"name": "Ron Weasley",
		"profilePicture": "https://imgs.search.brave.com/CnOSC4rFM6kxUa90mwIJrCD_8YbdDwG48jPR3TdiFPE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/NS81ZS9Sb25fV2Vh/c2xleV9wb3N0ZXIu/anBnLzUxMnB4LVJv/bl9XZWFzbGV5X3Bv/c3Rlci5qcGc",
		"statusMessage": "Expecto Patronum",
		"presence": "two"
	},
	{
		"userId": "USR00003",
		"name": "Hermione Granger",
		"profilePicture": "https://imgs.search.brave.com/lDmSsXVrR2GmQv7-PJbYxmWnW8aKwZ7HteQiYQwyhEw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZC9kMy9IZXJtaW9u/ZV9HcmFuZ2VyX3Bv/c3Rlci5qcGcvNTEy/cHgtSGVybWlvbmVf/R3Jhbmdlcl9wb3N0/ZXIuanBn",
		"statusMessage": "Wingardium Leviosa",
		"presence": "three"
	},
	{
		"userId": "USR00004",
		"name": "He Who Must Not Be Named",
		"profilePicture": "https://imgs.search.brave.com/cp_Zz0Svjtab_Ei7BAlqs12sRL4vnSp5Eq9xh6D6geE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/YS9hMy9Mb3Jkdm9s/ZGVtb3J0LmpwZy81/MTJweC1Mb3Jkdm9s/ZGVtb3J0LmpwZw",
		"statusMessage": "Avada Kedavra",
		"presence": "one"
	},
	{
		"userId": "USR00005",
		"name": "Albus Dumbledore",
		"profilePicture": "https://imgs.search.brave.com/xQzyTAgVhEVw0kPX-6et6W_cRYVcu8VclIjOJXVaWT0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lOC9EdW1ibGVk/b3JlXy1fUHJpc29u/ZXJfb2ZfQXprYWJh/bi5qcGcvNTEycHgt/RHVtYmxlZG9yZV8t/X1ByaXNvbmVyX29m/X0F6a2FiYW4uanBn",
		"statusMessage": "50 points to gryffindor",
		"presence": "four"
	}
];
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

if(localStorage.getItem('users') === null) {
	localStorage.setItem('users', JSON.stringify(users));
}else{
	users = JSON.parse(localStorage.getItem('users'));
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
window.onload = function() {
	var users = JSON.parse(localStorage.getItem('users'));
	users.forEach(addUserToDOM);
}

function addUser() {
	var form = document.getElementById('addUserForm');
	var name = form.elements['name'].value;
	var profilePicture = form.elements['profilePicLink'].value;
	var statusMessage = form.elements['statusMessage'].value;
	var presenceValue = form.elements['presence'].value;
	var presence = ustatus[presenceValue];

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