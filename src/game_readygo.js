//游戏Ready Go
(function(){
    var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;
    var SoundManager = Laya.SoundManager;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

    function gameReadygo() {
        var _this = this;
        _this.gameReadygoInit();
    }

    Laya.class(gameReadygo, "gameReadygo", Sprite);

    var _proto = gameReadygo.prototype;

    //开始画面
    _proto.gameReadygoInit = function(){
        var _this = this;
        
        //加载背景,画矩形
        gamePlay_BG = new Sprite();
        gamePlay_BG.graphics.drawRect(0, 0, pageWidth, pageHeight, "#ffba00");
        Laya.stage.addChild(gamePlay_BG);
        gamePlay_BG.alpha = 0;
        Laya.timer.frameLoop(1, this, gamePlay_BG_animate);

        //加载ReadyGo
        gamePlay_readyGo = new Sprite();
        gamePlay_readyGo.loadImage("res/images/play_readygo.png");
        gamePlay_readyGo.scaleX = (pageHeight*1.3)/2000;
        gamePlay_readyGo.scaleY = (pageHeight*1.3)/2000;
        gamePlay_readyGo.pivotX = pageWidth * 2.65;
        gamePlay_readyGo.pivotY = pageHeight * 1.5;
        gamePlay_readyGo.x = pageWidth * 0.51;
        gamePlay_readyGo.y = pageHeight * 0.42;
        gamePlay_readyGo.alpha = 0;
        Laya.stage.addChild(gamePlay_readyGo);

        //加载ReadyGo
        gamePlay_readyGoText = new Sprite();
        gamePlay_readyGoText.loadImage("res/images/play_readygo_text.png");
        gamePlay_readyGoText.scaleX = (pageWidth*0.78)/588;
        gamePlay_readyGoText.scaleY = (pageWidth*0.78)/588;
        gamePlay_readyGoText.pivotX = pageWidth*0.7;
        gamePlay_readyGoText.pivotY = pageWidth*0.6;
        gamePlay_readyGoText.x = pageWidth * 0.45;
        gamePlay_readyGoText.y = pageHeight * 0.43;
        gamePlay_readyGoText.alpha = 0;
        Laya.stage.addChild(gamePlay_readyGoText);

        //加载ReadyGo的渐变遮挡
        gamePlay_ready_m = new Sprite();
        gamePlay_ready_m.loadImage("res/images/play_ready_m.png", 0, pageHeight-(pageWidth*(560/750)), pageWidth, pageWidth*(560/750));
        gamePlay_ready_m.alpha = 0;
        Laya.stage.addChild(gamePlay_ready_m);

        //背景渐现
        function gamePlay_BG_animate(e){
            if(gamePlay_BG.alpha < 1){
                gamePlay_BG.alpha += 0.1;
                gamePlay_readyGo.alpha += 0.1;
                gamePlay_ready_m.alpha += 0.1;
            }else{
                Laya.timer.clear(_this, gamePlay_BG_animate);

                //删除开始页面的元素
                start_menu_1.destroy();
                start_menu_2.destroy();
                start_menu_3.destroy();
                start_bg.destroy();
                start_menu_checked.destroy();
                start_menu_text.destroy();
                //start_menu_text2.destroy();
                start_play.destroy();

                //加载Ready Go动画
                Laya.timer.frameLoop(1, _this, gamePlay_readyGo_animate);
                //加载Ready Go标题动画
                gamePlay_readyGoText_show();
            }
        }

        //ReadyGo旋转动画
        function gamePlay_readyGo_animate(e){
            if(gamePlay_readyGo.rotation == 360){
                gamePlay_readyGo.rotation = 0;
            }
            gamePlay_readyGo.rotation += 0.2;
        }

        //Ready Go标题动画
        function gamePlay_readyGoText_show(){
            //获取原始缩放值
            gamePlay_readyGoText_scale = gamePlay_readyGoText.scaleX;
            gamePlay_readyGoText_scale_temp = gamePlay_readyGoText.scaleX;
            //文字放大缩小的方向
            gamePlay_readyGoText_big = false;

            gamePlay_readyGoText.scaleX = 0.01;
            gamePlay_readyGoText.scaleY = 0.01;
            Laya.timer.frameLoop(1, _this, gamePlay_readyGoText_show_animate);

            //缩放至指定大小
            function gamePlay_readyGoText_show_animate(e){
                if(gamePlay_readyGoText.alpha < 1){
                    gamePlay_readyGoText.alpha += 0.1;
                }
                if(gamePlay_readyGoText.scaleX < gamePlay_readyGoText_scale){
                    gamePlay_readyGoText.scaleX +=0.01;
                    gamePlay_readyGoText.scaleY +=0.01;
                }else{
                    Laya.timer.clear(this, gamePlay_readyGoText_show_animate);
                    Laya.timer.frameLoop(1, this, gamePlay_readyGoText_animate);

                    //播放Ready Go音效
                    SoundManager.playSound("res/sounds/readygo.mp3", 1);
                    //定时1秒后执行
                    Laya.timer.once(1000, _this, gamePlayGo);
                }
            }
        }

        //Ready Go标题动画
        function gamePlay_readyGoText_animate(e){
            if(gamePlay_readyGoText.scaleX > gamePlay_readyGoText_scale + 0.05){
                gamePlay_readyGoText_big = false;
            }else if(gamePlay_readyGoText.scaleX < gamePlay_readyGoText_scale - 0.05){
                gamePlay_readyGoText_big = true;
            }
            if(gamePlay_readyGoText_big){
                gamePlay_readyGoText_scale_temp += 0.002;
            }else{
                gamePlay_readyGoText_scale_temp -= 0.002;
            }
            gamePlay_readyGoText.scaleX = gamePlay_readyGoText_scale_temp;
            gamePlay_readyGoText.scaleY = gamePlay_readyGoText_scale_temp;
        }

        //开始游戏
        function gamePlayGo(e){
            //加载游戏主背景
            game_bg = new Sprite();
            game_bg.loadImage("res/images/game_bg.jpg", 0, 0, pageWidth, pageHeight);
            game_bg.alpha = 0;
            Laya.stage.addChild(game_bg);
            Laya.timer.frameLoop(1, _this, game_addbg_animate);
            function game_addbg_animate(e){
                if(game_bg.alpha < 1){
                    game_bg.alpha += 0.1;
                }else{
                    Laya.timer.clear(_this, game_addbg_animate);

                    //删除ready go元素
                    Laya.timer.clear(_this, gamePlay_readyGoText_animate);
                    Laya.timer.clear(_this, gamePlay_readyGo_animate);
                    gamePlay_BG.destroy();
                    gamePlay_readyGo.destroy();
                    gamePlay_ready_m.destroy();
                    gamePlay_readyGoText.destroy();
                    
                    //游戏主程序初始化
                    gamePlay_s = new gamePlay();
                    //Laya.gamePlay_s = gamePlay_s;
                }
            }
        }
    }

})();