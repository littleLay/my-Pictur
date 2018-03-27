(function(){
    var $slider = $('.slider'),
        len = $slider.length;
        $wrapper = $('.wrapper'),
        activeIndex = 0,
        flag = true;
    var lastIndex;

    function init(){
        var liStr = '';
            btnStr = '';
        if(len > 1){
            for(var i = 0; i < len; i++) {
                if(i == 0) {
                    liStr += '<li class="active"></li>';
                }else{
                    liStr += '<li></li>';
                }
            }
            liStr = '<div class="slider-point"><ul>' + liStr + '</ul></div>';
            btnStr = `<div class="slider-btn">
            <div class="prev"></div>
            <div class="next"></div>
            </div>`
            $wrapper.append($(btnStr)).append($(liStr));
        }
    }
    init();

    var $prve = $('.prev'),
        $next = $('.next'),
        $li = $('li');

    $prve.on('click',function() {
        tool('prev');
    })
    $next.on('click',function() {
        tool('next');
    })
    $li.on('click',function() {
        var index = $(this).index();
        tool(index);
    })
    function tool(index){
        if(flag){   
            getIndex(index);
            if(lastIndex != activeIndex){
                flag = false;
                $slider.eq(lastIndex).trigger('go').end().eq(activeIndex).trigger('come');
                activeChange();
            }
            
        }
        
    }
    function getIndex(direction) {
        lastIndex = activeIndex;
        if(direction == 'prev' || direction == "next") {
            if(direction == "next") {
                activeIndex = activeIndex == len - 1 ? 0 : activeIndex + 1;
            }else{
                activeIndex = activeIndex == 0 ? len - 1 : activeIndex - 1;
            }
        }else{
            activeIndex = direction;
        }
    }
    $slider.on('come',function() {
        $slider.eq(activeIndex).delay(300).fadeIn(300)
        .find('p').delay(600).animate({fontSize :'20px'}).end()
        .find('.image').delay(600).animate({width:'40%'}, function() {
            flag = true;
        });
    })
    $slider.on('go',function() {
        $slider.eq(lastIndex).fadeOut(300)
        .find('p').delay(600).animate({fontSize :'16px'}).end()
        .find('.image').delay(600).animate({width:'0%'});
        
    })

    function activeChange(){
        $('.active').removeClass('active');
        $li.eq(activeIndex).addClass('active');
;
    }

})()
