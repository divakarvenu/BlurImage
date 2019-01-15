
//find all the image in answer feed,thumbnail and ad feeds and add blurclasses
var blurImage = function(){
    $('.answer_body_preview').find("img").addClass('blurimage');
    $('.ui_layout_thumbnail').addClass('blurthumb');
    $('.HyperLinkFeedStory ').find("img").addClass('blurimage');
    $('.hyperlink_image').addClass('blurthumb');
}

//find all the image in answer feed,thumbnail and ad feeds and remove blurclasses
var unblurImage=function(){
    $('.answer_body_preview').find("img").removeClass('blurimage');
    $('.ui_layout_thumbnail').removeClass('blurthumb');
    $('.HyperLinkFeedStory ').find("img").removeClass('blurimage');
    $('.hyperlink_image').removeClass('blurthumb');
}

var addListeners=function(){
    $( "<style> .blurimage { -webkit-filter: blur(50px); filter: blur(50px) } .blurthumb { -webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px); width: 100px; height: 100px; background-color: #ccc;}</style>" ).appendTo( "head" );
    blurImage();
 
    $(window).scroll(function(){
        blurImage();
    });

    $('.ui_qtext_more_link').click(function(){
        blurImage();
    });

    $('.blurimage').click(function(){
        $(this).removeClass('.blurimage'); //if user wanted to see image let them click and see
    });

    $('.blurthumb').click(function(){
        $(this).removeClass('.blurthumb'); //if user wanted to see image let them click and see
    });
}

var removeListeners=function(){
    $(window).unbind('scroll');
    $('.ui_qtext_more_link').unbind('click');
    $('.blurimage').unbind('click');
    $('.blurthumb').unbind('click');
    unblurImage();
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome stroage value
window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        } 
    });
}

