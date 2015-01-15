// JavaScript Document

/**
 * @name     :collectWeb
 * @author   :Nice
 * @dependent:收藏本站
 */
function addFavorite() {

    if (window.sidebar && window.sidebar.addPanel) { 
    // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { 
    // IE Favorite
        window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { 
    // Opera Hotlist
        this.title = document.title;
        return true;
    } else { 
    // webkit - safari/chrome
        alert('请使用' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 收藏！');
    }

}
/* @end **/


/**
* @name     :initMap
* @author   :Nice
* @version  :
* @explain  :
* @dependent:百度地图
*/

//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(113.269545,23.106512);//定义一个中心点坐标
    map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.disableScrollWheelZoom();//禁用地图滚轮放大缩小，默认禁用(可不写)
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
            //向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{title:"广东伤口诊疗网",content:"广东省广州市海珠区宝岗路217号二楼215房",point:"113.269248|23.107027",isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}
     ];
//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
        
        (function(){
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}

/* @end **/


/**
* @name     :slideImgs
* @author   :Nice
* @version  :
* @type     :基类
* @explain  :ID为元素id
* @relating :
* @dependent:
*/
function slideImgs(ID,time){
    var e=$('#'+ID);
    var imgS=e.find('.ul');
    var imgSWFormer=imgS.width();
    var listS=imgS.find('.list');
    var listSL=listS.length;
    var btn=e.find('.btn_nav');
    var btnL=btn.find('.btn_l');
    var btnR=btn.find('.btn_r');

    var imgSW=listS.outerWidth(true)*listSL;

    var maxI=parseInt(imgSW/imgSWFormer);

    GLOBAL.namespace('SLIDEIMGS.INDEX');
    var i=GLOBAL.SLIDEIMGS.INDEX.ID=0;

    // console.log(imgSWFormer);


    function slide(direction){
        if (direction=='r') {
            var i=GLOBAL.SLIDEIMGS.INDEX.ID=GLOBAL.SLIDEIMGS.INDEX.ID+1;
            if(i>=maxI+1){
                i=GLOBAL.SLIDEIMGS.INDEX.ID=0;
            }

        };
        if (direction=='l') {
            var i=GLOBAL.SLIDEIMGS.INDEX.ID=GLOBAL.SLIDEIMGS.INDEX.ID-1;
            if (GLOBAL.SLIDEIMGS.INDEX.ID<0) {
                i=GLOBAL.SLIDEIMGS.INDEX.ID=maxI;
            };
        };
        if (direction=='circular') {
            i=GLOBAL.SLIDEIMGS.INDEX.ID=GLOBAL.SLIDEIMGS.INDEX.ID+1;
            if(i>=maxI+1){
                i=GLOBAL.SLIDEIMGS.INDEX.ID=0;
            }
        };

        imgS.stop().animate({
            left:-i*100+'%'
        }, 800)
    }

    setInterval(function(){slide('circular')},time);

    btnL.click(function() {
        slide('l');
    });

    btnR.click(function() {
        slide('r');
    });
}
/* @end **/



/**
* @name     :slideBanner
* @author   :Nice
* @version  :
* @type     :基类
* @explain  :ID为元素id  time为时间
* @relating :
* @dependent:
*/
function slideBanner(ID,time){
    var e=$('#'+ID);
    var imgS=e.find('.ul');
    // var imgSWFormer=imgS.width();
    var listS=imgS.find('.list');
    var listSL=listS.length;
    var btn=e.find('.btn_nav');
    var btnL=btn.find('.btn_l');
    var btnR=btn.find('.btn_r');

    
    imgS.css('width', listSL*100+'%');
    var lW=100/listSL;
    listS.css('width', lW+'%');
    console.log(lW);

    // var imgSW=listS.outerWidth(true)*listSL;

    // var maxI=parseInt(imgSW/imgSWFormer);

    GLOBAL.namespace('SLIDEIMGS.INDEX');
    var i=GLOBAL.SLIDEIMGS.INDEX.banner=0;

    // console.log(imgSWFormer);


    function slide(direction){
        if (direction=='r') {
            var i=GLOBAL.SLIDEIMGS.INDEX.ID=GLOBAL.SLIDEIMGS.INDEX.ID+1;
            if(i>=listSL+1){
                i=GLOBAL.SLIDEIMGS.INDEX.ID=0;
            }
        };
        if (direction=='l') {
            var i=GLOBAL.SLIDEIMGS.INDEX.ID=GLOBAL.SLIDEIMGS.INDEX.ID-1;
            if (GLOBAL.SLIDEIMGS.INDEX.ID<0) {
                i=GLOBAL.SLIDEIMGS.INDEX.ID=listSL;
            };
        };
        if (direction=='circular') {
            i=GLOBAL.SLIDEIMGS.INDEX.banner=GLOBAL.SLIDEIMGS.INDEX.banner+1;
            if(i>=listSL){
                i=GLOBAL.SLIDEIMGS.INDEX.banner=0;
            }
        };
        imgS.stop().animate({
            left:-i*100+'%'
        }, 800)
    }

    setInterval(function(){slide('circular')},time);

    // btnL.click(function() {
    //     slide('l');
    // });

    // btnR.click(function() {
    //     slide('r');
    // });
}











/**
* @name		:
* @author	:Nice
* @version	:
* @type		:基类
* @explain	:
* @relating	:
* @dependent:
*/

/* @end **/