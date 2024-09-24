document.addEventListener('DOMContentLoaded', () => {
    function fetchSection (){
        fetch('/app/sectionData')
        .then(response => response.json())
        .then(data => {
            const mydata = data.sectionDatas
            console.log(mydata)
            const container = document.getElementById('allSection')
            mydata.forEach(ee=>{
                const mydiv = document.createElement('div')
                mydiv.setAttribute('class','row mb-2')
                mydiv.innerHTML = `

                            <div class="col-6">
                                <div>
                                    <h5 class="m-0">${ee.sectionName}</h5>
                                </div>    
                            </div>
                            <div class="col-6">
                                <div>
                                    <input type="checkbox" id="switch${ee._id}" data-switch="success" onchange="handleSwitchChange(event, '${ee._id}')" ${ee.isActive ? 'checked' : ''} />
                                    <label  for="switch${ee._id}" data-on-label="Yes" data-off-label="No" class=" d-block"></label>
                                </div>
                            </div>

                        `
                        container.appendChild(mydiv)

            })
            
        })
        .catch(err => console.error('Error fetching image data:', err));


    }
    fetchSection()
    



    // Function to update image URLs in buttons
    function updateImageUrls(images) {
        console.log("test",images)
        const buttons = document.querySelectorAll('button[data-bs-toggle="modal"]');
        buttons.forEach((button, index) => {
            
            if (images[index + 9]) {
                button.setAttribute('data-image-url', images[index + 9]);
            }
        });
    }

    // Fetch image data on page load
    fetch('img/data')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const images = data[0].images; // Get image URLs
                console.log("vchecck",images)
                updateImageUrls(images);
            }
        })
        .catch(err => console.error('Error fetching image data:', err));

    // Show image in modal
    document.querySelectorAll('button[data-bs-toggle="modal"]').forEach(button => {
        button.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image-url');
            const modalImage = document.getElementById('modal-image');
            if (modalImage) {
                modalImage.src = imageUrl || '';
            }
        });
    });
});
function handleSwitchChange(event, id) {
    const isActive = event.target.checked;
    console.log("my id ,", id , isActive)
    fetch(`section/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to update section status");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
