function previewImg(event,src) {
    const selectedValue = event.target.value;

    // Fetch the image from the server based on the selected value
    if (selectedValue) {
      fetch(`get-image/${selectedValue}`)
        .then(response => response.json())
        .then(data => {
          const imgPreview = document.getElementById(`${src}`);
          if (data.imgUrl) {
            // Update the imgPreview with the new image URL
            imgPreview.src = `uploads/imgs/landing/${data.imgUrl}`;
            imgPreview.style.display = 'block'; // Show the image
          } else {
            imgPreview.style.display = 'none'; // Hide the image if not found
          }
        })
        .catch(err => console.error(err));
    }
  }
