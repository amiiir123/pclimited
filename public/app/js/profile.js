/*

document.addEventListener('DOMContentLoaded', () => {
    // Function to update image URLs in buttons
    function updateImageUrls(images) {
        
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            modalImage.src = images[8] || '';
        }
    }

// Fetch image data on page load
    fetch('img/data')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const images = data[0].images; // Get image URLs
                
                updateImageUrls(images);
            }
        })
        .catch(err => console.error('Error fetching image data:', err));





})
*/