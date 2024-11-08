document.addEventListener('DOMContentLoaded', function () {
  const currentPage = localStorage.getItem('currentPage') || 'home-page.html';
  loadPageContent(currentPage);  
 
  document.addEventListener('click', function (event) {
    const pageLink = event.target.closest('[data-page]');
        
    if (pageLink) {
      const page = pageLink.getAttribute('data-page');
      if (page !== currentPage) {
        loadPageContent(page); 
        localStorage.setItem('currentPage', page); 
      }
    }
  });

  function loadPageContent(page) {
    const fullPath = page.startsWith('http') ? page : `${page}`;

    fetch(fullPath)
      .then(response => response.ok ? response.text() : Promise.reject('Page load failed'))
      .then(data => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = data;

        const newContentContainer = tempContainer.querySelector('#home-page-content');
        
        if (newContentContainer) {
          document.getElementById('content').innerHTML = ''; 
          document.getElementById('content').appendChild(newContentContainer);
          updateStyles(page); 
        } else {
          console.warn('No #home-page-content found in the loaded page');
        }
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById('content').innerHTML = '<p>Error loading the page</p>';
      });
  }

  function updateStyles(page) {
    const linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
      const basePath = './css/';
      if (page === 'home-page.html') {
        linkElement.href = `${basePath}styles.css`;
      }
    }
  }
});