document.addEventListener("DOMContentLoaded", () => {
  // Function to update image URLs in buttons
  function updateImageUrls(images) {
    const buttons = document.querySelectorAll('button[data-bs-toggle="modal"]');
    buttons.forEach((button, index) => {
      if (images[index]) {
        button.setAttribute("data-image-url", images[index]);
      }
    });
  }

  // Fetch image data on page load
  fetch("img/data")
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const images = data[0].images; // Get image URLs
        
        updateImageUrls(images);
      }
    })
    .catch((err) => console.error("Error fetching image data:", err));

  // Show image in modal
  document
    .querySelectorAll('button[data-bs-toggle="modal"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const imageUrl = this.getAttribute("data-image-url");
        const modalImage = document.getElementById("modal-image");
        if (modalImage) {
          modalImage.src = imageUrl || "";
        }
      });
    });
});
// Function to display data based on the selected value
const showData = function (test, variable) {


  const selectedId = document.getElementById(`${variable}Select`).value;
  const selectedService = test.find((element) => element._id === selectedId);
  if (selectedService) {
    document.getElementById(`${variable}Id`).value = selectedService._id;
    document.getElementById(`${variable}Title`).value = selectedService.title;
    document.getElementById(`${variable}Description`).value =
      selectedService.description;

    if (variable === "caption") {

      document.getElementById("captionButton").value = selectedService.Bcaption;
    }
    if (variable === "data") {
      let myDiv1 = document.getElementById('optional')
      let mylink = document.getElementById('optionaLink')
      let link = document.getElementById('link')
      


    
      document.getElementById("smallTitle").value = selectedService.smtitle;
      if(selectedService.sectionName == 'whatWedo'){
        if (selectedService.ValueOp[0] != ""){
          myDiv1.removeAttribute('class')
          
          keywordsArray = []
          selectedService.ValueOp.forEach(ee=>{
            addKeyword2(ee)
          });
  
        }else {
          document.getElementById('optional').setAttribute('class', 'd-none');
  
        }

      }else {
        document.getElementById('optional').setAttribute('class', 'd-none');

      }
      if(selectedService.sectionName =='ourVideo' || selectedService.sectionName =='aboutSection3' || selectedService.sectionName =='ourVideo' || selectedService.sectionName =='SectionStart' ){
        mylink.removeAttribute('class')
        link.value = selectedService.link

      }else{

          mylink.setAttribute('class', 'd-none');
      }

    }
    if (variable === "qu") {
      document.getElementById("author").value = selectedService.author;
    }
    if (variable === "service") {
      //document.getElementById("serviceFeatures").value = selectedService.features;
      //let myDiv2 = document.getElementById('firstForm')
      
      
      keywordsArray = []
      selectedService.features.forEach(ee=>{
        addKeyword(ee)
        //addKeyword(ee)
      });
      
    }
    if (variable === "box") {
      // Uncomment if needed
      // document.getElementById('defaultIcon').className = selectedService.iClass;
      
    }
  } else {
    console.error(`No service found with ID: ${selectedId}`);
  }
};

// Function to show service details based on the provided type
document.getElementById('optional').setAttribute('class', 'd-none');
function showServiceDetails(type,data) {

    const mydata = JSON.parse(decodeURIComponent(data))
    
    try{

        showData(mydata, type);
    }catch(err){
        
    }
  
}

let keywordsArray = [];

  const keywordInput = document.getElementById('keywordInput');
  const wordList = document.getElementById('wordList');
  const keywordsArrayInput = document.getElementById('keywordsArray');
  

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

  //===========================================================

let keywordsArray2 = [];

  const keywordInput2 = document.getElementById('keywordInput2');
  const wordList2 = document.getElementById('wordList2');
  const keywordsArrayInput2 = document.getElementById('keywordsArray2');

  // Add keyword to the list when pressing Enter
  keywordInput2.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && keywordInput2.value.trim() !== '') {
      e.preventDefault();
      addKeyword2(keywordInput2.value.trim());
      keywordInput2.value = '';
    }
  });
  // Remove keyword from array
  function removeKeyword2(index) {
    keywordsArray2.splice(index, 1);
    renderKeywords2();
    updateHiddenInput2();
  }
  // Add keyword and update the UI
  function addKeyword2(keyword) {
    keywordsArray2.push(keyword);
    renderKeywords2();
    updateHiddenInput2();
  }
  // Update hidden input field with keywords array
  function updateHiddenInput2() {
    keywordsArrayInput2.value = JSON.stringify(keywordsArray2);
  }
  // Render the keywords as Bootstrap badges
  function renderKeywords2() {
    wordList2.innerHTML = '';
    keywordsArray2.forEach((keyword, index) => {
      const badge = document.createElement('span');
      badge.classList.add('badge', 'bg-primary', 'me-1');
      badge.innerHTML = `${keyword} <span style="cursor: pointer;" onclick="removeKeyword2(${index})">&times;</span>`;//problem remove
      wordList2.appendChild(badge);
    });
  }

  //===========================================================


