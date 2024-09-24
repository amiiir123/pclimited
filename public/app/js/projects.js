function previewdata(event,src) {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    const mybutton = document.getElementById('btn-new-event')
    mybutton.classList.remove("btn-success");
    mybutton.classList.add("btn-danger");
        
    clearAllinput()

    // Fetch the image from the server based on the selected value
    if (selectedValue !== '') {
      fetch(`projectss/${selectedValue}`)
        .then(response => response.json())
        .then(data => {
            const mydata = data.project
            console.log(data)
          const imgPreview = document.getElementById(`${src}`);
          if (mydata.filename) {
            // Update the imgPreview with the new image URL
            document.getElementById('myfile').removeAttribute('required')
            imgPreview.src = `${mydata.filename}`;
            document.getElementById('myimg').setAttribute('value',`${mydata.filename}`)
            imgPreview.style.display = 'block'; // Show the image
        } else {
            //document.getElementById('myfile').setAttribute('required','')

            imgPreview.style.display = 'none'; // Hide the image if not found
          }

          document.getElementById('dataId').setAttribute('value',`${mydata._id}`)
          //document.getElementById('deleteButton').setAttribute('onclick',deleteProj(`${mydata._id}`))
          document.getElementById('typeofproject').setAttribute('value',`${mydata._id}`)
          const myar =  document.getElementById('typeofproject').querySelectorAll('option') 
          myar.forEach(ee=>{
            if(ee.value == mydata.type){
                ee.setAttribute('selected','')
                
            }
          })


          document.getElementById('projectTitle').setAttribute('value',`${mydata.title}`)
          document.getElementById('projectDesc').innerHTML = `${mydata.description}`
          console.log(document.getElementById('section'))


          //
        })
        .catch(err => console.error(err));
    }

    
    
    
  }
  
  document.getElementById('deleteButton').addEventListener('click', function() {
      const projectId = document.getElementById('dataId').value; // Get the selected project ID

      if (projectId) {
        // Confirm the deletion
        const confirmDelete = confirm('Are you sure you want to delete this project?');
        if (confirmDelete) {
          deleteProj(projectId);
        }
      } else {
        alert('Please select a project to delete.');
      }
    });
  
    // Delete project function (make an AJAX request or form submission)
    function deleteProj(id) {
      console.log('Deleting project with ID:', id);

      const form =document.getElementById('projectForm')
      form.action = `deletePro/${id}`
      form.method = 'POST'
      form.submit()

      // Here, you can either:
      // 1. Use AJAX to send a DELETE request to your server.
      // 2. Create a hidden form to submit the project ID for deletion.
  
      // Example using AJAX (replace with actual server endpoint)
      
    }









  document.getElementById('btn-new-event').addEventListener('click', function(event) {
    console.log(event.target)
    event.target.classList.remove("btn-danger");
    event.target.classList.add("btn-success");
    
    
    clearAllinput()

    // Reset the form
  });
function clearAllinput(){
    document.getElementById('projectForm').reset();
    
    document.getElementById('dataId').setAttribute('value',"")
    document.getElementById('typeofproject').setAttribute('value','')

    document.getElementById('projectTitle').setAttribute('value',"")
    document.getElementById('projectDesc').innerHTML = ""
    document.getElementById('deleteButton').setAttribute('onclick',"")


    
    // Optionally hide the image preview if necessary
    document.getElementById('imgPreview1').style.display = 'none';



}
/*

let keywordsArray = [];

  const keywordInput = document.getElementById('typeofproject');
  const wordList = document.getElementById('wordList');
  const keywordsArrayInput = document.getElementById('keywordsArray');
  console.log(keywordInput, wordList, keywordsArrayInput);

  // Add keyword to the list when pressing Enter
  keywordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && keywordInput.value.trim() !== '') {
      e.preventDefault();
      addKeyword(keywordInput.value.trim());
      keywordInput.value = '';
    }
  });
  // Remove keyword from array
  function removeKeyword(index) {
    keywordsArray.splice(index, 1);
    renderKeywords();
    updateHiddenInput();
  }
  // Add keyword and update the UI
  function addKeyword(keyword) {
    keywordsArray.push(keyword);
    renderKeywords();
    updateHiddenInput();
  }
  // Update hidden input field with keywords array
  function updateHiddenInput() {
    keywordsArrayInput.value = JSON.stringify(keywordsArray);
  }
  // Render the keywords as Bootstrap badges
  function renderKeywords() {
    wordList.innerHTML = '';
    keywordsArray.forEach((keyword, index) => {
      const badge = document.createElement('span');
      badge.classList.add('badge', 'bg-primary', 'me-1');
      badge.innerHTML = `${keyword} <span style="cursor: pointer;" onclick="removeKeyword(${index})">&times;</span>`;//problem remove
      wordList.appendChild(badge);
    });
  }

*/