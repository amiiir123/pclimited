fetch("/app/login_assets", {
    method: "GET",
  }).then(response => response.json())
  .then((data) => {
    console.log(data)
    document.getElementById('logo').src = `uploads/imgs/landing/${data.logo.filename}`
    const elements = document.getElementsByClassName('auth-fluid');
    console.log(elements)
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.background = `url('uploads/imgs/landing/${data.login.filename}') center`;
    }
  }).catch((err)=>{console.log(err)})
  

  function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting the default way
    
    const email = document.getElementById('emailaddress').value;
    const password = document.getElementById('password').value;
  
    fetch("/app/login-page", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }) // Send email and password as JSON
    })
    .then(response => response.json())
    .then((data) => {
      if (data.redirectUrl) {
        // If login is successful, redirect to the given URL
        window.location.href = data.redirectUrl;
      } else if (data.error) {
        // Show error message
        const message = document.getElementById('messageShow');
        message.classList.add('show');
        message.innerHTML = `
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
          <strong>Error - </strong> ${data.error}
        `;
      }
  
      
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handlRegister(event) {
    event.preventDefault(); // Prevent form from submitting the default way
    
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('emailaddress').value;
    const password = document.getElementById('password').value;
  
    fetch("/app/register-page", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName,email, password }) // Send email and password as JSON
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)



      if (data.redirectUrl) {
        // If login is successful, redirect to the given URL
        window.location.href = data.redirectUrl;
      } else if (data.error) {
        // Show error message
        const message = document.getElementById('messageShow');
        message.style.display = 'block'
        message.classList.add('show');
        message.innerHTML = `
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
          <strong>Error - </strong> ${data.error}
        `;
      }
  
      
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
    function handlRecovery(event) {
      event.preventDefault(); // Prevent form from submitting the default way
      
      const emailaddress = document.getElementById('emailaddress').value;
    
      fetch("/app/auth/recoverypassword", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailaddress}) // Send email and password as JSON
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else if (data.error) {
          const message = document.getElementById('messageShow');
          message.style.display = 'block'
          message.classList.add('show');
          message.innerHTML = `
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>Error - </strong> ${data.error}
          `;
        }
    
        
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
    function handleReset(event){
      event.preventDefault(); // Prevent form from submitting the default way
      
      const resetCode = document.getElementById('pass').value;
    
      fetch("/app/auth/confirm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetCode}) // Send email and password as JSON
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else if (data.error) {
          const message = document.getElementById('messageShow');
          message.style.display = 'block'
  
          message.classList.add('show');
          message.innerHTML = `
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>Error - </strong> ${data.error}
          `;
        }
    
        
      })
      .catch((err) => {
        console.log(err);
      });
  
    }
    function handleResetPass(event){
      event.preventDefault(); // Prevent form from submitting the default way
      
      const newPassword = document.getElementById('password').value;
    
      fetch("/app/auth/resetPassword", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword}) // Send email and password as JSON
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else if (data.error) {
          const message = document.getElementById('messageShow');
          message.style.display = 'block'
  
          message.classList.add('show');
          message.innerHTML = `
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>Error - </strong> ${data.error}
          `;
        }
    
        
      })
      .catch((err) => {
        console.log(err);
      });
  
    }