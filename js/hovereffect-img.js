document.querySelectorAll('.diag-reveal').forEach(card => {

    let inside = false;
    let leaveTimer = null;

    card.addEventListener('mouseenter', () => {
        inside = true;
        clearTimeout(leaveTimer);
        card.classList.add('is-revealed');
    });

    card.addEventListener('mousemove', () => {
        inside = true;
    });

    card.addEventListener('mouseleave', () => {
        inside = false;

        leaveTimer = setTimeout(() => {
            if (!inside) {
                card.classList.remove('is-revealed');
            }
        }, 120); 
    });
});
