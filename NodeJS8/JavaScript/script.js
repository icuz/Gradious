let dropArea = document.getElementById('drop-area');
let fileInput = document.getElementById('file-holder');
let fileButton = document.getElementById('file-button');
let uploadedFilesDiv = document.getElementById('uploaded-files');

fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    let files = e.target.files;
    handleFiles(files);
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    let files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFiles(files) {
    ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
    let url = 'http://localhost:3000/upload';
    let formData = new FormData();
    formData.append('file', file);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('File uploaded successfully');
        displayUploadedFileLink(data.fileUrl, file.name);
        saveFileLinkToLocalStorage(data.fileUrl, file.name);
    })
    .catch(() => {
        console.error('File upload failed');
        alert('File upload failed: The file format is not supported or the file size exceeds the limit.\n' + file.name);
    });
}

function displayUploadedFileLink(fileUrl, fileName) {
    let link = document.createElement('a');
    link.href = fileUrl;
    link.textContent = `Download ${fileName}`;
    link.target = '_blank';
    uploadedFilesDiv.appendChild(link);
    uploadedFilesDiv.appendChild(document.createElement('br'));
}

function saveFileLinkToLocalStorage(fileUrl, fileName) {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    uploadedFiles.push({ fileUrl, fileName });
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
}

function loadUploadedFileLinks() {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    uploadedFiles.forEach(file => {
        displayUploadedFileLink(file.fileUrl, file.fileName);
    });
}

// Load uploaded file links when the page loads
document.addEventListener('DOMContentLoaded', loadUploadedFileLinks);