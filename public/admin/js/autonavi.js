
var mapObj,toolbar,overview,scale;

function mapInit(centerLng, centerLat) {
   
    var mLevel = 17;
    
    if (centerLng === '' && centerLat === '') {
        centerLng = '121.47948';
        centerLat = '31.233476';
        mLevel = 10;
    }
    
    var opt = {
        level:mLevel,//设置地图缩放级别
        center:new AMap.LngLat(centerLng, centerLat),//设置地图中心点	
        doubleClickZoom:true,//双击放大地图
        scrollWheel:true//鼠标滚轮缩放地图
    };
       
    mapObj = new AMap.Map("iCenter",opt);
    mapObj.plugin(["AMap.ToolBar","AMap.OverView","AMap.Scale"],function() { 
        toolbar = new AMap.ToolBar();
        toolbar.autoPosition=false; //加载工具条 
        mapObj.addControl(toolbar);  	
        overview = new AMap.OverView(); //加载鹰眼
        mapObj.addControl(overview);  	
        scale = new AMap.Scale(); //加载比例尺
        mapObj.addControl(scale);
    }); 
}

var Mmarker,polyline,polygon;
function addMarker(centerLng, centerLat){
    
	Mmarker=new AMap.Marker({
            map:mapObj,  					  
            icon:"/medias/images/map_pin.png",
            position:new AMap.LngLat(centerLng, centerLat),
            offset:{x: -30,y:-25}
	});
}

function removeMarker(){
    Mmarker.setMap(null);
}

function getMapObj() {
    return mapObj;
}
var fn = function(e){
    $('#goog_longitude').val(e.lnglat.getLng());
    $('#goog_latitude').val(e.lnglat.getLat()); 
};

function bind(){
    //第一个参数，地图对象或覆盖物对象
    //第二个参数，事件类型
    //第三个参数，事件被触发时需要执行的回调函数
    listener = AMap.event.addListener(mapObj,'click',fn);
    console.log(listener);
}

function initAutoNaviAndAddMouseListenser(goog_longitude, goog_latitude) {
    var lgt = (typeof goog_longitude == 'undefined') ? '' : goog_longitude;
    var lat = (typeof goog_latitude == 'undefined') ? '' : goog_latitude;
    mapInit(lgt, lat);
    if (lgt != '' && lat != '') {
        addMarker(goog_longitude, goog_latitude);
    }
    addAutoNaviMouseListenser();
}

function addAutoNaviMouseListenser() {
    AMap.event.addListener(mapObj,'click', function(e) {
        var needToRemove = true;
        if ($('#goog_longitude').val() == '' && $('#goog_latitude').val() == '') {
            needToRemove = false;
        }
       $('#goog_longitude').val(e.lnglat.getLng());
       $('#goog_latitude').val(e.lnglat.getLat());
       if (needToRemove == true) {
           removeMarker();
       }
       addMarker($('#goog_longitude').val(), $('#goog_latitude').val());
    });
    
    $('#goog_longitude').change(function(e) {
        removeMarker();
        addMarker($('#goog_longitude').val(), $('#goog_latitude').val());
        mapObj.setCenter(new AMap.LngLat($('#goog_longitude').val(), $('#goog_latitude').val()));
    });
    
    $('#goog_latitude').change(function(e) {
        removeMarker();
        addMarker($('#goog_longitude').val(), $('#goog_latitude').val());
        mapObj.setCenter(new AMap.LngLat($('#goog_longitude').val(), $('#goog_latitude').val()));
    });
}