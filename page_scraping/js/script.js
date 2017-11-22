$(document).ready(function() {

    var lists = $('li');
    
    var nmb = 0;
    $('li').click(function() {
        var txt = $(this).text();

        for(var i = 0; i < 10; i++) {
            if(lists.eq(i).text() === txt){
                console.log('list.eq is: ' + lists.eq(i).text() + 'txt is: ' + txt);
                nmb = i;
                console.log('nmb is: ' + nmb + ' i is: ' + i); 
                console.log('nmb out of loop is: ' + nmb);
                $('div.stories').eq(nmb).animate({height: 'toggle'}, 500);
                break;
            }
        }
        
    });

});