
var green = getComputedStyle(document.documentElement).getPropertyValue('--green');

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
