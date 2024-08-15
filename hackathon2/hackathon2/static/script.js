document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8000/api/bills';

    document.getElementById('billForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const billId = document.getElementById('billId').value;
        const userId = document.getElementById('userId').value;
        const claimType = document.getElementById('claimType').value;
        const claimTitle = document.getElementById('claimTitle').value;
        const dateOfSpent = document.getElementById('dateOfSpent').value;
        const amountSpent = document.getElementById('amountSpent').value;
        const claimDetails = document.getElementById('claimDetails').value;
        const fileUrl = document.getElementById('fileUrl').value;

        const bill = {
            user_id: userId,
            claim_type: claimType,
            claim_title: claimTitle,
            date_of_spent: dateOfSpent,
            amount_spent: amountSpent,
            claim_details: claimDetails,
            file_url: fileUrl
        };

        if (billId) {
            updateBill(billId, bill);
        } else {
            createBill(bill);
        }
    });

    function createBill(bill) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
        .then(response => response.json())
        .then(data => {
            alert('Bill created successfully');
            getBills();
        })
        .catch(error => console.error('Error:', error));
    }

    function updateBill(id, bill) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
        .then(response => response.json())
        .then(data => {
            alert('Bill updated successfully');
            getBills();
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteBill(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Bill deleted successfully');
                getBills();
            } else {
                alert('Failed to delete bill');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function editBill(id, userId, claimType, claimTitle, dateOfSpent, amountSpent, claimDetails, fileUrl) {
        document.getElementById('billId').value = id;
        document.getElementById('userId').value = userId;
        document.getElementById('claimType').value = claimType;
        document.getElementById('claimTitle').value = claimTitle;
        const formattedDateOfSpent = new Date(dateOfSpent).toISOString().split('T')[0];
        document.getElementById('dateOfSpent').value = formattedDateOfSpent;
        document.getElementById('amountSpent').value = amountSpent;
        document.getElementById('claimDetails').value = claimDetails;
        document.getElementById('fileUrl').value = fileUrl;
    }

    function getBills() {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const billsDiv = document.getElementById('bills');
            billsDiv.innerHTML = '';
            data.forEach(bill => {
                const billElement = document.createElement('div');
                billElement.innerHTML = `
                    <p>
                        <strong>ID:</strong> ${bill.id} <br>
                        <strong>User ID:</strong> ${bill.user_id} <br>
                        <strong>Claim Type:</strong> ${bill.claim_type} <br>
                        <strong>Claim Title:</strong> ${bill.claim_title} <br>
                        <strong>Date of Spent:</strong> ${bill.date_of_spent.split('T')[0]} <br>
                        <strong>Amount Spent:</strong> ${bill.amount_spent} <br>
                        <strong>Claim Details:</strong> ${bill.claim_details} <br>
                        <strong>File URL:</strong> <a href="${bill.file_url}" target="_blank">${bill.file_url}</a> <br>
                        <button onclick="editBill('${bill.id}', '${bill.user_id}', '${bill.claim_type}', '${bill.claim_title}', '${bill.date_of_spent}', '${bill.amount_spent}', '${bill.claim_details}', '${bill.file_url}')">Edit</button>
                        <button onclick="deleteBill('${bill.id}')">Delete</button>
                    </p>
                `;
                billsDiv.appendChild(billElement);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function resetForm() {
        document.getElementById('billForm').reset();
        document.getElementById('billId').value = '';
    }

    window.getBills = getBills;
    window.editBill = editBill;
    window.deleteBill = deleteBill;
    window.resetForm = resetForm;
});