window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // (function() {
        
    // })();

    class Slider {
        constructor(selector, path) {
            this.selector = document.querySelector(selector);
            this.path = path;
        }

        createCommentBlock({src, alt, name, profession, comment} = {}) {
            const commentWrapper = document.createElement('div');
            commentWrapper.classList.add('slider__slide-wrapper');
            this.selector.append(commentWrapper);

            commentWrapper.innerHTML = `
                <div class="slider__photo-wrapper">
                    <img class="slider__photo" src=${src} alt=${alt}>
                </div>
                <div class="slider__descr-wrapper">
                    <h2 class="slider__name">${name}</h2>
                    <h3 class="slider__profession">${profession}</h3>
                    <p class="slider__comment">${comment}</p>
                    <div class="slider__social-bar">
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-facebook"></span>
                        </a>
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-twitter"></span>
                        </a>
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-google"></span>
                        </a>
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-pinterest-p"></span>
                        </a>
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-linkedin2"></span>
                        </a>
                        <a class="slider__social-link" href="#">
                            <span class="slider__social-icon icon-basketball"></span>
                        </a>
                    </div>
                </div>
            `;
        }

        createDots(items) {
            const dotsWrapper = document.createElement('div');
            dotsWrapper.classList.add('slider__dots');
            this.selector.append(dotsWrapper);

            for (let i = 0; i < items; i++) {
                const dot = document.createElement('span');
                dot.classList.add('slider__dot');
                dotsWrapper.append(dot);
            }
        }

        showSlides() {
            /* let sliderWidth = this.selector.offsetWidth;
            const items = document.querySelectorAll('.slider__slide-wrapper');
            const slidesWidth = items.length * sliderWidth;
            let slideIndex = 0;
            let sliderPosition = 

            console.log(sliderWidth);

            if (sliderWidth == items.offsetWidth[0]) {
                slideIndex = 0;
                
            }
    
            if (x < 0) {
                slideIndex = items.length;
            }
            
            items.forEach(item => {
                item.style.display = 'none';
            });
    
            items[slideIndex].style.display = 'flex';

            console.log(slidesWidth); */




            let slideIndex = 0,
                paused = false;
        
            const items = document.querySelectorAll('.slider__slide-wrapper');

            const dots = document.querySelectorAll('.slider__dot');
            
            function showSlides(x) {
                if (x > items.length - 1) {
                    slideIndex = 0;
                }
        
                if (x < 0) {
                    slideIndex = items.length;
                }
                
                items.forEach(item => {
                    item.style.display = 'none';
                });
        
                items[slideIndex].style.display = 'flex';
            }
        
            showSlides(slideIndex);

            function activeDots(x) {
                dots.forEach(dot => {
                    dot.classList.remove('slider__active-dots');
                });

                dots[slideIndex += x].classList.add('slider__active-dots');
            }

            function plusSlides(x) {
                showSlides(slideIndex += x);
                activeDots(x);
            }

            function activateAnimation() {
                paused = setInterval(function() {
                    plusSlides(1);
                }, 1000 * 3);
            }
        
            activateAnimation();
        
            items[0].parentNode.addEventListener('mouseenter', () => {
                clearInterval(paused);
            });
        
            items[0].parentNode.addEventListener('mouseleave', () => {
                activateAnimation();
            });
        }

        async get(url) {
            let result = await fetch(url);
            
            if (!result.ok) {
                throw new Error(`Could not fetch ${url}, status: ${result.status}`);
            }
            
            return await result.json();
        }

        init() {
            this.get(this.path)
            .then(response => {
                let data = response.commentators;
                let items = response.commentators.length;

                data.forEach(slide => {
                    this.createCommentBlock(slide);
                });

                this.createDots(items);

                this.showSlides();
            });
        }
    }

    new Slider('.slider__inner', 'js/db.json').init();
});