document.getElementsByTagName('html')[0].className += ' ' + ("ActiveXObject" in window ? 'ie' : 'no-ie')

function coverflowimages(options) {
    if (!document.getElementById('coverflowoverlay')) {
        var $overlay = $('<div id="coverflowoverlay" />').appendTo(document.body)
        var $enlargearea = $('<div id="coverenlargearea" />').appendTo(document.body)
    } else {
        var $overlay = $('#coverflowoverlay')
        var $enlargearea = $('#coverenlargearea')
    }
    var $body = $(document.body)
    var $overlayenlarge = $overlay.add($enlargearea)
    var $wrap = $('#' + options.coverid)
    var $frame = $wrap.find('div.frame:eq(0)')
    var frameinnerHTML = ''
    var activeitem = -1
    var onselecteditemclick = options.onselecteditemclick || selecteditemaction

    var preloadimages = []
    for (var i = 0; i < options.images.length; i++) {
        if (options.images[i][1]) {
            if (options.preloadlarge) {
                preloadimages[i] = new Image()
                preloadimages[i].src = options.images[i][1]
            }
        }
        frameinnerHTML += '<li style="background-image:url(' + options.images[i][0] + ')" data-itemindex="' + i + '"></li>\n'
    }
    $frame.find('ul:eq(0)').html(frameinnerHTML)

    function selecteditemaction(e, activeitem) { 
        $overlay.css({ opacity: .9, zIndex: 1000 })
        $enlargearea.html('<img src="' + options.images[activeitem][1] + '"/>' +
            ((options.images[activeitem][2]) ? '<div id="desc">' + options.images[activeitem][2] + '</div>' : '')
        )

        var maxheight = $(window).height()
        $enlargearea.css({ opacity: 1, zIndex: 1001 })
            .data('isvisible', true)
            .find('img:eq(0)')
            .css({ maxWidth: $(window).width() * .95, maxHeight: $(window).height() })
        e.stopPropagation()
    }

    $frame.sly({
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateMiddle: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 1,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'swing',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        // Navigation buttons
        pagesBar: $wrap.find('.pages'),
        activatePageOn: 'click'
    })

    $(window).on('resize', function () {
        $frame.sly("reload");
    })

    $frame.on('mousedown', function (e) { // test during 'mousedown' phase if destination LI is the active item, before 'onclick'
        if ($(e.target).hasClass('active')) {
            activeitem = $(e.target).data('itemindex')
        }
    })

    $frame.on('click', function (e) { // onclick the main cover flow container
        var $target = $(e.target)
        if ($(e.target).data('itemindex') == activeitem) {
            onselecteditemclick(e, activeitem)
        }
    })

    $overlayenlarge.unbind().on('click', function () {
        if ($enlargearea.data('isvisible')) {
            $overlayenlarge.css({ opacity: 0, zIndex: -1 })
            $enlargearea.data('isvisible', false)
        }
    })
}

///////// Initialization code ////////////////

coverflowimages({
    coverid: 'coverflow1',
    images: [
        ['car.jpg', 'car.jpg', 'Car 1 Description'],
        ['car.jpg', 'car.jpg', 'Car 2 Description'],
        ['car.jpg', 'car.jpg', 'Car 3 Description'],
        ['car.jpg', 'car.jpg', 'Car 4 Description'],
        ['car.jpg', 'car.jpg', 'Car 5 Description'] // <-- no comma after the last image
    ] // <-- no comma after the last option
})
