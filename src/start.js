//开始页面（游戏接金币道具选择）
(function(){
    var Sprite  = Laya.Sprite;
    var ColorFilter = Laya.ColorFilter;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

    function startPage() {
        var _this = this;
        _this.startInit();
    }

    Laya.class(startPage, "startPage", Sprite);

    var _proto = startPage.prototype;

    //开始画面
    _proto.startInit = function(){
        var _this = this;
        console.log('选择接金币道具');

        //绘图滤镜所需的配置参数
        var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
        //创建一个颜色滤镜对象，灰图
		var grayscaleFilter = new ColorFilter(grayscaleMat);

        //加载开始按钮1
        start_menu_1 = new Sprite();
        start_menu_1.loadImage("res/images/start_menu_1.png");
        start_menu_1.x = pageWidth*0.1;
        start_menu_1.y = pageHeight*0.15;
        start_menu_1.scaleX = (pageWidth*0.39)/278;
        start_menu_1.scaleY = (pageWidth*0.39)/278;
        //start_menu_1.filters = [grayscaleFilter];
        start_menu_1.name = 'start_menu_1';
        Laya.stage.addChild(start_menu_1);

        //设置默认接宝容器
        checkdeMenu = start_menu_1;

        //加载开始按钮2
        start_menu_2 = new Sprite();
        start_menu_2.loadImage("res/images/start_menu_2.png");
        start_menu_2.x = pageWidth*0.505;
        start_menu_2.y = pageHeight*0.15;
        start_menu_2.scaleX = (pageWidth*0.39)/278;
        start_menu_2.scaleY = (pageWidth*0.39)/278;
        start_menu_2.filters = [grayscaleFilter];
        start_menu_2.name = 'start_menu_2';
        Laya.stage.addChild(start_menu_2);

        //加载开始按钮3
        start_menu_3 = new Sprite();
        start_menu_3.loadImage("res/images/start_menu_3.png");
        start_menu_3.x = pageWidth*0.3;
        start_menu_3.y = pageHeight*0.34;
        start_menu_3.scaleX = (pageWidth*0.39)/278;
        start_menu_3.scaleY = (pageWidth*0.39)/278;
        start_menu_3.filters = [grayscaleFilter];
        start_menu_3.name = 'start_menu_3';
        Laya.stage.addChild(start_menu_3);

        //加载选中勾
        start_menu_checked = new Sprite();
        start_menu_checked.loadImage("res/images/start_menu_checked.png");
        start_menu_checked.x = pageWidth*0.38;
        start_menu_checked.y = pageHeight*0.16;
        start_menu_checked.scaleX = (pageWidth*0.06)/46;
        start_menu_checked.scaleY = (pageWidth*0.06)/46;
        Laya.stage.addChild(start_menu_checked);

        //加载说明
        start_menu_text = new Sprite();
        start_menu_text.loadImage("res/images/start_menu_text.png", pageWidth*0.2, pageHeight*0.56, pageWidth*0.6, (pageWidth*0.6)*(70/315));
        start_menu_text.name = 'start_menu_3';
        Laya.stage.addChild(start_menu_text);

        //加载说明2
        /*
        start_menu_text2 = new Laya.Text();
        start_menu_text2.text = "选择你喜欢的一款聚宝盆"+"\n"+"  左右摇动手机，“接”出好运来！";
        start_menu_text2.color = "#ffffff";
        start_menu_text2.fontSize = 16;
        start_menu_text2.leading = 5;//行间距
        start_menu_text2.align = "center";
        start_menu_text2.width = pageWidth;
        start_menu_text2.y = pageHeight * 0.05;
        Laya.stage.addChild(start_menu_text2);
        */

        //加载开始游戏按钮
        start_play = new Sprite();
        start_play.loadImage("res/images/start_play.png");
        start_play.x = pageWidth*0.27;
        start_play.y = pageHeight*0.86;
        start_play.scaleX = (pageWidth*0.46)/342;
        start_play.scaleY = (pageWidth*0.46)/342;
        Laya.stage.addChild(start_play);
        
        //监听事件(聚宝盆选择)
        start_menu_1.on(Event.CLICK, this, cornucopiaChoice);
        start_menu_2.on(Event.CLICK, this, cornucopiaChoice);
        start_menu_3.on(Event.CLICK, this, cornucopiaChoice);

        //监听事件(开始游戏)
        start_play.on(Event.CLICK, this, gameStart);
    }

    //聚宝盆选择
    function cornucopiaChoice(e){
        //绘图滤镜所需的配置参数
        var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
        //创建一个颜色滤镜对象，灰图
		var grayscaleFilter = new ColorFilter(grayscaleMat);

        if(e.target.name == 'start_menu_1'){
            checkdeMenu = start_menu_1;
            start_menu_checked.x = pageWidth*0.38;
            start_menu_checked.y = pageHeight*0.16;
            start_menu_2.filters = [grayscaleFilter];
            start_menu_3.filters = [grayscaleFilter];
        }else if(e.target.name == 'start_menu_2'){
            checkdeMenu = start_menu_2;
            start_menu_checked.x = pageWidth*0.79;
            start_menu_checked.y = pageHeight*0.16;
            start_menu_1.filters = [grayscaleFilter];
            start_menu_3.filters = [grayscaleFilter];
        }else{
            checkdeMenu = start_menu_3;
            start_menu_checked.x = pageWidth*0.58;
            start_menu_checked.y = pageHeight*0.35;
            start_menu_1.filters = [grayscaleFilter];
            start_menu_2.filters = [grayscaleFilter];
        }
        //去掉滤镜灰度效果
        checkdeMenu.filters = [];
    }

    //开始游戏
    function gameStart(){
        console.log('已选择接宝容器：',checkdeMenu.name);
        //Ajax接口，纪录点击开始的数据
        addPlayLog();
        //加载游戏主画面
        gameReadygo_s = new gameReadygo();
        //Laya.gameReadygo_s = gameReadygo_s;
    }

})();