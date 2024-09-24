  // Client-side JavaScript for handling form submission and message retrieval
  document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatReciever = document.getElementById('chat-receiver');
    const chatMessages = document.getElementById('chat-messages');
    const cardSim = document.getElementById('heloo');
    const myname = document.getElementById('namsss');
    //const attachFileBtn = document.getElementById('attach-file-btn');
    //const chatFile = document.getElementById('chat-file');

    // Function to fetch chat messages
    //area 1
    const usersContainer = document.getElementById('usersToclick')
    //const usersopt = document.getElementById('usersopt')
    const usersopt = document.getElementById('userSelect')
    //const coteee = cardSim.querySelector('.simplebar-content');


    function fetchUsers() {
      fetch('/area1')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const simpleBarContent = cardSim.querySelector('.simplebar-content');
        console.log("myarray :",data.userss)
        data.userss.forEach(msg => {
                console.log(msg)
            myname.innerHTML= `${msg.receiver.fullName}`
            const messageElement = document.createElement('a');
            messageElement.classList.add('text-body',"user-item");
            messageElement.setAttribute('data-user-id',msg._id)
            messageElement.innerHTML = `
            <div class="d-flex align-items-start mt-1 p-2">
                <img src="assets/images/users/avatar-2.jpg" class="me-2 rounded-circle" height="48" alt="Brandon Smith" />
                <div class="w-100 overflow-hidden">
                    <h5 class="mt-0 mb-0 font-14">
                        <span class="float-end text-muted font-12">${new Date(msg.timestamp).toLocaleTimeString()}</span>
                        ${msg.sender.fullName}
                    </h5>
                    <p class="mt-1 mb-0 text-muted font-14">
                        <span class="w-25 float-end text-end"><span class="badge badge-danger-lighten">3</span></span>
                        <span class="w-75">${msg.message}</span>
                    </p>

                </div>
            </div>
            `;

            console.log("barrr:",simpleBarContent)
           if (simpleBarContent) {
              console.log("test 1",messageElement)
              simpleBarContent.appendChild( messageElement);
            } else {
               console.error('SimpleBar content container not found!');
             }

          });

          simpleBarContent.addEventListener('click', function(event) {
            console.log(simpleBarContent)
            event.preventDefault()
            const userItem = event.target.closest('.user-item');
            console.log(userItem)
            if (userItem) {
                const userId = userItem.getAttribute('data-user-id');
                console.log('User ID:', userId);
                fetchUserMessages(userId)
            }
          });
        });


      

        
    }

    // Fetch messages on page load
    fetchUsers();



    function fetchUsersselect(){
      fetch('/app/users-chat',{
         method:"GET"
      })
      .then(response2 => response2.json())
      .then(data2 => {
        console.log("myarray222 :",data2.users2)
        data2.users2.forEach(user => {
            console.log(user)
            const messageElement = document.createElement('option');
            messageElement.setAttribute('value',user._id) //message to 
            messageElement.innerHTML = `${user.fullName}`;
            usersopt.appendChild(messageElement)


          });
        });
    }
    fetchUsersselect();
    //area 1
    
    function displayMessages(messages,Me) {
        console.log("hhhh :",messages)
        chatMessages.innerHTML = '';
        messages.forEach(msg => {
            console.log("msg : ",msg)
            const messageElement = document.createElement('li');
            console.log('me :',Me)
            console.log('msg.sender._id :',msg.sender._id)
            messageElement.classList.add('clearfix',`${msg.sender._id == Me ? 'me': 'odd'}`);
            messageElement.innerHTML = `
              <div class="chat-avatar">
                <img src="assets/images/users/avatar-5.jpg" class="rounded" alt="" />
                <i>${new Date(msg.timestamp).toLocaleTimeString()}</i>
              </div>
              <div class="conversation-text">
                <div class="ctext-wrap">
                  <i>${msg.sender._id == Me ? 'Me': msg.sender.fullName }</i>
                  <p>${msg.message}</p>
                </div>
              </div>
            `;
            chatReciever.value = msg.sender._id;
            chatMessages.appendChild(messageElement);
          });
        };
    
    function fetchUserMessages(userId) {
      fetch(`/app/messages/${userId}`,{
        method:"GET"
      })
        .then(response => response.json())
        .then(data => {
            displayMessages(data.messages,data.Me)
            
        });
      
    }


    function handlMessageSend(event){
      console.log(event.target)
      const userId = event.target.value;
      try{
        console.log("userId handl:",userId)
        if(userId == chatReciever.value){
          chatInput.value = "";
          chatReciever.value = userId;

        }else{
          chatInput.value = "";
          chatMessages.innerHTML=""
          chatReciever.value = userId;
        }

  
      }catch(eet){
        console.log("our",eet)
  
      }
  } 
  const userSelect = document.getElementById("userSelect");
  userSelect.addEventListener("change", handlMessageSend);

    // Handle form submission
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Create a message object
        const messageData = {
          message: chatInput.value,
          receiverId: chatReciever.value, // Replace with actual receiver ID
        };
  
        // Send the message object as JSON
        console.log(JSON.stringify(messageData))
        fetch('/app/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
          chatInput.value = '';
          window.location.reload();

          //fetchUserMessages(messageData.receiverId); // Refresh messages
        });
      });
  

    // Attach file button click
    /*
    attachFileBtn.addEventListener('click', function (e) {
      e.preventDefault();
      chatFile.click();
    });*/
  });

