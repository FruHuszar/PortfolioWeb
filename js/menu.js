let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const hideAfter = window.innerHeight * 0.2; // 20vh

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > hideAfter) {
    if (currentScroll > lastScroll) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  } else {
    navbar.classList.remove('hide');
  }

  lastScroll = currentScroll;
});
