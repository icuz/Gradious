const studentList = document.getElementById('studentList');

        function loadData() {
            localStorage.clear();
            let studentData = localStorage.getItem('users');

            if (!studentData) {
                let students = {
                    "abhi@gmail.com": {
                        "firstName": "Abhishek",
                        "lastName": "Verma",
                        "mobile": "9012345678",
                        "age": 25,
                        "city": "Delhi"
                    },
                    "babu@gmail.com": {
                        "firstName": "Babu",
                        "lastName": "Annam",
                        "mobile": "1012345678",
                        "age": 20,
                        "city": "Hyderabad"
                    },
                    "john@gmail.com": {
                        "firstName": "John",
                        "lastName": "Doe",
                        "mobile": "9876543210",
                        "age": 22,
                        "city": "New York"
                    },
                    "emma@gmail.com": {
                        "firstName": "Emma",
                        "lastName": "Watson",
                        "mobile": "8765432109",
                        "age": 24,
                        "city": "London"
                    },
                    "jane@gmail.com": {
                        "firstName": "Jane",
                        "lastName": "Smith",
                        "mobile": "1234567890",
                        "age": 27,
                        "city": "Los Angeles"
                    },
                    "alex@gmail.com": {
                        "firstName": "Alex",
                        "lastName": "Johnson",
                        "mobile": "9876543210",
                        "age": 30,
                        "city": "Chicago"
                    },
                };

                localStorage.setItem('users', JSON.stringify(students));
                studentData = JSON.stringify(students);
            }

            const students = JSON.parse(studentData);

            studentList.innerHTML = ''; // Clear previous data

            for (const email in students) {
                const student = students[email];
                const fullName = student.firstName + ' ' + student.lastName;

                const studentElement = document.createElement('div');
                studentElement.classList.add('student');

                studentElement.innerHTML = `
                    <span>${fullName}</span>
                    <span>${student.age}</span>
                    <span>${student.mobile}</span>
                    <span>${email}</span>
                    <span>${student.city}</span>
                `;

                studentList.appendChild(studentElement);
            }
        }

        window.onload = loadData;