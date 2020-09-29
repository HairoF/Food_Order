function slider() {

    const slids = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.getElementById('current'),
          total = document.getElementById('total'),
          slidsWrapper = document.querySelector('.offer__slider-wrapper'),
          slidsField = document.querySelector('.offer__slider-inner'),
          slidsWidth = window.getComputedStyle(slidsWrapper).width;

    let slidesIndex = 1;
    let offset = 0;
    changeSliderNumbering();

    if (slids.length < 10) {
        total.innerHTML = `0${slids.length}`;
        current.innerHTML = `0${slidesIndex}`;
    } else {
        total.innerHTML = slids.length;
        current.innerHTML = slidesIndex;
    } 

    function changeSliderNumbering() {
        if (slids.length < 10) {
            current.innerHTML = `0${slidesIndex}`;
        } else {
            current.innerHTML = slidesIndex;
        }
    }


    slidsField.style.width = 100 * slids.length + '%';
    slidsField.style.display = 'flex';
    slidsField.style.transition = '0.5s all';

    slidsWrapper.style.overflow = 'hidden';
    
    slids.forEach((slide) => {
        slide.style.width = slidsWidth;
    });
    slider.style.position = 'relative';
//generate dots for sliders
    const dotsInd = document.createElement('ol'),
          dots = [];

    dotsInd.classList.add('carousel-indicators');
    slider.append(dotsInd);

    for(let i = 0; i < slids.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if( i == 0) {
            dot.style.opacity = 1;
        }

        dotsInd.append(dot);
        dots.push(dot);
    }
    

    next.addEventListener('click', () => {
        if(offset == +slidsWidth.slice(0, slidsWidth.length - 2) * (slids.length - 1)) {
            offset = 0;
        } else {
            offset += +slidsWidth.slice(0, slidsWidth.length - 2);
        }

        slidsField.style.transform = `translateX(-${offset}px)`;
        
        if(slidesIndex == slids.length) {
            slidesIndex = 1;
        } else {
            slidesIndex++;
        }

        changeSliderNumbering();

        dots.forEach((dot) => dot.style.opacity = '.5');
        dots[slidesIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +slidsWidth.slice(0, slidsWidth.length - 2) * (slids.length - 1);
        } else {
            offset -= +slidsWidth.slice(0, slidsWidth.length - 2);
        }

        slidsField.style.transform = `translateX(-${offset}px)`;
        if(slidesIndex == 1) {
            slidesIndex = slids.length;
        } else {
            slidesIndex--;
        }

        changeSliderNumbering();

        dots.forEach((dot) => dot.style.opacity = '.5');
        dots[slidesIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidesIndex = slideTo;
            console.log(slidesIndex);
            offset = +slidsWidth.slice(0, slidsWidth.length - 2) * (slideTo - 1);
            
            slidsField.style.transform = `translateX(-${offset}px)`;

            changeSliderNumbering();

            dots.forEach((dot) => dot.style.opacity = '.5');
            dots[slidesIndex - 1].style.opacity = 1;
        });
    });
}

module.exports = slider;