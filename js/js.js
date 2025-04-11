document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselContainer = document.getElementById('modal-carousel');
    
    let currentImageIndex = 0;  // Keeps track of the current image in the carousel
    let imagesArray = [];  // Holds the image URLs for the carousel

    // Function to show the modal
    function showModal(block) {
        const title = block.getAttribute('data-title');
        const description = block.getAttribute('data-description');
        const details = block.getAttribute('data-details') || '';
        const listItems = block.getAttribute('data-list') ? block.getAttribute('data-list').split(',') : [];
        const imageLinks = block.getAttribute('data-images') ? block.getAttribute('data-images').split(',') : [];

        // Update modal content
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-description').innerHTML = ` 
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Details:</strong><br> ${details.replace(/\n/g, '<br>')}</p>
        `;

        // Set up the carousel images
        imagesArray = imageLinks;
        currentImageIndex = 0;
        loadCarouselImages();

        // Populate list in modal
        const listElement = document.getElementById('modal-list');
        listElement.innerHTML = '';
        listItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.trim();
            listElement.appendChild(listItem);
        });

        modal.style.display = 'block';
    }

    // Function to load carousel images dynamically
    function loadCarouselImages() {
        carouselContainer.innerHTML = '';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';

        // If there are images, show the carousel buttons
        if (imagesArray.length > 0) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';

            // Create image elements for each image in imagesArray
            imagesArray.forEach((imageLink, index) => {
                const img = document.createElement('img');
                img.src = imageLink;
                img.alt = `Image ${index + 1}`;
                img.style.display = index === currentImageIndex ? 'block' : 'none';
                carouselContainer.appendChild(img);
            });
        }
    }

    // Function to change the carousel image (next/previous)
    function changeImage(direction) {
        currentImageIndex += direction;

        // Loop back to the first image if we're at the end
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        }

        // Loop to the last image if we're at the beginning
        if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }

        loadCarouselImages();  // Reload the images in the new order
    }

    // Loop through each block and add an event listener for clicks
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('click', () => {
            showModal(block); 
        });
    });

    // Close the modal when clicking on the close button (X)
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Event listeners for the carousel buttons (previous/next)
    prevButton.addEventListener('click', () => changeImage(-1));
    nextButton.addEventListener('click', () => changeImage(1));
});
