let status = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};

let users = [
	{
		"userId": "USR00001",
		"name": "Andrew Grudde",
		"profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePVGNkMYoqEZa1SlL5T-B4eVRYyHhA_ruSxLawfYabvIzrYC6IeUkw5WK9eXWz_SUcus&usqp=CAU",
		"statusMessage": "We become what we think about!",
		"presence": "one"
	},
	{
		"userId": "USR00002",
		"name": "Steve Hughes",
		"profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePVGNkMYoqEZa1SlL5T-B4eVRYyHhA_ruSxLawfYabvIzrYC6IeUkw5WK9eXWz_SUcus&usqp=CAU",
		"statusMessage": "A positive mindset brings positive things.",
		"presence": "two"
	},
	{
		"userId": "USR00003",
		"name": "Kathy Smiley",
		"profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePVGNkMYoqEZa1SlL5T-B4eVRYyHhA_ruSxLawfYabvIzrYC6IeUkw5WK9eXWz_SUcus&usqp=CAU",
		"statusMessage": "One small positive thought can change your whole day",
		"presence": "three"
	},
	{
		"userId": "USR00004",
		"name": "Steve Dunk",
		"profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePVGNkMYoqEZa1SlL5T-B4eVRYyHhA_ruSxLawfYabvIzrYC6IeUkw5WK9eXWz_SUcus&usqp=CAU",
		"statusMessage": "I am a rock star",
		"presence": "one"
	},
	{
		"userId": "USR00005",
		"name": "Maria Dropola",
		"profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePVGNkMYoqEZa1SlL5T-B4eVRYyHhA_ruSxLawfYabvIzrYC6IeUkw5WK9eXWz_SUcus&usqp=CAU",
		"statusMessage": "I am using Gradious messenger",
		"presence": "four"
	}
];

function visibleUserForm(){
	var form = document.getElementById('addUserForm');
	if(form.style.display == 'none'){
		form.style.display = 'block';
	}
}

if(localStorage.getItem('users') === null) {
	localStorage.setItem('users', JSON.stringify(users));
}else{
	users = JSON.parse(localStorage.getItem('users'));
}

window.onload = function() {
	// For each userId, retrieve the user data and display it
	users.forEach(user => {
		addUserToDisplay(user, root);
	});
}

function addUserToDisplay(user, root) {
    let userDiv = document.createElement('div');
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
                    <li><button onclick='deleteBuddy("${user.userId}")' class="dropdown-item ">Delete</button></li>
                    <li><button onclick='editBuddy("${user.userId}")' class="dropdown-item">Edit</button></li>
                </ul>
            </div>
        </div>
    `;
    root.appendChild(userDiv);
}

function addBuddy() {
    var form = document.getElementById('addUserForm');
    var name = form.elements['nameInput'].value;
	// console.log(name);
    var profilePicture = form.elements['pictureLink'].value;
    var statusMessage = form.elements['messageInput'].value;
    var presence = form.elements['statusInput'].value;
	var userId = 'USR' + Math.floor(Math.random() * 10000);
    var newUser = {
		userId: userId,
        name: name,
        profilePicture: profilePicture,
        statusMessage: statusMessage,
        presence: presence
    };
	var users = JSON.parse(localStorage.getItem('users')) || [];
	users.push(newUser);
    // var newUserJson = JSON.stringify(newUser);
	localStorage.setItem('users', JSON.stringify(users));
	let root = document.getElementById("root");
	alert('User added successfully');
	addUserToDisplay(newUser, root);
}

function deleteBuddy(userId) {
	var users = JSON.parse(localStorage.getItem('users'));
	var newUsers = users.filter(user => user.userId !== userId);
	localStorage.setItem('users', JSON.stringify(newUsers));
	window.location.reload();
}

function editBuddy(userId) {
    var users = JSON.parse(localStorage.getItem('users'));

    var user = users.find(user => user.userId === userId);

    if (user) {
        var form = document.getElementById('addUserForm');
        user.name = form.elements['nameInput'].value;
        user.profilePicture = form.elements['pictureLink'].value;
        user.statusMessage = form.elements['messageInput'].value;
        user.presence = form.elements['statusInput'].value;

        localStorage.setItem('users', JSON.stringify(users));

        window.location.reload();
    }
}