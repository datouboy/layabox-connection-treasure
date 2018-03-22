//添加坠落物
(function(){
    var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

    function gameLand() {
        var _this = this;
    }

    Laya.class(gameLand, "gameLand", Sprite);

    var _proto = gameLand.prototype;

    //坠落物数组（金币、保健品、炸弹）
    _proto.landStageArray = [];

    //添加坠落物至场景
    _proto.addLandToStage = function(n){
        var _this = this;

        _this.landStageArray[n] = new Sprite();
        _this.landStageArray[n].landType = getLandType();

        if(_this.landStageArray[n].landType == 'land_1'){
            _this.landStageArray[n].loadImage("res/images/land_2.png");
        }else if(_this.landStageArray[n].landType == 'land_2'){
            _this.landStageArray[n].loadImage("res/images/land_3.png");
        }else if(_this.landStageArray[n].landType == 'land_3'){
            _this.landStageArray[n].loadImage("res/images/land_4.png");
        }else if(_this.landStageArray[n].landType == 'land_4'){
            _this.landStageArray[n].loadImage("res/images/land_5.png");
        }else if(_this.landStageArray[n].landType == 'land_5'){
            _this.landStageArray[n].loadImage("res/images/land_6.png");
        }else if(_this.landStageArray[n].landType == 'boom'){
            _this.landStageArray[n].loadImage("res/images/land_7.png");
        }else{
            _this.landStageArray[n].loadImage("res/images/land_1.png");
        }

        _this.landStageArray[n].pivotX = 0;
        _this.landStageArray[n].pivotY = 0;
        _this.landStageArray[n].scaleX = 0.5;
        _this.landStageArray[n].scaleY = 0.5;
        _this.landStageArray[n].x = randomNum(10, Math.round(pageWidth * 0.8));
        _this.landStageArray[n].y = 0;
        _this.landStageArray[n].alpha = 0;
        _this.landStageArray[n].zOrder = 3;

        Laya.stage.addChild(_this.landStageArray[n]);
    }

    //随机输出浮冰的类型
    function getLandType(){
        var rNum = randomNum(0,20);
        if(rNum == 10){
            return 'land_1';//保健品1
        }else if(rNum == 11){
            return 'land_2';//保健品2
        }else if(rNum == 12){
            return 'land_3';//保健品3
        }else if(rNum == 13){
            return 'land_4';//保健品4
        }else if(rNum == 14){
            return 'land_5';//保健品5
        }else if(rNum == 7 || rNum == 15){
            return 'boom';//炸弹
        }else{
            return 'default';//默认的金币
        }
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    } 


})();