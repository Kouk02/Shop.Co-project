function loadPageContent(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      
      document.getElementById('content').innerHTML = data;
     
      history.pushState(null, "", page);
    })
    .catch(error => {
      console.error("Error loading the page:", error);
    });
}


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); 
    const page = this.getAttribute('data-page');
    loadPageContent(page);
  });
});


loadPageContent('home-page.html');