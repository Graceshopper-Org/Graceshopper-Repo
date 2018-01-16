function carousel (){
  let counter = 0;
  const carouselImages = document.querySelectorAll('.carousel-image');
  setInterval(() => {
    carouselImages[counter].classList.add('hidden');
    counter++;
    if (counter === 4){
      counter = 0;
    }
    carouselImages[counter].classList.remove('hidden');
  }, 5500)
}

carousel();
