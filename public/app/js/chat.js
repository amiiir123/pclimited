  // Client-side JavaScript for handling form submission and message retrieval
  document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatReciever = document.getElementById('chat-receiver'); //id that will receive the mess
    const chatMessages = document.getElementById('chat-messages');
    const cardSim = document.getElementById('heloo');
    //const attachFileBtn = document.getElementById('attach-file-btn');
    //const chatFile = document.getElementById('chat-file');
    
    // Function to fetch chat messages
    //area 1
    const usersContainer = document.getElementById('usersToclick')
    //const usersopt = document.getElementById('usersopt')
    const usersopt = document.getElementById('userSelect')
    //const coteee = cardSim.querySelector('.simplebar-content');
    
    const chat = document.getElementById('mychat');
    chat.style.display = 'none'


    //area of receiver
    function displayMessages(messages,Me,receiver) {
      chat.style.display = 'block'

      console.log("hhhh :",messages)
      const simpleBarContent = chatMessages.querySelector('.simplebar-content');

      if(messages == false){
        simpleBarContent.innerHTML = '';
      }else{
        simpleBarContent.innerHTML = '';
        messages.forEach(msg => {
            console.log("msg : ",msg)
            const messageElement = document.createElement('li');
            console.log('me :',Me)
            console.log('msg.sender._idhhhhhhhhhhhhhhh :',msg.sender)
            console.log('msg.receiver._id :',msg.receiver._id)
            messageElement.classList.add('clearfix',`${msg.sender._id == Me ? 'me': 'odd'}`);
            messageElement.innerHTML = `
              <div class="chat-avatar">
                <img src="${msg.sender.avatar}" class="rounded" alt="" />
                <i>${formatDate(msg.timestamp)}</i>
              </div>
              <div class="conversation-text">
                <div class="ctext-wrap">
                  <i>${msg.sender._id == Me ? 'Me':msg.sender.fullName  }</i>
                  <p>${msg.message}</p>
                </div>
              </div>
            `;
            simpleBarContent.appendChild(messageElement);
          });
      }
      chatReciever.value = receiver;
      };


    function fetchUserMessages(userId) {
      fetch(`/app/messages/${userId}`,{
        method:"GET"
      })
        .then(response => response.json())
        .then(data => {
            displayMessages(data.messages,data.Me,data.receiver)
            
        });
      
    }
    function formatDate(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      
      const diffInTime = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
      if (diffInDays === 0) {
          return `Today at ${date.toLocaleTimeString()}`;
      } else if (diffInDays === 1) {
          return `Yesterday at ${date.toLocaleTimeString()}`;
      } else if (diffInDays < 7) {
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          return `Last ${daysOfWeek[date.getDay()]} at ${date.toLocaleTimeString()}`;
      } else {
          return date.toLocaleDateString();
      }
  }
    function fetchUsers() {
      fetch('/app/area1')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const simpleBarContent = cardSim.querySelector('.simplebar-content');
        simpleBarContent.innerHTML = ""
        data.userss.forEach(msg => {
                console.log(msg)
            const messageElement = document.createElement('a');
            messageElement.classList.add('text-body',"user-item");
            messageElement.setAttribute('data-user-name',`${msg.receiver == data.Me ? msg.senderDetails.fullName : msg.receiverDetails.fullName } ` )
            messageElement.setAttribute('data-user-id',`${msg.receiver == data.Me ? msg.sender : msg.receiver } ` )
            messageElement.innerHTML = `
            <div class="d-flex align-items-start mt-1 p-2">
                <img src="${msg.receiver == data.Me ? msg.senderDetails.avatar : msg.receiverDetails.avatar }" class="me-2 rounded-circle" height="48" alt="Brandon Smith" />
                <div class="w-100 overflow-hidden">
                    <h5 class="mt-0 mb-0 font-14">
                        <span class="float-end text-muted font-12">${formatDate(msg.timestamp)}</span>
                        ${msg.receiver == data.Me ? `${msg.senderDetails.fullName } (${msg.senderDetails.role})`: `${msg.receiverDetails.fullName} (${msg.receiverDetails.role})` }
                    </h5>
                    <p class="mt-1 mb-0 text-muted font-14">
                        <span class="w-25 float-end text-end">${ msg.receiver == data.Me ? "<span class= 'badge badge-danger-lighten'>recieved</span>" : "<span class= 'badge badge-success-lighten'>sent</span>" }</span>
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
    
    //area of receiver 


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
            messageElement.innerHTML = `${user.fullName}(${user.role})`;
            usersopt.appendChild(messageElement)


          });
        });
    }
    //deafult
    fetchUsers(); 


    fetchUsersselect();
    function handlAreaMessages(event){

      console.log("toooot",event.target)
      const data = event.target;
      const displayValue = data.getAttribute('data-display');
      console.log(displayValue)
      if(displayValue == "received"){
        fetchUsers(); 
      }

      //fetchUserMessages(userId)
      /*
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
      }*/
  } 
    function handlMessageSend(event){
      console.log(event.target)
      const userId = event.target.value;
      fetchUserMessages(userId)
      /*
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
      }*/
  } 
  const userSelect = document.getElementById("userSelect");
  userSelect.addEventListener("change", handlMessageSend);

  const userSent = document.getElementById("userSent");
  userSent.addEventListener("click", handlAreaMessages);


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
          fetchUserMessages(messageData.receiverId); // Refresh messages
          fetchUsers(); // Refresh messages
        });
      });
  

  
  });
  //chat scroll 


  ///area search
  jQuery(document).ready(function($) {
    $('.live-search-box').on('keyup', function() {
        console.log("test1", $(this).val());
  
        var searchTerm = $(this).val().toLowerCase(); // Convert the search term to lowercase for case-insensitive search
  
        $('.user-item').each(function(idx, item) {
            var name = $(item).attr("data-user-name").toLowerCase(); // Convert the name to lowercase for case-insensitive search
            console.log("item", item);
            console.log("name", name);
  
            if (name.indexOf(searchTerm) >= 0 || searchTerm.length < 1) {
                $(item).show(); // Use `$(item)` to refer to the current item being looped
            } else {
                $(item).hide();
            }
        });
    });
});

