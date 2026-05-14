var backgrounds = document.querySelectorAll('.background');
const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);

// Product data for each color
const productData = [
  {
    title: "Apple AirPods Max Wireless Over-Ear Headphones - Green",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Bluetooth Headphones for iPhone",
    price: "$699.99"
  },
  {
    title: "Apple AirPods Max Wireless Over-Ear Headphones - Blue",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Premium Blue Edition",
    price: "$699.99"
  },
  {
    title: "Apple AirPods Max Wireless Over-Ear Headphones - Red",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Striking Red Design",
    price: "$699.99"
  },
  {
    title: "Apple AirPods Max Wireless Over-Ear Headphones - White",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Elegant White Finish",
    price: "$699.99"
  },
  {
    title: "Apple AirPods Max Wireless Over-Ear Headphones - Black",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Sleek Black Edition",
    price: "$699.99"
  }
];

let imageIndex = 0;
let isTransitioning = false;

// Get DOM elements for content
const productTitle = document.querySelector('.product-title');
const productDescription = document.querySelector('.product-description');
const productPrice = document.querySelector('.product-price');
const sliderContent = document.querySelector('.slider-content');

function updateContent(index) {
  // Add fade out effect
  sliderContent.style.opacity = '0';
  
  setTimeout(() => {
    // Update content
    productTitle.textContent = productData[index].title;
    productDescription.textContent = productData[index].description;
    productPrice.textContent = productData[index].price;
    
    // Fade in
    sliderContent.style.opacity = '1';
  }, 300);
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;
  
  images.forEach(image => {
      image.classList.remove('active', 'previous', 'next', 'inactive');
  });

  images[imageIndex].classList.add('active');

  if (imageIndex - 1 >= 0) {
      images[imageIndex - 1].classList.add('previous');
  } else {
      images[images.length - 1].classList.add('previous');
  }

  if (imageIndex + 1 < images.length) {
      images[imageIndex + 1].classList.add('next');
  } else {
      images[0].classList.add('next');
  }

  images.forEach((image, index) => {
      if (index !== imageIndex && index !== (imageIndex - 1 + images.length) % images.length && index !== (imageIndex + 1) % images.length) {
          image.classList.add('inactive');
      }
  });

  backgrounds.forEach((background) => {
      background.style.opacity = 0;
      background.classList.remove('active');
  });
  
  if (images[imageIndex].classList.contains('active')) {
      backgrounds[imageIndex].style.opacity = 1;
      backgrounds[imageIndex].classList.add('active');
  }
  
  // Update product information
  updateContent(imageIndex);
  
  setTimeout(() => {
    isTransitioning = false;
  }, 1000);
  
  imageIndex = (imageIndex + 1) % images.length;
}

// Initial setup
updateSlider();

// Auto-slide every 3 seconds
setInterval(updateSlider, 3000);