(function() {
    $(document).on('click', ".nav-toggle", function() {

        const children = $(this).children(".iconfont");
        $(".nav").slideToggle();
        if (children.hasClass("fold")) {
            children.removeClass("fold");
        } else {
            children.addClass("fold");
        }
    });

    // $(document).on('click', ".nav", function() {
    //     $(".nav").slideToggle();
    //     $(".nav-toggle .iconfont").removeClass("fold");
    // });

    $(document).on("click", ".nav-link", function(e) {
        e.stopPropagation();
    })
    

})();
