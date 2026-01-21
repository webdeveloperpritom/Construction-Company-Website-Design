(function ($) {
  "use strict";

  // Get Device width
  var device_width = window.innerWidth;

  /*======================================
        Preloader activation
    ========================================*/
  function textAnimationEffect() {
    let TextAnim = gsap.timeline();
    let splitText = new SplitType(".text-animation-effect", { types: "chars" });
    if ($(".text-animation-effect .char").length) {
      TextAnim.from(
        ".text-animation-effect .char",
        { duration: 1, x: 50, autoAlpha: 0, stagger: 0.1 },
        "-=1"
      );
    }
  }

  // Preloader
  var innerBars = document.querySelectorAll(".inner-bar");
  var increment = 0;

  function animateBars() {
    for (var i = 0; i < 2; i++) {
      var randomWidth = Math.floor(Math.random() * 101);
      gsap.to(innerBars[i + increment], {
        width: randomWidth + "%",
        duration: 0.5,
        ease: "none",
      });
    }

    setTimeout(function () {
      for (var i = 0; i < 2; i++) {
        gsap.to(innerBars[i + increment], {
          width: "100%",
          duration: 0.5,
          ease: "none",
        });
      }

      increment += 2;

      if (increment < innerBars.length) {
        animateBars();
      } else {
        var preloaderTL = gsap.timeline();
        preloaderTL.to(".preloader", {
          "--preloader-clip": "100%",
          duration: 0.8,
          ease: "none",
          delay: 0.8,
        });
        preloaderTL.set(".preloader", {
          display: "none",
        });
        let splitText = new SplitType(".text-animation-effect", {
          types: "chars",
        });
        if ($(".text-animation-effect .char").length) {
          preloaderTL.from(
            ".text-animation-effect .char",
            { duration: 1.5, x: 50, autoAlpha: 0, stagger: 0.1 },
            "-=1"
          );
        }
      }
    }, 200);
  }

  $(window).on("load", function () {
    animateBars();
    setTimeout(function () {
      $(".preloader").remove();
    }, 3000);
  });

  $(document).ready(function () {
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      $("body").addClass("firefox");
    }

    var header = $(".header"),
      stickyHeader = $(".primary-header");

    function menuSticky(w) {
      if (w.matches) {
        $(window).on("scroll", function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 110) {
            stickyHeader.addClass("fixed");
          } else {
            stickyHeader.removeClass("fixed");
          }
        });
        if ($(".header").length > 0) {
          var headerHeight = document.querySelector(".header"),
            setHeaderHeight = headerHeight.offsetHeight;
          header.each(function () {
            $(this).css({
              height: setHeaderHeight + "px",
            });
          });
        }
      }
    }

    var minWidth = window.matchMedia("(min-width: 992px)");
    if (header.hasClass("sticky-active")) {
      menuSticky(minWidth);
    }

    //Mobile Menu Js
    $(".mobile-menu-items").meanmenu({
      meanMenuContainer: ".side-menu-wrap",
      meanScreenWidth: "992",
      meanMenuCloseSize: "30px",
      meanRemoveAttrs: true,
      meanExpand: ['<i class="fa-solid fa-caret-down"></i>'],
    });

    // Mobile Sidemenu
    $(".mobile-side-menu-toggle").on("click", function () {
      $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
    });

    $(".mobile-side-menu-close, .mobile-side-menu-overlay").on(
      "click",
      function () {
        $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass(
          "is-open"
        );
      }
    );

    // Popup Search Box
    $(function () {
      $("#popup-search-box").removeClass("toggled");

      $(".dl-search-icon").on("click", function (e) {
        e.stopPropagation();
        $("#popup-search-box").toggleClass("toggled");
        $("#popup-search").focus();
      });

      $("#popup-search-box input").on("click", function (e) {
        e.stopPropagation();
      });

      $("#popup-search-box, body").on("click", function () {
        $("#popup-search-box").removeClass("toggled");
      });
    });

    // Popup Sidebox
    function sideBox() {
      $("body").removeClass("open-sidebar");
      $(document).on("click", ".sidebar-trigger", function (e) {
        e.preventDefault();
        $("body").toggleClass("open-sidebar");
      });
      $(document).on(
        "click",
        ".sidebar-trigger.close, #sidebar-overlay",
        function (e) {
          e.preventDefault();
          $("body.open-sidebar").removeClass("open-sidebar");
        }
      );
    }

    sideBox();

    // Venobox Video

    $(".venobox").venobox();
    new VenoBox({
      selector: ".video-popup, .img-popup",
      bgcolor: "transparent",
      numeration: true,
      infinigall: true,
      spinner: "plane",
    });

    // Data Background
    $("[data-background").each(function () {
      $(this).css(
        "background-image",
        "url( " + $(this).attr("data-background") + "  )"
      );
    });

    // Custom Cursor
    $("body").append('<div class="mt-cursor"></div>');
    var cursor = $(".mt-cursor"),
      linksCursor = $("a, .swiper-nav, button, .cursor-effect"),
      crossCursor = $(".cross-cursor");

    $(window).on("mousemove", function (e) {
      cursor.css({
        transform:
          "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
        visibility: "inherit",
      });
    });

    /* Odometer */
    $(".odometer").waypoint(
      function () {
        var odo = $(".odometer");
        odo.each(function () {
          var countNumber = $(this).attr("data-count");
          $(this).html(countNumber);
        });
      },
      {
        offset: "80%",
        triggerOnce: true,
      }
    );

    // Nice Select Js
    $("select").niceSelect();

    // Award Animation

    let lastActiveImg = $(".award-main-img").attr("src");

    $(document).on("mouseenter", ".award-list-item", function () {
      let newImg = $(this).data("img");
      $(".award-main-img")
        .stop()
        .fadeOut(300, function () {
          $(this).attr("src", newImg).fadeIn(300);
        });
      $(".award-list-item").removeClass("active");
      $(this).addClass("active");
      lastActiveImg = newImg;
    });

    // Testi Carousel
    var swiperTesti = new Swiper(".testi-carousel", {
      slidesPerView: 1,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: true,
      grabcursor: true,
      speed: 800,
      navigation: {
        nextEl: ".testi-nav-wrap .swiper-prev",
        prevEl: ".testi-nav-wrap .swiper-next",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        767: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      },
    });

    // Testi Carousel
    var swiperTesti = new Swiper(".testi-carousel-2", {
      slidesPerView: 1,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: true,
      grabcursor: true,
      speed: 800,
      navigation: {
        nextEl: ".testi-carousel-2 .swiper-prev",
        prevEl: ".testi-carousel-2 .swiper-next",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        767: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      },
    });

    // Testi Carousel
    var swiperTesti = new Swiper(".testi-carousel-3", {
      slidesPerView: 1,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: true,
      grabcursor: true,
      speed: 800,
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
      },
    });

    // Project Carousel
    var swiperTesti = new Swiper(".project-carousel", {
      slidesPerView: 1,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: false,
      autoplay: false,
      grabcursor: true,
      speed: 1200,
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
      },
    });

    // Team Carousel
    var teamThumb = new Swiper(".team-thumb-carousel", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      direction: "vertical",
      watchSlidesProgress: true,
    });

    var teamCarousel = new Swiper(".team-carousel", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: teamThumb,
      },
    });

    // Brand Slider
    var sponsorCarouselElement = document.querySelector(".sponsor-carousel");

    if (sponsorCarouselElement) {
      var autoplayEnabled =
        sponsorCarouselElement.getAttribute("data-autoPlay") === "true";
      var sliderSpeed = parseInt(
        sponsorCarouselElement.getAttribute("data-sliderSpeed"),
        10
      );

      var swiperOptions = {
        loop: true,
        speed: sliderSpeed,
        spaceBetween: 120,
        autoplay: true,
        slidesPerView: "auto",
        allowTouchMove: false,
        autoplay: false,
      };

      if (autoplayEnabled) {
        swiperOptions.autoplay = {
          delay: 1,
        };
        swiperOptions.breakpoints = {
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          767: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1200: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        };
      }

      var sponsorCarousel = new Swiper(".sponsor-carousel", swiperOptions);
    }

    // Sticky Element

    var pin_fixed = document.querySelector(".pin-element");
    if (pin_fixed && device_width > 991) {
      gsap.to(".pin-element", {
        scrollTrigger: {
          trigger: ".pin-area",
          pin: ".pin-element",
          start: "top top",
          end: "bottom 80%",
          pinSpacing: false,
        },
      });
    }

    // hover reveal start
    const hoverItem = document.querySelectorAll(".service-hover-reveal-item");
    function moveImage(e, hoverItem, index) {
      const item = hoverItem.getBoundingClientRect();
      const x = e.clientX - item.x;
      const y = e.clientY - item.y;
      if (hoverItem.children[index]) {
        hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
      }
    }
    hoverItem.forEach((item, i) => {
      item.addEventListener("mousemove", (e) => {
        setInterval(moveImage(e, item, 1), 50);
      });
    });
    // hover reveal end

    // carouselTicker initail
    $(".carouselTicker-nav").carouselTicker({});
    $(".carouselTicker-start").carouselTicker({
      direction: "next",
    });

    //Running Animated Text
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }

    // Service Animation
    gsap.utils
      .toArray(".service-item-wrap-2 .service-item-2")
      .forEach((element, index, array) => {
        if (index === array.length - 1) return;

        const delay = parseFloat(element.getAttribute("data-ani-delay")) || 0;
        gsap.to(element, {
          scale: 0.6,
          opacity: 0,
          duration: 2,
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 15%",
            end: "bottom 15%",
            scrub: 2,
            pin: true,
            pinSpacing: false,
            markers: false,
          },
        });
      });

    // Image Reveal

    gsap.registerPlugin(ScrollTrigger);

    let revealContainers = document.querySelectorAll(".reveal");

    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "restart none none reset",
        },
      });

      tl.set(container, { autoAlpha: 1 });
      tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });
    });

    const images = document.querySelectorAll(".img-reveal");

    const removeOverlay = (overlay) => {
      let tl = gsap.timeline();

      tl.to(overlay, {
        duration: 1.4,
        ease: "Power2.easeInOut",
        width: "0%",
      });

      return tl;
    };

    const scaleInImage = (image) => {
      let tl = gsap.timeline();

      tl.from(image, {
        duration: 1.4,
        scale: 1.4,
        ease: "Power2.easeInOut",
      });

      return tl;
    };

    images.forEach((image) => {
      gsap.set(image, {
        visibility: "visible",
      });

      const overlay = image.querySelector(".img-overlay");
      const img = image.querySelector("img");

      const masterTL = gsap.timeline({ paused: true });
      masterTL.add(removeOverlay(overlay)).add(scaleInImage(img), "-=1.4");

      let options = {
        threshold: 0,
      };

      const io = new IntersectionObserver((entries, options) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            masterTL.play();
          } else {
            masterTL.progress(0).pause();
          }
        });
      }, options);

      io.observe(image);
    });

    // Scroll Animation

    let typeSplit = new SplitType("[data-text-animation]", {
      types: "lines,words, chars",
      className: "line",
    });
    var text_animations = document.querySelectorAll("[data-text-animation]");

    function createScrollTrigger(triggerElement, timeline) {
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => timeline.play(),
        toggleClass: { targets: triggerElement, className: "active" },
      });
    }

    text_animations.forEach((animation) => {
      let type = "slide-up",
        duration = 0.75,
        offset = 80,
        stagger = 0.6,
        delay = 0,
        scroll = 1,
        split = "line",
        ease = "power2.out";
      // Set attribute
      if (animation.getAttribute("data-stagger")) {
        stagger = animation.getAttribute("data-stagger");
      }
      if (animation.getAttribute("data-duration")) {
        duration = animation.getAttribute("data-duration");
      }
      if (animation.getAttribute("data-text-animation")) {
        type = animation.getAttribute("data-text-animation");
      }
      if (animation.getAttribute("data-delay")) {
        delay = animation.getAttribute("data-delay");
      }
      if (animation.getAttribute("data-ease")) {
        ease = animation.getAttribute("data-ease");
      }
      if (animation.getAttribute("data-scroll")) {
        scroll = animation.getAttribute("data-scroll");
      }
      if (animation.getAttribute("data-offset")) {
        offset = animation.getAttribute("data-offset");
      }
      if (animation.getAttribute("data-split")) {
        split = animation.getAttribute("data-split");
      }
      if (scroll == 1) {
        if (type == "slide-up") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            yPercent: offset,
            duration,
            ease,
            opacity: 0,
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "slide-down") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            yPercent: -offset,
            duration,
            ease,
            opacity: 0,
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "rotate-in") {
          let tl = gsap.timeline({ paused: true });
          tl.set(animation.querySelectorAll(`.${split}`), {
            transformPerspective: 400,
          });
          tl.from(animation.querySelectorAll(`.${split}`), {
            rotationX: -offset,
            duration,
            ease,
            force3D: true,
            opacity: 0,
            transformOrigin: "top center -50",
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "slide-from-left") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            xPercent: -offset,
            duration,
            opacity: 0,
            ease,
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "slide-from-right") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            xPercent: offset,
            duration,
            opacity: 0,
            ease,
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "fade-in") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            duration,
            ease,
            opacity: 0,
            stagger: { amount: stagger },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "fade-in-right") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            x: 100,
            autoAlpha: 0,
            duration,
            stagger: stagger,
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "fade-in-bottom-line") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            autoAlpha: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            delay: 0.3,
            duration,
            stagger: stagger,
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "fade-in-random") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            duration,
            ease,
            opacity: 0,
            stagger: { amount: stagger, from: "random" },
          });
          createScrollTrigger(animation, tl);
        }
        if (type == "scrub") {
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: animation,
              start: "top 90%",
              end: "top center",
              scrub: true,
            },
          });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0.2,
            duration,
            ease,
            stagger: { amount: stagger },
          });
        }

        // Avoid flash of unstyled content
        gsap.set("[data-text-animation]", { opacity: 1 });
      } else {
        if (type == "slide-up") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            yPercent: offset,
            duration,
            ease,
            opacity: 0,
          });
        }
        if (type == "slide-down") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            yPercent: -offset,
            duration,
            ease,
            opacity: 0,
          });
        }
        if (type == "rotate-in") {
          let tl = gsap.timeline({ paused: true });
          tl.set(animation.querySelectorAll(`.${split}`), {
            transformPerspective: 400,
          });
          tl.from(animation.querySelectorAll(`.${split}`), {
            rotationX: -offset,
            duration,
            ease,
            force3D: true,
            opacity: 0,
            transformOrigin: "top center -50",
          });
        }
        if (type == "slide-from-right") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            xPercent: offset,
            duration,
            opacity: 0,
            ease,
          });
        }
        if (type == "fade-in") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            duration,
            ease,
            opacity: 0,
          });
        }
        if (type == "fade-in-random") {
          let tl = gsap.timeline({ paused: true });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            duration,
            ease,
            opacity: 0,
            stagger: { amount: stagger, from: "random" },
          });
        }
        if (type == "scrub") {
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0.2,
            duration,
            ease,
          });
        }
      }
    });

    if ($(".fade-wrapper").length > 0) {
      $(".fade-wrapper").each(function () {
        var section = $(this);
        var fadeItems = section.find(".fade-top");

        fadeItems.each(function (index, element) {
          var delay = index * 0.1;

          gsap.set(element, {
            opacity: 0,
            y: 100,
          });

          ScrollTrigger.create({
            trigger: element,
            start: "top 100%",
            end: "bottom 20%",
            scrub: 0.5,
            onEnter: function () {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: delay,
              });
            },
            once: true,
          });
        });
      });
    }

    let fadeArray_items = document.querySelectorAll(".slide-anim");
    if (fadeArray_items.length > 0) {
      const fadeArray = gsap.utils.toArray(".slide-anim");
      fadeArray.forEach((item, i) => {
        var fade_direction = "bottom";
        var onscroll_value = 1;
        var duration_value = 1.15;
        var fade_offset = 50;
        var delay_value = 0.15;
        var ease_value = "power2.out";
        if (item.getAttribute("data-offset")) {
          fade_offset = item.getAttribute("data-offset");
        }
        if (item.getAttribute("data-duration")) {
          duration_value = item.getAttribute("data-duration");
        }
        if (item.getAttribute("data-direction")) {
          fade_direction = item.getAttribute("data-direction");
        }
        if (item.getAttribute("data-on-scroll")) {
          onscroll_value = item.getAttribute("data-on-scroll");
        }
        if (item.getAttribute("data-delay")) {
          delay_value = item.getAttribute("data-delay");
        }
        if (item.getAttribute("data-ease")) {
          ease_value = item.getAttribute("data-ease");
        }
        let animation_settings = {
          opacity: 0,
          ease: ease_value,
          duration: duration_value,
          delay: delay_value,
        };
        if (fade_direction == "top") {
          animation_settings["y"] = -fade_offset;
        }
        if (fade_direction == "left") {
          animation_settings["x"] = -fade_offset;
        }
        if (fade_direction == "bottom") {
          animation_settings["y"] = fade_offset;
        }
        if (fade_direction == "right") {
          animation_settings["x"] = fade_offset;
        }
        if (onscroll_value == 1) {
          animation_settings["scrollTrigger"] = {
            trigger: item,
            start: "top 85%",
          };
        }
        gsap.from(item, animation_settings);
      });
    }

    window.addEventListener("load", (event) => {
      setTimeout(() => {
        function textAnimationEffect() {
          let TextAnim = gsap.timeline();
          let splitText = new SplitType(".text-animation-effect", {
            types: "chars",
          });
          if ($(".text-animation-effect .char").length) {
            TextAnim.from(
              ".text-animation-effect .char",
              { duration: 1, x: 50, autoAlpha: 0, stagger: 0.1 },
              "-=1"
            );
          }
        }
        textAnimationEffect();
      }, 200);
    });

    // scale animation
    var scale = document.querySelectorAll(".scale");
    var image = document.querySelectorAll(".scale img");
    scale.forEach((item) => {
      gsap.to(item, {
        scale: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });
    });
    image.forEach((image) => {
      gsap.set(image, {
        scale: 1.3,
      });
      gsap.to(image, {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // Page Scroll Percentage
    function scrollTopPercentage() {
      const scrollPercentage = () => {
        const scrollTopPos = document.documentElement.scrollTop;
        const calcHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
        const scrollElementWrap = $("#scroll-percentage");

        scrollElementWrap.css(
          "background",
          `conic-gradient( var(--cp-color-common-white) ${scrollValue}%, var(--cp-color-theme-primary) ${scrollValue}%)`
        );

        // ScrollProgress
        if (scrollTopPos > 100) {
          scrollElementWrap.addClass("active");
        } else {
          scrollElementWrap.removeClass("active");
        }

        if (scrollValue < 96) {
          $("#scroll-percentage-value").text(`${scrollValue}%`);
        } else {
          $("#scroll-percentage-value").html(
            '<i class="fa-sharp fa-regular fa-arrow-up-long"></i>'
          );
        }
      };
      window.onscroll = scrollPercentage;
      window.onload = scrollPercentage;

      // Back to Top
      function scrollToTop() {
        document.documentElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      $("#scroll-percentage").on("click", scrollToTop);
    }

    scrollTopPercentage();
  });

  document.querySelectorAll(".scroll-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var sectionTarget = btn.getAttribute("data-target");
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: sectionTarget, offsetY: 70 },
      });
    });
  });

  // create the smooth scroller FIRST!
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: device_width < 1025 ? false : true,
    smoothTouch: false,
    normalizeScroll: true,
    ignoreMobileResize: true,
  });
})(jQuery);
