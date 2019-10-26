
var green = getComputedStyle(document.documentElement).getPropertyValue('--green');

/// Set image aspect ration.
function setAspectRatio(w, h) {
    widthRatio = w;
    heightRatio = h;
    var width = $("#uploaded-image-div").width();
    var height = width / w * h;
    $("#uploaded-image-div").height(height);

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

    setTextPosition();
}

// Set the font size. Keeps it constant relative to the image.
function setFontSize() {
    var imageHeight = $('#image-capture').height();
    $('.overlay').css('font-size', imageHeight/7 + 'px');
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
