document.addEventListener("DOMContentLoaded", event => {
    //#region OVERLAY
    let overlay = document.getElementById("overlay");
    let overlayWindow = document.getElementById("overlay-window");
    let overlayTitle = document.getElementById("overlay-title");
    let overlayClose = document.getElementById("overlay-close");
    let showOverlayButtons = document.querySelectorAll(".show-overlay");

    const overlayDisableTimer = 400;
    
    // element.addEventListener("click", showOverlay); //Only show overlay (background)
    overlay.addEventListener("click", function(evt){
        hideOverlay(evt);
    });
    overlayClose.addEventListener("click", function(evt){
        hideOverlay(evt);
    });
    overlayWindow.addEventListener("click", function(evt){
        evt.stopPropagation();
    });
    
    for (let i = 0; i < showOverlayButtons.length; i++) {
        const showOverlayButton = showOverlayButtons[i];
        showOverlayButton.addEventListener("click", function(evt){
            showOverlay(evt);
            showWindow(this.dataset.for); //true: remove invalid class from overlayTitle, false: add invalid class to overlayTitle
        });
    }

    function showOverlay(evt){
        evt.preventDefault();
        overlay.classList.remove("disabled");
        overlay.classList.remove("hidden");
    }
    function hideOverlay(evt){
        evt.preventDefault();
        overlay.classList.add("hidden");
        setTimeout(() => {
            overlay.classList.add("disabled");
        }, overlayDisableTimer);
    }
    function showWindow(id){
        const overlayClasses = document.querySelectorAll(".overlay-class");
        for (let i = 0; i < overlayClasses.length; i++) {
            const overlayClass = overlayClasses[i];
            if (overlayClass.id == id) {
                overlayClass.classList.remove("hidden");
                overlayTitle.textContent = overlayClass.dataset.title;
            } else {
                overlayClass.classList.add("hidden");
            }
        }
    }
    //#endregion

    const search = document.getElementById("search");
    
    document.body.addEventListener("click", function(){
        search.classList.remove("stay");
    })
    search.addEventListener("click", function(e){
        e.stopPropagation();
        search.classList.add("stay");
    });
    search.addEventListener("keyup", function(e){
        if (e.keyCode === 13) {
            search.classList.remove("stay");
            search.value = "";
        }
    });

    //#region about.html BARS animation
    let bars = {
        illustrator: {
            link: document.getElementById("illustrator-link"),
            element: document.getElementById("illustrator"),
            progress: 95,
            isAnimating: false,
        },
        photoshop: {
            link: document.getElementById("photoshop-link"),
            element: document.getElementById("photoshop"),
            progress: 88,
            isAnimating: false,
        },
        paintings: {
            link: document.getElementById("paintings-link"),
            element: document.getElementById("paintings"),
            progress: 79,
            isAnimating: false,
        },
        photoVideo: {
            link: document.getElementById("photo-video-link"),
            element: document.getElementById("photo-video"),
            progress: 54,
            isAnimating: false,
        },
        people: {
            link: document.getElementById("people-link"),
            element: document.getElementById("people"),
            progress: 82,
            isAnimating: false,
        },
    }

    bars.illustrator.link.addEventListener("mouseover", function(){
        barsController(bars.illustrator);
    });
    bars.photoshop.link.addEventListener("mouseover", function(){
        barsController(bars.photoshop);
    });
    bars.paintings.link.addEventListener("mouseover", function(){
        barsController(bars.paintings);
    });
    bars.photoVideo.link.addEventListener("mouseover", function(){
        barsController(bars.photoVideo);
    });
    bars.people.link.addEventListener("mouseover", function(){
        barsController(bars.people);
    });

    function barsController(bar){
        let progress = 0;
        if (bar.isAnimating) {
            return;
        }
        bar.isAnimating = true;
        bar.element.classList.add("animating");
        let interval = setInterval(() => {
            bar.element.style.width = progress + "%";
            progress += 3;
            if (progress > bar.progress) {
                clearInterval(interval);
                setTimeout(() => {
                    bar.isAnimating = false;
                    bar.element.classList.remove("animating");
                }, 200);
            }
        }, 10);
    }
    //#endregion about.html BARS animation
});