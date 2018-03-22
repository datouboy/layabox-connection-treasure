(function(){
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;
    var Loader  = Laya.Loader;
    var SoundManager = Laya.SoundManager;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

	(function(){
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        //性能统计面板的调用
        //Laya.Stat.show(0,0);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.screenAdaptationEnabled = false;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor   = "#e1251a";

        //加载背景图
        start_bg = new Sprite();
        start_bg.loadImage("res/images/start_bg.jpg", 0, 0, pageWidth, pageHeight);
        Laya.stage.addChild(start_bg);

        //加载静态文件资源
        var imgArray = ['start_bg.jpg','start_menu_1.png','start_menu_2.png','start_menu_3.png','start_menu_checked.png','start_menu_text.png','start_play.png','play_readygo.png','play_readygo_text.png','play_ready_m.png','game_bg.jpg','game_bg_2.png','game_bg_hua_l.png','land_1.png','land_2.png','land_3.png','land_4.png','land_5.png','land_6.png','land_7.png','land_7_2.png','game_peng_1.png','game_peng_2.png','game_peng_3.png','winner_hb.png','winner_hb_2.png','game_bg_fen.png','game_bg_blood_0.png','game_bg_blood_1.png','game_bg_blood_2.png','game_bg_blood_3.png','game_bg_blood_4.png','game_bg_blood_5.png','winner_bless_box.png','menu_again.png','menu_shear.png','menu_qrcode.png','tj.png'];
        var atlasArray = ['game_hua_l1.atlas','game_hua_r1.atlas','game_hua_r2.atlas','game_gold.atlas','game_god.atlas'];
        var soundsArray = ['bg.mp3','readygo.mp3','boom.mp3','ye.mp3'];
        var assets = [];
        //图片
        imgArray.forEach(function(val) {
            assets.push({
                url: 'res/images/' + val,
                type: Loader.IMAGE
            });
        }, this);
        //动画图集
        atlasArray.forEach(function(val) {
            assets.push({
                url: 'res/atlas/images/' + val,
                type: Loader.ATLAS
            });
        }, this);
        //加载音效
        soundsArray.forEach(function(val) {
            assets.push({
                url: 'res/sounds/' + val,
                type: Loader.SOUND
            });
        }, this);
        
        //加载(加载完成后执行init()函数)
		Laya.loader.load(assets, Handler.create(this, init),  Handler.create(this, onLoading, null, false), Loader.TEXT);
        // 侦听加载失败
		Laya.loader.on(Event.ERROR, this, onError);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //绘制进度条
        loadBG = new Sprite();
        Laya.stage.addChild(loadBG);
        var path =  [
            ["moveTo", 8, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 8, 8], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 16, 8, 16, 8],
            ["lineTo", 200, 16],
            ["arcTo", 208, 16, 208, 8, 8],
            ["arcTo", 208, 0, 200, 0, 8],
            ["lineTo", 8, 0]
        ];
        loadBG.graphics.drawPath((pageWidth-208)/2, Math.round(pageHeight/2.5) - 10, path, {fillStyle: "#feecd1"});

        //绘制圆角矩形(进度条背景)
        loadTiao = new Sprite();
        Laya.stage.addChild(loadTiao);
        var path =  [
            ["moveTo", 4, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 4, 4], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 8, 4, 8, 4],
            ["lineTo", 4, 8],
            ["arcTo", 8, 8, 8, 4, 4],
            ["arcTo", 8, 0, 4, 0, 4],
            ["lineTo", 4, 0]
        ];
        loadTiao.graphics.drawPath((pageWidth-208)/2 + 4, Math.round(pageHeight/2.5) - 6, path, {fillStyle: "#c91522"});

        //init();
	})();

    //加载静态资源完成，开始初始化游戏
    function init(){
        console.log('初始化游戏');
        //开始画面
        startPage_s = new startPage();
        //Laya.startPage_s = startPage_s;

        //删除进度条
        loadTiao.destroy();
        loadBG.destroy();

        //播放背景音乐
        SoundManager.playMusic("res/sounds/bg.mp3", 0);
        SoundManager.setMusicVolume(0.2);
    }

    // 加载进度侦听器
	function onLoading(progress)
	{
        progress = Math.round(progress * 100);
		//console.log("加载进度: " + progress);
        //loadTiao.graphics.clear();
        var OnePercent = (192 - 4)/100;//每百分之一进度的距离
        var addPercent = Math.round(progress * OnePercent);//需要增加的百分比
        var path =  [
            ["moveTo", 4, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 4, 4], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 8, 4, 8, 4],
            ["lineTo", 4+addPercent, 8],
            ["arcTo", 8+addPercent, 8, 8+addPercent, 4, 4],
            ["arcTo", 8+addPercent, 0, 4+addPercent, 0, 4],
            ["lineTo", 4, 0]
        ];
        loadTiao.graphics.drawPath((pageWidth-208)/2 + 4, Math.round(pageHeight/2.5) - 6, path, {fillStyle: "#c91522"});
	}

    //打印加载失败日志
	function onError(err)
	{
		console.log("加载失败: " + err);
	}

})();