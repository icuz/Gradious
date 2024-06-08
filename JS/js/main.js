document.getElementById("apply").addEventListener("click", function() {
      const name = document.getElementById('first_name').value;
      const lname = document.getElementById('last_name').value;
      const email = document.getElementById('email').value;
      const experience = document.getElementById('position').value;
      const phone = document.getElementById('phone').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const city = document.getElementById('city').value;
      const startDate = document.getElementById('start_date').value;
      const interviewDate = document.getElementById('interview_date').value;
      localStorage.setItem('name', name);
      localStorage.setItem('lname', lname);
      localStorage.setItem('email', email);
      localStorage.setItem('experience', experience);
      localStorage.setItem('phone', phone);
      localStorage.setItem('gender', gender);
      localStorage.setItem('city', city);
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('interviewDate', interviewDate);

      alert('You have successfully applied for the full-stack developer job');
    });

    document.addEventListener('DOMContentLoaded', function() {
      const nameInput = document.getElementById('first_name');
      const lnameInput = document.getElementById('last_name');
      const emailInput = document.getElementById('email');
      const experienceInput = document.getElementById('position');
      const phoneInput = document.getElementById('phone');
      const genderInputs = document.getElementsByName('gender'); 
      const cityInput = document.getElementById('city');
      const startDateInput = document.getElementById('start_date');
      const interviewDateInput = document.getElementById('interview_date');
      const resumeInput = document.getElementById('resume');

      nameInput.value = localStorage.getItem('name');
      lnameInput.value = localStorage.getItem('lname');
      emailInput.value = localStorage.getItem('email');
      experienceInput.value = localStorage.getItem('experience');
      phoneInput.value = localStorage.getItem('phone');
      cityInput.value = localStorage.getItem('city');
      startDateInput.value = localStorage.getItem('startDate');
      interviewDateInput.value = localStorage.getItem('interviewDate');
      resumeInput.value = localStorage.getItem('resume');

      for (var i = 0; i < genderInputs.length; i++) { 
        if (genderInputs[i].value === localStorage.getItem('gender')) {
          genderInputs[i].checked = true;
          break; 
        }
      }
    });
