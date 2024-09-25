
fetch("currentUser", {
  method: "GET",
}).then(response => response.json())
.then((data) => {
  const user = data.user;
  const mylogo = data.logo_dark;
  const favicon = data.favicon;
  const logo_lg = document.getElementById('logo')
  logo_lg.src = `uploads/imgs/landing/${mylogo.filename}`

  url = `/uploads/imgs/landing/${favicon.filename}`
  changeFavicon(url)
  console.log("hiiiiiiiiii",data)
  const userInfo = document.getElementById("accountUser");
  userInfo.innerHTML = `
     <span class="account-user-avatar"> 
        <img src="${user.avatar}" alt="user-image" class="rounded-circle" id="">
     </span>
     <span>
       <span class="account-user-name">${user.fullName}</span>
       <span class="account-position">${user.role}</span>
     </span>
    
    `;


    function changeFavicon(iconURL) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = iconURL;
  }
});

function custom(){



  document.addEventListener('DOMContentLoaded', function() {
  
    fetch('api/user-role', {
      method: 'GET',
      credentials: 'include', 
    })
      .then(response => response.json())
      .then(data => {
        const userRole = data.role;
  
        if (userRole === 'ADMIN') {
          document.querySelectorAll('.admin-only').forEach(item => {
            item.style.display = 'block'; 
          });
          document.querySelectorAll('.manager-only').forEach(item => {
            item.style.display = 'block'; 
          })
        } else if (userRole == 'MANAGER'){
          document.querySelectorAll('.manager-only').forEach(item => {
            item.style.display = 'block'; 
          })
          document.querySelectorAll('.admin-only').forEach(item => {
            item.style.display = 'none'; 
        })
        }else{
          document.querySelectorAll('.admin-only').forEach(item => {
            item.style.display = 'none'; 
        })
        document.querySelectorAll('.manager-only').forEach(item => {
          item.style.display = 'none'; 
        })
      
      }
    })
      .catch(error => console.error('Error fetching user role:', error));
  });
  

}
custom()

function rightSide (){
  document.addEventListener("DOMContentLoaded", function() {
    // Get the body element to manipulate its data attributes
    const body = document.body;

    // Load saved settings when the page loads
    fetch('themesettings')
        .then(response => response.json())
        .then(data => {
            // Set the body attributes based on the saved settings
            body.setAttribute('data-layout-color', data.colorScheme);

            // Set the checkboxes based on saved settings
           
            if (data.colorScheme === 'dark') {
              document.getElementById('dark-mode-check').checked = true ;            
            } else {
                document.getElementById('light-mode-check').checked = true;
            }

        })
        .catch(error => console.error('Error loading settings:', error));

    // Handle color scheme change
    document.querySelectorAll('input[name="color-scheme-mode"]').forEach(input => {
        input.addEventListener('change', function() {
            const colorScheme = this.value;

            // Update body data attributes
            body.setAttribute('data-layout-color', colorScheme);

            // Update settings on the backend
            fetch('themesettings/updatee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ colorScheme })
            })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to update settings');
                }
            })
            .catch(error => console.error('Error updating settings:', error));
        });
    });

    // Handle sidebar theme change
    document.querySelectorAll('input[name="theme"]').forEach(input => {
        input.addEventListener('change', function() {
            const colorScheme = document.querySelector('input[name="color-scheme-mode"]:checked').value;

            // Update body data attributes

            // Update settings on the backend
            fetch('themesettings/updatee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ colorScheme })
            })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to update settings');
                }
            })
            .catch(error => console.error('Error updating settings:', error));
        });
    });

    // Handle reset button click
    document.getElementById('resetBtn').addEventListener('click', function() {
        // Reset settings to default on the backend
        fetch('/themesettings/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                alert('Failed to reset settings');
            } else {
                // Reset body data attributes to default
                body.setAttribute('data-layout-color', 'light');
                window.location.reload();  // Reload the page to apply default settings
            }
        })
        .catch(error => console.error('Error resetting settings:', error));
    });
});

  
}

rightSide()