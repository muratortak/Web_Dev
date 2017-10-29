
var lat1;
var lng1;
    var loc;
function initMap() { 
    
    var marker2;
    var newlat;
    var myLatLng = new google.maps.LatLng(38.4032983, 27.1109061);
    var map = 
    new google.maps.Map(document.getElementById('map'), 
                        { center: myLatLng, zoom: 15});
             
    var infowindow = new google.maps.InfoWindow(); 
    var service = new google.maps.places.PlacesService(map); 
    service.getDetails({ placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' }, 
    function(place, status) { 
        if (status === google.maps.places.PlacesServiceStatus.OK) { 
            var marker = new google.maps.Marker({ map: map, position: myLatLng, draggable: true }); 
            google.maps.event.addListener(marker, 'dragend', function(loc1) { 
        infowindow.setContent('<div><strong>' + loc1.latLng + 
        '</strong><br>' + 'Place ID: ' + loc1.place_id + '<br>' + loc1.formatted_address + 
        '</div>'); 
        
        infowindow.open(map, this); 
        // newlat = loc1.latLng.lat();
        lat1 = loc1.latLng.lat();
        lng1 = loc1.latLng.lng();
        document.getElementById('lat').value = lat1;
        document.getElementById('lng').value = lng1;
        
        
            window.alert(loc1.latLng);
            
            
            }); 
        }
    
    });         
}

function initMap2() {
    var marker2;
    // var newlat;
    
    // var myLatLng = new google.maps.LatLng(lat, lng);
    // var map = 
    // new google.maps.Map(document.getElementById('map2'), 
    //                     { center: myLatLng, zoom: 15});
        
    // var infowindow = new google.maps.InfoWindow(); 
    // var service = new google.maps.places.PlacesService(map); 
    // service.getDetails({ placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' }, 
    // function(place, status) { 
    //     if (status === google.maps.places.PlacesServiceStatus.OK) { 
    //         var marker = new google.maps.Marker({ map: map, position: myLatLng, draggable: true }); 
    //         google.maps.event.addListener(marker, 'click', function() { 
    //     infowindow.setContent('<div><strong>' + loc1.latLng + 
    //     '</strong><br>'); 
        
    //     infowindow.open(map, this);   
    //         }); 
    //     }
    
    // });

    var elem = document.getElementsByClassName('map2');
    var len = elem.length;
    window.alert(len);
    for(var i = 0; i < len; i++){
        var lat = document.getElementsByClassName('lat')[i].value;
        var lng = document.getElementsByClassName('lng')[i].value;
    var myLatlng = new google.maps.LatLng(lat,lng);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    }
   
    var map = new google.maps.Map(document.getElementsByClassName("map2")[i], mapOptions);
  
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    marker.setMap(map);
}
    // To add the marker to the map, call setMap();
    

}




