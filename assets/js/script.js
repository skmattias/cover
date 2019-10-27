
var green = getComputedStyle(document.documentElement).getPropertyValue('--green');

/// Set image aspect ration.
function setAspectRatio(w, h) {
    widthRatio = w;
    heightRatio = h;
    var width = $("#uploaded-image-div").width();
    var height = width / w * h;
    $("#uploaded-image-div").height(height);

    setFontSize();
    setTextPosition();
}

/// Set the uploaded image.
function setImage(event) {
    // Set the image.
    var getImagePath = URL.createObjectURL(event.target.files[0]);
    $('#uploaded-image-div').css('background-image', 'url(' + getImagePath + ')');

    // Remvoe the border.
    $('.i').removeClass('card');
    $('.i').removeClass('card-body');

    // Set the filter.
    $('#green-filter').css('background-color', green);
}

/// Set the bottom right logo.
function updateLogo(value) {
    var logoDiv = $('#overlay-logo');
    
    var imageName = "assets/img/" + value + ".png";
    var image = new Image();

    image.src = imageName;
    image.onload = function() {
        setLogoSize(this);
        // logoDiv.width(200);
        // logoDiv.height(200/this.width * this.height);
    }

    logoDiv.css('background-image', 'url(' + imageName + ')');
}

/// Update the bottom right logo size.
function setLogoSize(image) {
    var imageDiv = $('#image-capture');
    var imageWidth = imageDiv.width();
  
    var logoDiv = $('#overlay-logo');
    var width = imageWidth/3.5;

    // If an image was sent as an argument.
    var height = 0;
    if (typeof image !== "undefined") {
        height = width/image.width * image.height;
    } else {
        height = width/logoDiv.width() * logoDiv.height();
    }

    logoDiv.width(width);
    logoDiv.height(height);
}

/// Set filter opacity.
function setFilter(opacity) {
    $("#uploaded-image-div").css("opacity", opacity);
}

// Update the overlay text position.
function setTextPosition() {
    var image = $('#image-capture');
    var imagePos = image.position();
    var text = $('#overlay-text');

    var left = imagePos.left + image.width()/2 - text.outerWidth()/2 - 15;
    var top = imagePos.top + image.height()/2 - text.outerHeight()/2;

    text.css('left', left + 'px');
    text.css('top', top + 'px');
}

/// Set the overlay text.
function setText() {
    var input = $('#overlay-text-input').val();
    $('#overlay-text').html(input);

    setFontSize();
    setTextPosition();
}

// Set the font size. Keeps it constant relative to the image.
function setFontSize() {
    var imageWidth = $('#image-capture').width();
    $('#overlay-text').css('font-size', imageWidth/14 + 'px');
}

function hh(element) {

    window.scrollTo(0, 0);

    var useWidth = $('#omslag').width();
    var useHeight = $('#omslag').height();

    html2canvas(element, {
        width: useWidth,
        height: useHeight,
    }).then(function(canvas) {
        // console.log(canvas);
        // saveAs(canvas.toDataURL(), 'file-name.png');
        document.body.appendChild(canvas);
    });
}
