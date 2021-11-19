window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    (function() {
        class Slider {
            constructor(selector, path) {
                this.selector = document.querySelector(selector);
                this.path = path;
                this.slideIndex = 0;
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
    
            showComments() {
                let slideIndex = 0,
                    paused = false;
                const photos = document.querySelectorAll('.slider__slide-wrapper'),
                      dots = document.querySelectorAll('.slider__dot');
                
                function showSlides(x) {
                    if (x > photos.length - 1) {
                        slideIndex = 0;
                    } else if (x < 0) {
                        slideIndex = photos.length;
                    }
                    
                    photos.forEach(photo => {
                        photo.style.display = 'none';
                        photo.classList.remove('slider__active-photo');
                    });
            
                    photos[slideIndex].style.display = 'flex';
                    photos[slideIndex].classList.add('slider__active-photo');
                }
            
                showSlides(slideIndex);
    
                function activeDots() {
                    dots.forEach(dot => {
                        dot.classList.remove('slider__active-dot');
                    });
    
                    dots[slideIndex].classList.add('slider__active-dot');
                }

                activeDots();
    
                function plusSlides(x) {
                    showSlides(slideIndex += x);
                    activeDots(slideIndex);
                }
    
                function activateAnimation() {
                    paused = setInterval(function() {
                        plusSlides(1);
                    }, 1000 * 5);
                }
            
                activateAnimation();
            
                photos[0].parentNode.addEventListener('mouseenter', () => {
                    clearInterval(paused);
                });
            
                photos[0].parentNode.addEventListener('mouseleave', () => {
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
    
                    this.showComments();
                });
            }
        }
    
        new Slider('.slider', 'js/db.json').init();
    }());

    (function() {
        class Form {
            constructor(selector, path, fields) {
                this.selector = document.querySelector(selector);
                this.path = path;
                this.fields = this.selector.querySelectorAll(fields);
            }

            async request(url, data) {
                const result = await fetch(url, {
                    method: 'POST',
                    body: data
                });

                return await result.text();
            }

            clearFields() {
                this.fields.forEach(field => {
                    field.value = '';
                });
            }

            form() {
                this.selector.addEventListener('submit', e => {
                    e.preventDefault();
                    
                    const formData = new FormData(this.selector);

                    this.request(this.path, formData)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(() => {
                        console.log('Error');
                    })
                    .finally(() => {
                        this.clearFields();
                    });
                });
            }
        }

        new Form('.get-in-touch__form', 'js/server.php', '[data-post]').form();
    }());
});