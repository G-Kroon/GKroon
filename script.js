// Function to handle redirects
function redirectToPage(url) {
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const searchInput = document.querySelector('#release-search');
  const releaseItems = document.querySelectorAll('.release-item');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const currentPageSpan = document.getElementById('current-page');
  const totalPagesSpan = document.getElementById('total-pages');

  // Hamburger menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      releaseItems.forEach(item => {
        const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.release-description')?.textContent.toLowerCase() || '';
        item.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? '' : 'none';
      });
    });
  }

  // Pagination
  let currentPage = 1;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(releaseItems.length / itemsPerPage);

  if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

  function updatePageDisplay() {
    if (currentPageSpan) currentPageSpan.textContent = currentPage;
    releaseItems.forEach((item, index) => {
      const itemPage = Math.floor(index / itemsPerPage) + 1;
      item.style.display = itemPage === currentPage ? '' : 'none';
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        updatePageDisplay();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePageDisplay();
      }
    });
  }

  updatePageDisplay();
});

      // EMAIL JS JAVASCRIPT CODE

              (function() {
            // https://dashboard.emailjs.com/admin/account
            emailjs.init({
              publicKey: "4xBx5qkSFzXI53h-i",
            });
        })();
    
        window.onload = function() {
            document.getElementById('contact-form').addEventListener('submit', function(event) {
                event.preventDefault();
                // these IDs from the previous steps
                emailjs.sendForm('contact_service', 'contact_form', this)
                    .then(() => {
                        console.log('SUCCESS!');
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
            });
        }

      // END OF EMAIL JS JAVASCRIPT CODE