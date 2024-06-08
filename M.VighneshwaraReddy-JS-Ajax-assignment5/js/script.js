// Function to fetch data from the API endpoint
async function fetchData() {
    try {
        const response = await fetch('https://65f91babdf15145246107311.mockapi.io/api1/users');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display fetched data in the table
function displayData(users) {
    const tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('user');
        row.setAttribute('data-id', user.id);

        row.innerHTML = `
            <td class="name">${user.name}</td>
            <td class="age">${user.age}</td>
            <td class="state">${user.state}</td>
            <td class="functions">
                <button class="edit" onclick="editUser(this.parentElement.parentElement);" type="button"><i class="fa-solid fa-pen-clip"></i></button>
                <button class="deleteB" onclick="deleteUser(${user.id});" type="button"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to add a new user
async function addUser() {
    var modal = document.getElementById("modalAddUser");
    modal.classList.add("show");
    modal.style.display = "block";

    var confirmAdd = document.querySelector("#addUserButton");
    var newConfirmAdd = confirmAdd.cloneNode(true);
    confirmAdd.parentNode.replaceChild(newConfirmAdd, confirmAdd);

    newConfirmAdd.addEventListener("click", async function addUserEvent() {
        var name = document.getElementById("inputName").value;
        var state = document.getElementById("inputState").value;
        var age = document.getElementById("inputAge").value;

        modal.style.display = "none";
        try {
            const response = await fetch('https://65f91babdf15145246107311.mockapi.io/api1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: name,
                        state: state,
                        age: age
                    }
                )
            });
            const data = await response.json();
            console.log('New user added:', data);
            fetchData(); 
        } catch (error) {
            console.error('Error adding user:', error);
        }
        newConfirmAdd.removeEventListener("click", addUserEvent);
    });
}

// Function to update an existing user
function editUser(row) {
    var nameCell = row.cells[0];
    var ageCell = row.cells[1];
    var stateCell = row.cells[2];
    var functionCell = row.cells[3];

    var name = nameCell.textContent;
    var age = ageCell.textContent;
    var nState = stateCell.textContent;
    var confirmEdit = functionCell.querySelector(".confirmEdit");
    if(!confirmEdit){
        functionCell.innerHTML += `<button class="confirmEdit" type="button"><i class="fa-solid fa-circle-arrow-up"></i></button>`;
        confirmEdit = functionCell.querySelector(".confirmEdit");
    }
    if (!nameCell.querySelector('input')) {
        nameCell.innerHTML = `<input type="text" value="${name}">`;
    }
    if (!ageCell.querySelector('input')) {
        ageCell.innerHTML = `<input type="text" value="${age}">`;
    }
    if (!stateCell.querySelector('select')) {
        var states = [
            "Andhra Pradesh","Arunachal Pradesh","Assam", 
            "Bihar","Chhattisgarh","Goa", "Gujarat", 
            "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
            "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
            "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu",
            "Lakshadweep", "Delhi", "Puducherry"
        ];
        stateCell.innerHTML = `
            <select id="inputState" name="state">
                ${states.map((state) => `<option value="${state}" ${nState === state ? 'selected' : ''}>${state}</option>`).join('')}
            </select>
            `;
    }
    if(confirmEdit){
        confirmEdit.addEventListener("click", async () => {
            var nameInput = nameCell.querySelector("input");
            var ageInput = ageCell.querySelector("input");
            var stateInput = stateCell.querySelector("select");
    
            if (nameInput && ageInput && stateInput) {
                var updatedUser = {
                    name: nameInput.value,
                    age: ageInput.value,
                    state: stateInput.value,
                };
                try {
                    const response = await fetch(`https://65f91babdf15145246107311.mockapi.io/api1/users/${row.dataset.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                    });
                    const data = await response.json();
                    console.log('User updated:', data);
                    fetchData();
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            } else {
                console.error('Input elements not found');
            }
        });
    } else {
        console.error('No confirm edit button found');
    }

}

// Function to delete a user
async function deleteUser(id) {
    try {
        var user = await getUser(id);
        var modal = document.getElementById("deleteModal");
        modal.classList.add("show");
        modal.style.display = "block";

        var userNameElement = document.querySelector("#userDeleted");
        if (userNameElement){
            userNameElement.innerText = user.name;
        }

        var cancelDelete = document.querySelectorAll(".deleteCancel");
        cancelDelete.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        });

        var confirmDelete = document.querySelector(".confirmDelete");
        var newConfirmDelete = confirmDelete.cloneNode(true);
        confirmDelete.parentNode.replaceChild(newConfirmDelete, confirmDelete);

        newConfirmDelete.addEventListener("click", async function deleteUserEvent() {
            modal.style.display = "none";
            try {
                const response = await fetch(`https://65f91babdf15145246107311.mockapi.io/api1/users/${id}`, {
                    method: 'DELETE'
                }); 
                const data = await response.json();
                console.log('User deleted:', data);
                fetchData(); // Refresh the table after deleting the user
            } catch (error) {
                console.error('Error deleting user:', error);
            }
            newConfirmDelete.removeEventListener("click", deleteUserEvent);
        });
    } catch (error) {
        console.error('Error getting user:', error);
    }
}
async function getUser(id) {
    try {
        const response = await fetch(`https://65f91babdf15145246107311.mockapi.io/api1/users/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting user:', error);
    }
}
fetchData();
