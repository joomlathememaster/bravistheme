( function( $ ) {
    var KngSwiperHandler = function( $scope, $ ) {

        elementorFrontend.waypoint($scope.find('.kng-animate'), function () {
            var $heading = $(this),
                data = $heading.data('settings');
            if(typeof data['animation'] != 'undefined'){
                //$heading.addClass(data['_animation']+' animated').removeClass('elementor-invisible');
                setTimeout(function () {
                    $heading.removeClass('kng-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);
            }
        });

        var breakpoints = elementorFrontend.config.breakpoints,
            carousel = $scope.find(".kng-swiper-container"),
            carousel_thumb = $scope.find(".kng-swiper-container.kng-swiper-thumb");
        if(carousel.length == 0){
            return false;
        }
        var data = carousel.data(), 
            settings = data.settings,
            custom_dots = data.customdot;
            
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'kng-swiper-wrapper',
                slideClass: 'kng-swiper-slide',
                slidesPerView: settings['slides_to_show_mobile'],
                slidesPerGroup: settings['slides_to_scroll_mobile'],
                slidesPerColumn: settings['slide_percolumn'],
                spaceBetween: settings['slides_gutter'],
                navigation: {
                    nextEl: ".kng-swiper-arrow-next",
                    prevEl: ".kng-swiper-arrow-prev",
                },
                pagination : {
                    type: settings['dots_style'],
                    el: '.kng-swiper-dots',
                    clickable : true,
                    modifierClass: 'kng-swiper-pagination-',
                    bulletClass : 'kng-swiper-pagination-bullet',
                    renderCustom: function (swiper, element, current, total) {
                        return current + ' of ' + total;
                    }
                },
                speed: settings['speed'],
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    0 : {
                        slidesPerView: settings['slides_to_show_mobile'],
                        slidesPerGroup: settings['slides_to_scroll_mobile'],
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_mobile_extra'],
                        slidesPerGroup: settings['slides_to_scroll_mobile_extra'],
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_tablet'],
                        slidesPerGroup: settings['slides_to_scroll_tablet'],
                    },
                    1025 : {
                        slidesPerView: settings['slides_to_show_tablet_extra'],
                        slidesPerGroup: settings['slides_to_scroll_tablet_extra'],
                    },
                    1280 : {
                        slidesPerView: settings['slides_to_show_laptop'],
                        slidesPerGroup: settings['slides_to_scroll_laptop'],
                    },
                    1440 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1600 : {
                        slidesPerView: settings['slides_to_show_widescreen'],
                        slidesPerGroup: settings['slides_to_scroll_widescreen'],
                    }
                }
            };
            // loop
            if(settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }
            // auto play
            if(settings['autoplay'] === 'true'){
                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : settings['pause_on_interaction']
                };
            } else {
                carousel_settings['autoplay'] = false;
            }
            // Effect
            if(settings['slide_mode'] === 'cube'){
                carousel_settings['cubeEffect'] = {
                  shadow: false,
                  slideShadows: false,
                  shadowOffset: 0,
                  shadowScale: 0, //0.94,
                };
            }
            if(settings['slide_mode'] === 'coverflow'){
                carousel_settings['centeredSlides'] = true;
                carousel_settings['coverflowEffect'] = {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                };
            }
        carousel.each(function(index, element) {
            
            if(carousel.parents('.elementor-section').hasClass('kng-full-content-with-space-start') || carousel.parents('.elementor-section').hasClass('kng-full-content-with-space-end')){
                setTimeout(function(){
                    var swiper = new Swiper(carousel, carousel_settings);
                }, 800);
            }else{
                var swiper = new Swiper(carousel, carousel_settings);
            }
            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                  mouseenter: function mouseenter() {
                    this.swiper.autoplay.stop();
                  },
                  mouseleave: function mouseleave() {
                    this.swiper.autoplay.start();
                  }
                });
            }
        });  

    };
    var KngSliderHandler = function( $scope, $ ) {
        var breakpoints = elementorFrontend.config.breakpoints,
            carousel = $scope.find(".kng-slider-container");
        if(carousel.length == 0){
            return false;
        }
        var data = carousel.data(), 
            settings = data.settings,
            custom_dots = data.customdot;
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'kng-swiper-slider',
                slideClass: 'kng-slider-item',
                slidesPerView: 1,
                slidesPerGroup: 1,
                slidesPerColumn: 1,
                spaceBetween: 0,
                navigation: {
                  nextEl: ".kng-swiper-arrow-next",
                  prevEl: ".kng-swiper-arrow-prev",
                },
                pagination : {
                    type: settings['dots_style'],
                    el: '.kng-swiper-dots',
                    clickable : true,
                    modifierClass: 'kng-swiper-pagination-',
                    bulletClass : 'kng-swiper-pagination-bullet'
                },
                speed: 500,
                autoplay: false,
                on: {
                    init : function (swiper){
                         
                        elementorFrontend.waypoint($scope.find('.kng-animate'), function () {
                            var $this = $(this),
                                data = $this.data('settings');
                            if(typeof data['animation'] != 'undefined'){
                                setTimeout(function () {
                                    $this.removeClass('kng-invisible').addClass('animated ' + data['animation']);
                                }, data['animation_delay']);
                            }
                        });
                    },
                    slideChangeTransitionStart : function (swiper){
                        var activeIndex = this.activeIndex;
                        var current = this.slides.eq(activeIndex);
                        $('.swiper-slide .kng-animate').each(function(){
                            var data = $(this).data('settings');
                            $(this).removeClass('animated '+data['animation']).addClass('kng-invisible');
                        });
                        current.find('.kng-animate').each(function(){
                            var  $item = $(this), 
                                data = $item.data('settings');
                            setTimeout(function () {
                                $item.removeClass('kng-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);
                        });
                    },
                    slideChange: function (swiper) {
                        var activeIndex = this.activeIndex;
                        var current = this.slides.eq(activeIndex);
                        $('.swiper-slide .kng-animate').each(function(){
                            var data = $(this).data('settings');

                            $(this).removeClass('animated '+data['animation']).addClass('kng-invisible');
                        });
                        current.find('.kng-animate').each(function(){
                            var  $item = $(this), 
                                data = $item.data('settings');
                            setTimeout(function () {
                                $item.removeClass('kng-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);
                        });
                    }
                },
                autoHeight: true
            };
            // Effect
            if(settings['slide_mode'] === 'cube'){
                carousel_settings['cubeEffect'] = {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                };
            }
         
        carousel.each(function(index, element) {
            var swiper = new Swiper(carousel, carousel_settings);
            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                    mouseenter: function mouseenter() {
                    this.swiper.autoplay.stop();
                    },
                    mouseleave: function mouseleave() {
                    this.swiper.autoplay.start();
                    }
                });
            }
        });    
         
    };
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_post_carousel.default', KngSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_testimonial.default', KngSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_fancy_box.default', KngSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_clients.default', KngSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_teams.default', KngSwiperHandler );
        // Sliders
        elementorFrontend.hooks.addAction( 'frontend/element_ready/kng_slider.default', KngSliderHandler );
        
    } );
} )( jQuery );