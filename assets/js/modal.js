const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-btn");
document.addEventListener('click', function(event) {
if (event.target.id === 'details-btn') {
    modal.classList.add('show-modal');
}
});

closeModal =()=>{
    modal.classList.remove('show-modal');
}

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);