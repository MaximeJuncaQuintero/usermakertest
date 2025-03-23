// Main JS for the portfolio
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded successfully!');
  
  // Handle mobile navigation if needed
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Simple animation for elements coming into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('active');
      }
    });
  };
  
  // Run on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});