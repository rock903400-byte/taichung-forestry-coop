document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
      }
    });
  }
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var current = document.querySelector('.nav-links a[href="' + path + '"]');
  if (current) {
    current.classList.add('active');
  }
});
