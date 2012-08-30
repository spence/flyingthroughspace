(function() {

    var STAR_COUNT = 500;
    var WARP_SPEED = 0.02;
    var FPS = 30;

    var getRandom = function(lbound, ubound) {
        return window.Math.random() * (ubound - lbound) + lbound;
    };

    var windowCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    var Star = function() {
        this.element = document.createElement('div');
        this.element.className = 'star';
        this.randomizeSpawn();
        document.body.appendChild(this.element);
    };

    Star.prototype.randomizeSpawn = function() {
        this.x = getRandom(1, window.innerWidth);
        this.y = getRandom(1, window.innerHeight);
        this.brightness = 1;//getRandom(1, 5);
        this.distance = getRandom(0.01, 6);
    }

    Star.prototype.isOutsideField = function() {
        return this.x < 0 ||
               this.x > window.innerWidth ||
               this.y > window.innerHeight ||
               this.y < 0;
    };

    Star.prototype.setPosition = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.brightness + 'px';
        this.element.style.height = this.brightness + 'px';
    };

    var stars = [];

    var incrementFrame = function() {

        for (var i = 0; i < STAR_COUNT; i++) {

            var star = stars[i] = stars[i] || new Star();

            // Split position by splitting into x & y vectors
            star.x -= (windowCenter.x - star.x) * WARP_SPEED * star.distance;
            star.y -= (windowCenter.y - star.y) * WARP_SPEED * star.distance;

            if (star.isOutsideField()) {
                // Reloate star
                star.randomizeSpawn();
            } else {
                // Increase brightness
                star.brightness += (star.distance * 0.05);
            }

            star.setPosition();
        }
    };

    // Follow cursor
    window.addEventListener('mousemove', function(e) {
        windowCenter.x = e.clientX;
        windowCenter.y = e.clientY;
    });

    // Start drawing
    window.setInterval(function(){
        if (document.body) {
            incrementFrame();
        }
    }, 1000 / FPS);

})();