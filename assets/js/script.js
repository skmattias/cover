var green = getComputedStyle(document.documentElement).getPropertyValue(
    "--green"
);

/// Set image aspect ration.
function setAspectRatio(w, h) {
    widthRatio = w;
    heightRatio = h;
    var width = $("#uploaded-image-div").width();
    var height = (width / w) * h;
    $("#uploaded-image-div").height(height);

    setTextPosition();
}

function setFullSize() {
    var html = $("#full-image").html();
    $("body").html(html);

    // Set div sizes.
    var image = $("#uploaded-image-div");
    var capture = $("#image-capture");
    var greenFilter = $("#green-filter");
    image.removeClass("w-100");
    image.width(1920);
    image.height(1080);
    capture.width(1920);
    capture.height(1080);
    greenFilter.width(1920);
    greenFilter.height(1080);

    setAspectRatio(widthRatio, heightRatio);
    setTextPosition();
    setLogoSize();
    setBlur(blur);
}

/// Set the uploaded image.
function setImage(event) {
    // Set the image.
    var getImagePath = URL.createObjectURL(event.target.files[0]);
    $("#uploaded-image-div").css("background-image", "url(" + getImagePath + ")");

    // TODO
    $("#overlay-text").css("background-image", "url" + getImagePath + ")");

    // Remvoe the border.
    $(".i").removeClass("card");
    $(".i").removeClass("card-body");

    // Set the filter.
    $("#green-filter").css("background-color", green);
}

/// Set the bottom right logo.
function updateLogo(value) {
    var logoDiv = $("#overlay-logo");

    var imageName = "assets/img/" + value + ".png";
    var image = new Image();

    image.src = imageName;
    image.onload = function () {
        setLogoSize(this);
    };

    logoDiv.css("background-image", "url(" + imageName + ")");
    $("#overlay-text").css("background-image", "url(" + imageName + ")");
}

/// Update the bottom right logo size.
function setLogoSize(image) {
    var imageDiv = $("#image-capture");
    var logoDiv = $("#overlay-logo");

    // Set the width of the logo relative to the width of the whole image.
    var imageWidth = imageDiv.width();
    var width = imageWidth / 3.5;

    // Set the height of the logo as to not stretch the image in any direction.
    var height = 0;
    if (typeof image !== "undefined") {
        height = (width / image.width) * image.height;
    } else {
        height = (width / logoDiv.width()) * logoDiv.height();
    }

    // Apply the new size.
    logoDiv.width(width);
    logoDiv.height(height);
}

/// Set filter opacity.
function setFilter(opacity) {
    $("#uploaded-image-div").css("opacity", opacity);
}

// Update the overlay text position.
function setTextPosition() {

    // FONT SIZE.
    var imageWidth = $("#image-capture").width();
    var overlaySize = imageWidth / 14;
    var smallSize = overlaySize / 2;
    // Line height to match actual capital lato character height.
    var textLineHeight = smallSize * 0.8;
    $("#overlay-text").css("font-size", overlaySize + "px");
    $("#top-text-text").css("font-size", smallSize + "px");
    $("#top-text-text").css("line-height", textLineHeight + "px");
    $("#bottom-text-text").css("font-size", smallSize + "px");
    $("#bottom-text-text").css("line-height", textLineHeight + "px");

    // TEXT POSITION.
    // Main text.
    var image = $("#image-capture");
    var imagePos = image.position();
    var mainText = $("#overlay-text");

    // Main text positions. The 15 is to compensate for strange paddings.
    var mainTextLeft = imagePos.left + image.width() / 2 - mainText.outerWidth() / 2 - 15;
    var mainTextTop = imagePos.top + image.height() / 2 - mainText.outerHeight() / 2;
    mainText.css("left", mainTextLeft + "px");
    mainText.css("top", mainTextTop + "px");

    // Top text.
    var topText = $("#top-text");
    var topTextText = $("#top-text-text");
    var topTextTop = mainTextTop - topText.outerHeight() - topText.outerHeight() / 2.5;
    topText.css("left", mainTextLeft + "px");
    topText.css("top", topTextTop + "px");
    topText.css("width", mainText.outerWidth() + "px");

    // Bottom text.
    var bottomText = $("#bottom-text");
    var bottomTextText = $("#bottom-text-text");
    var bottomTextTop = mainTextTop + mainText.outerHeight() + bottomText.outerHeight() / 2.5;
    bottomText.css("left", mainTextLeft + "px");
    bottomText.css("top", bottomTextTop + "px");
    bottomText.css("width", mainText.outerWidth() + "px");

    // TOP AND BOTOTM TEXT LINES.
    var topTextLine = $("#top-text-line");
    var lineHeight = textLineHeight / 11;
    var bottomTextLine = $("#bottom-text-line");

    var halfTopTextTextHeight = parseInt(topTextText.css("line-height"), 10) / 2;
    topTextLine.css("width", mainText.width() - topTextText.width() + "px");
    topTextLine.css("border-bottom", lineHeight + "px solid white");
    topTextLine.css("height", halfTopTextTextHeight + lineHeight + "px");
    topTextLine.css("margin-left", halfTopTextTextHeight + "px");

    var halfBottomTextTextHeight = parseInt(bottomTextText.css("line-height"), 10) / 2;
    bottomTextLine.css("width", mainText.width() - bottomTextText.width() + "px");
    bottomTextLine.css("border-bottom", lineHeight + "px solid white");
    bottomTextLine.css("height", halfBottomTextTextHeight + lineHeight + "px");
    bottomTextLine.css("margin-right", halfTopTextTextHeight + "px");
}

/// Set the overlay text.
function setText() {
    var input = $("#overlay-text-input");
    var inputVal = input.val();
    var overlayText = $("#overlay-text");
    var oldText = overlayText.html();

    // Width restriction for the text.
    overlayText.html(inputVal);
    if (overlayText.outerWidth() >= $("#image-capture").outerWidth()) {
        overlayText.html(oldText);
        input.val(oldText);
    }

    // If the overlay text was made shorter than the bottom or top text, cut
    // them down to size.
    var topText = $("#top-text-text")
    var topTextInput = $("#top-text-input");
    var bottomText = $("#bottom-text-text")
    var bottomTextInput = $("#bottom-text-input");
    if (inputVal.length == 0) {
        topTextInput.val("");
        topText.html("")
        bottomTextInput.val("");
        bottomText.html("")
    } else {
        if (topText.html().length > 0 || topTextInput.val().length > 0) {
            while (overlayText.outerWidth() < topText.width() + 20) {
                topTextInput.val(topTextInput.val().substring(0, topTextInput.val().length - 1));
                topText.html(topText.html().substring(0, topText.html().length - 1))
            }
        }
        if (bottomText.html().length > 0 || bottomTextInput.val().length > 0) {
            while (overlayText.outerWidth() < bottomText.width() + 20) {
                bottomTextInput.val(bottomTextInput.val().substring(0, bottomTextInput.val().length - 1));
                bottomText.html(bottomText.html().substring(0, bottomText.html().length - 1))
            }
        }
    }

    var topTextDiv = $("#top-text-div");
    var topTextInput = $("#top-text-input");
    var topTextText = $("#top-text-text");
    var bottomTextDiv = $("#bottom-text-div");
    var bottomTextInput = $("#bottom-text-input");
    var bottomTextText = $("#bottom-text-text");
    if (inputVal.length == 0) {
        topTextInput.prop("disabled", true);
        topTextText.html("");
        topTextDiv.hide();
        bottomTextInput.prop("disabled", true);
        bottomTextText.html("");
        bottomTextDiv.hide();
    } else {
        topTextInput.prop("disabled", false);
        bottomTextInput.prop("disabled", false);
        setTopText();
        setBottomText();
    }

    setTextPosition();
}

// Set the top text.
function setTopText() {
    var input = $("#top-text-input");
    var inputVal = input.val();
    var text = $("#top-text-text");
    var oldText = text.html();
    var textDiv = $("#top-text-div");
    text.html(inputVal);
    if (text.width() >= $("#overlay-text").outerWidth()) {
        text.html(oldText);
        input.val(oldText);
    }

    if (inputVal.length == 0) {
        textDiv.hide();
    } else {
        textDiv.show();
    }

    setTextPosition();
}

// Set the bottom text.
function setBottomText() {
    var input = $("#bottom-text-input");
    var inputVal = input.val();
    var text = $("#bottom-text-text");
    var oldText = text.html();
    var textDiv = $("#bottom-text-div");
    text.html(inputVal);
    if (text.outerWidth() >= $("#overlay-text").outerWidth()) {
        text.html(oldText);
        input.val(oldText);
    }

    if (inputVal.length == 0) {
        textDiv.hide();
    } else {
        textDiv.show();
    }

    setTextPosition();
}

/// Set the gaussian blur on the background image.xw
function setBlur(size) {
    blur = size;
    var greenFilter = $("#green-filter");
    var blurFactor = greenFilter.width() / 730;
    greenFilter.css("filter", "blur(" + size*blurFactor + "px)");
}

// TODO open the file in a new tab or save it to the computer.
function hh(element) {
    window.scrollTo(0, 0);

    var useWidth = $("#image-capture").width();
    var useHeight = $("#image-capture").height();

    html2canvas(element, {
        width: useWidth,
        height: useHeight,
        allowTaint: true
    }).then(function (canvas) {
        document.body.appendChild(canvas);
    });

    setAspectRatio(widthRatio, heightRatio);
    setTextPosition();
    setLogoSize();

    // domtoimage.toPng(element, {height: 1080, width: 1920}).then(function(dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    // })
    // .catch(function(error) {
    //     console.error("ånej", error);
    // });
}
