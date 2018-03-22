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

    var gameTime = 0;//游戏运行时间
    var MovingSpeed  = 0.3;//聚宝盆左右移动速度（越大越快）
    var pengInfo = {};//存放聚宝盆信息
    var fraction = 0;//纪录得分

    var boomSprite = [];//存放爆炸特效的Sprite

    var blood = 5;//初始血量

    function gamePlay() {
        var _this = this;
        _this.gamePlayInit();

        //初始化坠落物
        gameLand_s = new gameLand();

        //初始化祝福语
        blessText_s = new blessText();
        //启动循环消失爆炸效果及其他效果
        _proto.boomHide();
    }

    Laya.class(gamePlay, "gamePlay", Sprite);

    var _proto = gamePlay.prototype;

    //开始画面
    _proto.gamePlayInit = function(){
        var _this = this;
        console.log('游戏主程序初始化');
        //Tween自定义算法
        Tween = new tweenFun();
        //加载游戏主背景
        game_bg2 = new Sprite();
        game_bg2.loadImage("res/images/game_bg_2.png", 10, 10, pageWidth-20, pageHeight-20);
        game_bg2.alpha = 0;
        Laya.stage.addChild(game_bg2);
        Laya.timer.frameLoop(1, _this, game_addbg2_animate);
        function game_addbg2_animate(e){
            if(game_bg2.alpha < 1){
                game_bg2.alpha += 0.1;
            }else{
                Laya.timer.clear(_this, game_addbg2_animate);
                _proto.add_hua();
            }
        }
    }

    //添加背景动效
    _proto.add_hua = function (){
        var _this = this;
        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/images/game_hua_l1.atlas", Laya.Handler.create(this, stageAdd_add_hua_l1));
        //左侧花1
        function stageAdd_add_hua_l1(){
            gamebg_hua_l1 = new Laya.Animation();
            gamebg_hua_l1.loadAnimation("game_hua_l1.ani");
            gamebg_hua_l1.scale(0.5,0.5);
            gamebg_hua_l1.pivotX = 0;
            gamebg_hua_l1.pivotY = 0;
            gamebg_hua_l1.x = pageWidth * 0.1 - 30;
            gamebg_hua_l1.y = pageHeight * 0.5;
            gamebg_hua_l1.alpha = 0;
            Laya.stage.addChild(gamebg_hua_l1);
            gamebg_hua_l1.play();
        }

        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/images/game_hua_r1.atlas", Laya.Handler.create(this, stageAdd_add_hua_r1));
        //右侧花1
        function stageAdd_add_hua_r1(){
            gamebg_hua_r1 = new Laya.Animation();
            gamebg_hua_r1.loadAnimation("game_hua_r1.ani");
            gamebg_hua_r1.scale(0.5,0.5);
            gamebg_hua_r1.pivotX = 0;
            gamebg_hua_r1.pivotY = 0;
            gamebg_hua_r1.x = pageWidth * 0.87 + 30;
            gamebg_hua_r1.y = pageHeight * 0.5;
            gamebg_hua_r1.alpha = 0;
            Laya.stage.addChild(gamebg_hua_r1);
            gamebg_hua_r1.play();
        }

        //加载左侧花2
        gamebg_hua_l2 = new Sprite();
        gamebg_hua_l2.loadImage("res/images/game_bg_hua_l.png", -30, pageHeight*0.218, pageWidth*0.12, (pageWidth*0.12)*(690/92));
        gamebg_hua_l2.alpha = 0;
        Laya.stage.addChild(gamebg_hua_l2);

        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/images/game_hua_r2.atlas", Laya.Handler.create(this, stageAdd_add_hua_r2));
        //右侧花2
        function stageAdd_add_hua_r2(){
            gamebg_hua_r2 = new Laya.Animation();
            gamebg_hua_r2.loadAnimation("game_hua_r2.ani");
            gamebg_hua_r2.scale(0.5,0.5);
            gamebg_hua_r2.pivotX = 0;
            gamebg_hua_r2.pivotY = 0;
            gamebg_hua_r2.x = pageWidth * 0.93 + 30;
            gamebg_hua_r2.y = pageHeight * 0.55;
            gamebg_hua_r2.alpha = 0;
            Laya.stage.addChild(gamebg_hua_r2);
            gamebg_hua_r2.play();
        }

        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/images/game_gold.atlas", Laya.Handler.create(this, stageAdd_add_gold));
        //底部金币
        function stageAdd_add_gold(){
            gamebg_gold = new Laya.Animation();
            gamebg_gold.loadAnimation("game_gold.ani");
            gamebg_gold.scale(0.5,0.5);
            gamebg_gold.pivotX = 0;
            gamebg_gold.pivotY = 0;
            gamebg_gold.x = pageWidth * 0.54;
            gamebg_gold.y = pageHeight * 0.89 + 30;
            gamebg_gold.alpha = 0;
            Laya.stage.addChild(gamebg_gold);
            gamebg_gold.play();
        }

        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/images/game_god.atlas", Laya.Handler.create(this, stageAdd_add_god));
        //底部金币
        function stageAdd_add_god(){
            gamebg_god = new Laya.Animation();
            gamebg_god.loadAnimation("game_god.ani");
            gamebg_god.scale(0.5,0.5);
            gamebg_god.pivotX = 0;
            gamebg_god.pivotY = 0;
            gamebg_god.x = pageWidth * 0.84;
            gamebg_god.y = pageHeight * 0.89 + 30;
            gamebg_god.alpha = 0;
            Laya.stage.addChild(gamebg_god);
            gamebg_god.play();
        }

        //加载聚宝盆
        game_jubaopeng = new Sprite();
        if(checkdeMenu.name == 'start_menu_1'){
            var game_jubaopeng_pic = "res/images/game_peng_1.png";
        }else if(checkdeMenu.name == 'start_menu_2'){
            var game_jubaopeng_pic = "res/images/game_peng_2.png";
        }else{
            var game_jubaopeng_pic = "res/images/game_peng_3.png";
        }
        game_jubaopeng.loadImage(game_jubaopeng_pic);
        game_jubaopeng.scale(0.5,0.5);
        game_jubaopeng.pivotX = 0;
        game_jubaopeng.pivotY = 0;
        game_jubaopeng.alpha = 0;
        game_jubaopeng.x = pageWidth * 0.27;
        game_jubaopeng.y = pageHeight * 0.82;
        game_jubaopeng.zOrder = 2;
        Laya.stage.addChild(game_jubaopeng);

        //加载计分板背景
        gamebg_bg_fen = new Sprite();
        gamebg_bg_fen.loadImage("res/images/game_bg_fen.png", pageWidth*0.6, -15, pageWidth*0.38, (pageWidth*0.38)*(105/309));
        gamebg_bg_fen.alpha = 0;
        Laya.stage.addChild(gamebg_bg_fen);

        //显示计分板上的分数文本
        top_fen = new Laya.Text();
        top_fen.text = fraction;
        top_fen.color = "#4c340c";
        top_fen.font = "Ya Hei";
        top_fen.fontSize = 22;
        top_fen.x = pageWidth * 0.79;
        top_fen.y = 25;
        Laya.stage.addChild(top_fen);
        top_fen.zOrder = 4;

        //显示计分板上的分数文本
        top_fen2 = new Laya.Text();
        top_fen2.text = "分";
        top_fen2.color = "#4c340c";
        top_fen2.font = "Ya Hei";
        top_fen2.fontSize = 13;
        top_fen2.x = top_fen.x + top_fen.width + 2;
        top_fen2.y = 32;
        Laya.stage.addChild(top_fen2);
        top_fen2.zOrder = 4;

        //加载血条
        gamebg_blood = new Sprite();
        gamebg_blood.loadImage("res/images/game_bg_blood_5.png", 10, -10, pageWidth*0.38, (pageWidth*0.38)*(86/298));
        gamebg_blood.alpha = 0;
        Laya.stage.addChild(gamebg_blood);

        //初始化聚宝盆后获取聚宝盆信息
        pengInfo = game_jubaopeng.getBounds();

        //陀螺仪监听
        _proto.eventGyroscope();

        Laya.timer.frameLoop(1, _this, gamebg_allpic_show);
        //动画显示所有背景修饰动画
        function gamebg_allpic_show(e){
            if(gamebg_hua_l1.alpha < 1){
                gamebg_hua_l1.alpha += 0.05;
                gamebg_hua_l2.alpha += 0.05;
                gamebg_hua_r1.alpha += 0.05;
                gamebg_hua_r2.alpha += 0.05;
                gamebg_gold.alpha += 0.05;
                gamebg_god.alpha += 0.05;
                game_jubaopeng.alpha += 0.05;
                gamebg_bg_fen.alpha += 0.05;
                gamebg_blood.alpha += 0.05;

                gamebg_hua_l1.x += 1.5;
                gamebg_hua_l2.x += 1.5;
                gamebg_hua_r1.x -= 1.5;
                gamebg_hua_r2.x -= 1.5;
                gamebg_gold.y -= 1.5;
                gamebg_god.y -= 1.5;
                gamebg_bg_fen.y +=1.5;
                gamebg_blood.y +=1.5;
            }else{
                Laya.timer.clear(_this, gamebg_allpic_show);
                _proto.gameRun();
            }
        }
    }

    //游戏运行主功能
    _proto.gameRun = function (){
        var _this = this;
        _gameRunThis = this;
        //开始时间循环
        Laya.timer.loop(1, _this, gameRunPlay);

        //主时间循环
        function gameRunPlay(e){
            //计算游戏运行时间
            gameTime ++;
            //每间隔时间增加坠落物
            if(gameTime % 20 == 0){
                gameLand_s.addLandToStage(gameLand_s.landStageArray.length);
            }

            //坠落物坠落
            landDown();

            //碰撞检测
            collisionCheck();
        }

        //坠落物坠落
        function landDown(){
            var i = 0;
            //循环每个人坠落物
            gameLand_s.landStageArray.forEach(function(landObj) {
                //判断坠落物是否超出屏幕
                if(landObj.y > pageHeight){
                    //产品掉出屏幕扣分
                    if(landObj.landType != 'boom' && landObj.landType != 'default'){
                        blood -= 1;
                        _proto.bloodJian();
                    }
                    //超出屏幕，删除元素
                    landObj.destroy();
                    gameLand_s.landStageArray.splice(i,1);
                    //血量用完，游戏结束
                    if(blood <= 0){
                        Laya.timer.clear(_this, gameRunPlay);
                        _proto.gameOver();
                    }
                }else{
                    //未超出屏幕，继续坠落
                    landObj.y += 3;
                    landObj.scaleX -= 0.0003;
                    landObj.scaleY -= 0.0003;
                    if(landObj.alpha < 1){
                        landObj.alpha += 0.05;
                    }

                    if(landObj.x < pageWidth * 0.2){
                        landObj.x += 0.1;
                    }else if(landObj.x > pageWidth * 0.6){
                        landObj.x -= 0.1;
                    }
                }
                i++;
            }, this);
        }

        //碰撞检测
        function collisionCheck(){
            var i = 0;
            //循环每个人坠落物game_jubaopeng
            gameLand_s.landStageArray.forEach(function(landObj) {
                //当坠落物的高度达到聚宝盆的盆口高度
                if(landObj.y >= game_jubaopeng.y-10  && landObj.y <= game_jubaopeng.y + 90){
                    if(landObj.x >= game_jubaopeng.x-20 && landObj.x <= game_jubaopeng.x + pengInfo.width - 50){
                        //计算得分
                        addFraction(landObj.landType, landObj);
                        //检测到碰撞，删除元素
                        landObj.destroy();
                        gameLand_s.landStageArray.splice(i,1);
                        //刷新显示计分
                        top_fen.text = fraction;
                        top_fen2.x = top_fen.x + top_fen.width + 2;
                    }
                }
                i++;
            }, this);
        }
        
        //计算的得分
        function addFraction(landType, landObj){
            //计分规则设置
            if(checkdeMenu.name == 'start_menu_1'){//聚宝盆，金币累计15积分，每个产品70积分
                var fenObj = {
                    jb : 15,
                    cp : 70
                }
            }else if(checkdeMenu.name == 'start_menu_2'){//狗，金币累计10积分，每个产品50积分
                var fenObj = {
                    jb : 10,
                    cp : 50
                }
            }else{//竹楼，金币累计5积分，每个产品30积分
                var fenObj = {
                    jb : 5,
                    cp : 30
                }
            }

            if(landType == 'land_1' || landType == 'land_2' || landType == 'land_3' || landType == 'land_4' || landType == 'land_5'){//产品
                //分数计算
                fraction += fenObj.cp;
                //播放音效
                SoundManager.playSound("res/sounds/ye.mp3", 1);
            }else if(landType == 'boom'){//炸弹
                //掉血
                blood -= 1;
                _proto.bloodJian();
                //爆炸特效
                var tmpI = boomSprite.length;
                boomSprite[tmpI] = new Sprite();
                boomSprite[tmpI].loadImage("res/images/land_7_2.png", landObj.x - pageWidth*0.05, landObj.y, pageWidth*0.3, (pageWidth*0.3)*(147/228));
                boomSprite[tmpI].zOrder = 5;
                Laya.stage.addChild(boomSprite[tmpI]);
                //播放爆炸音效
                SoundManager.playSound("res/sounds/boom.mp3", 1);
            }else{//普通金币
                //分数计算
                fraction += fenObj.jb;
            }
            //血量用完，游戏结束
            if(blood <= 0){
                Laya.timer.clear(_this, gameRunPlay);
                _proto.gameOver();
            }
        }
    }

    //循环获取需要消失的爆炸效果及其他效果
    _proto.boomHide = function(){
        var _this = this;

        Laya.timer.frameLoop(1, _this, boomHide_animate);
        function boomHide_animate(e){
            //循环爆炸删除
            var i = 0;
            boomSprite.forEach(function(element) {
                if(element.alpha > 0){
                    element.alpha -= 0.01;
                    element.y += 0.1;
                }else{
                    element.destroy();
                    boomSprite.splice(i,1);
                }
                i ++;
            }, this);
        }
    }

    //游戏结束
    _proto.gameOver = function(){
        var _this = this;
        console.log('游戏结束!');

        //加载弹窗背景
        popBG_Black = new Sprite();
        Laya.stage.addChild(popBG_Black);
        popBG_Black.graphics.drawRect(0, 0, pageWidth, pageHeight, "#000000");
        popBG_Black.alpha = 0;
        popBG_Black.zOrder = 5;
        Laya.timer.frameLoop(1, _this, popBG_BlackShow);

        //半透明黑背景
        function popBG_BlackShow(){
            popBG_Black.alpha += 0.025;
            if(popBG_Black.alpha >= 0.4){
                Laya.timer.clear(_this, popBG_BlackShow);
                //写着html上的中奖接口
                openRedPackets();
            }
        }

        //打开红包
        function openRedPackets(){
            console.log('打开红包!');
            //加载红包背景
            winner_hb = new Sprite();
            winner_hb.loadImage("res/images/winner_hb.png", 50, pageHeight*0.2 + 50, pageWidth-100, (pageWidth-100)*(913/580));
            winner_hb.alpha = 0;
            winner_hb.zOrder = 5;
            Laya.stage.addChild(winner_hb);
            Laya.timer.frameLoop(1, _this, openRedPackets_show);

            //加载红包背景彩条碎屑
            winner_hb2 = new Sprite();
            winner_hb2.loadImage("res/images/winner_hb_2.png", 0, 0, pageWidth, pageHeight);
            winner_hb2.alpha = 0;
            winner_hb2.zOrder = 5;
            Laya.stage.addChild(winner_hb2);

            winner_hb2.on(Event.CLICK, this, sendBless);
        }
        //红包展开效果
        function openRedPackets_show(){
            if(winner_hb.alpha >= 1){
                Laya.timer.clear(_this, openRedPackets_show);

                //显示红包上的分数文本
                winner_hb_text = new Laya.Text();
                winner_hb_text.text = "恭喜您"+"\n"+"获得"+fraction+"分";
                winner_hb_text.color = "#ffffff";
                //winner_hb_text.font = "Ya Hei";
                winner_hb_text.fontSize = 22;
                winner_hb_text.leading = 5;//行间距
                winner_hb_text.align = "center";
                winner_hb_text.width = pageWidth;
                winner_hb_text.y = pageHeight * 0.37;
                Laya.stage.addChild(winner_hb_text);
                winner_hb_text.zOrder = 5;

                winner_hb_text2 = new Laya.Text();
                winner_hb_text2.text = "来拆开属于你的专属"+"\n"+" 2018新年运势吧！";
                winner_hb_text2.color = "#ffffff";
                //winner_hb_text2.font = "Ya Hei";
                winner_hb_text2.fontSize = 16;
                winner_hb_text2.leading = 5;//行间距
                winner_hb_text2.align = "center";
                winner_hb_text2.width = pageWidth;
                winner_hb_text2.y = pageHeight * 0.47;
                Laya.stage.addChild(winner_hb_text2);
                winner_hb_text2.zOrder = 5;

            }else{
                winner_hb.alpha += 0.1;
                winner_hb2.alpha += 0.1;
                winner_hb.y -= 5;
            }
        }

        //送祝福
        function sendBless(e){
            console.log('送祝福！');
            Laya.timer.frameLoop(1, _this, gamebg_allpic_hide);
            //动画显示所有背景修饰动画
            function gamebg_allpic_hide(e){
                if(winner_hb.alpha > 0){
                    winner_hb.alpha -= 0.05;
                    winner_hb2.alpha -= 0.05;
                    winner_hb_text.alpha -= 0.05;
                    winner_hb_text2.alpha -= 0.05;

                    winner_hb.y += 3;
                }else{
                    Laya.timer.clear(_this, gamebg_allpic_hide);

                    winner_hb.destroy();
                    winner_hb2.destroy();
                    winner_hb_text.destroy();
                    winner_hb_text2.destroy();

                    //显示祝福语
                    showBless();
                }
            }

            //显示祝福语
            function showBless(){
                //加载祝福语背景框
                blessBgBox = new Sprite();
                blessBgBox.loadImage("res/images/winner_bless_box.png");
                blessBgBox.scaleX = 0;
                blessBgBox.scaleY = 0;
                blessBgBox.x = pageWidth * 0.5;
                blessBgBox.y = pageHeight * 0.5;
                blessBgBox.zOrder = 5;
                Laya.stage.addChild(blessBgBox);

                //弹出祝福语
                var tween_t = 0;
                var tween_d = 50;
                Laya.timer.frameLoop(1, _this, showBless_animation);
                function showBless_animation(e){
                    //t: current time（当前时间）；
                    //b: beginning value（初始值）；
                    //c: change in value（变化量）；
                    //d: duration（持续时间）。
                    if(tween_t < tween_d){
                        var scale = Tween.Bounce.easeOut(tween_t, 0, pageWidth/750, tween_d);
                        blessBgBox.scaleX = scale;
                        blessBgBox.scaleY = scale;
                        var b_x = Tween.Bounce.easeOut(tween_t, 0, pageWidth * 0.5, tween_d);
                        blessBgBox.x = (pageWidth * 0.5) - b_x;
                        var b_y = Tween.Bounce.easeOut(tween_t, pageHeight * 0.1, pageHeight * 0.5, tween_d);
                        blessBgBox.y = (pageHeight * 0.7) - b_y;
                        tween_t++;
                    }else{
                        Laya.timer.clear(_this, showBless_animation);

                        if(fraction < 200){
                            var blessTextI = 0;
                        }else if(fraction > 200 && fraction <= 400){
                            var blessTextI = 1;
                        }else if(fraction > 400 && fraction <= 600){
                            var blessTextI = 2;
                        }else if(fraction > 600 && fraction <= 800){
                            var blessTextI = 3;
                        }else if(fraction > 800 && fraction <= 1000){
                            var blessTextI = 4;
                        }else{
                            var blessTextI = 5;
                        }
                        //随机获取此分段的祝福语
                        var blessText_tI = randomNum(0, blessText_s.blessText[blessTextI].text.length - 1);
                        
                        //显示祝福语
                        winner_bless_title = new Laya.Text();
                        winner_bless_title.text = '年度关键词' + "\n" + blessText_s.blessText[blessTextI].title;
                        winner_bless_title.color = "#ffffff";
                        //winner_hb_text.font = "Ya Hei";
                        winner_bless_title.fontSize = 20;
                        winner_bless_title.leading = 10;//行间距
                        winner_bless_title.align = "center";
                        winner_bless_title.width = pageWidth;
                        winner_bless_title.y = pageHeight * 0.17;
                        Laya.stage.addChild(winner_bless_title);
                        winner_bless_title.zOrder = 5;
                        winner_bless_title.alpha = 0;

                        winner_bless_text = new Laya.Text();
                        winner_bless_text.text = blessText_s.blessText[blessTextI].text[blessText_tI];
                        winner_bless_text.color = "#ffffff";
                        //winner_hb_text.font = "Ya Hei";
                        winner_bless_text.fontSize = 15;
                        winner_bless_text.leading = 3;//行间距
                        winner_bless_text.align = "left";
                        winner_bless_text.wordWrap = true;//自动换行
                        winner_bless_text.width = pageWidth * 0.7;
                        winner_bless_text.y = pageHeight * 0.28;
                        winner_bless_text.x = pageWidth * 0.15;
                        Laya.stage.addChild(winner_bless_text);
                        winner_bless_text.zOrder = 5;
                        winner_bless_text.alpha = 0;

                        //加载分享按钮
                        menu_shear = new Sprite();
                        menu_shear.loadImage("res/images/menu_shear.png");
                        menu_shear.scaleX = 0.5;
                        menu_shear.scaleY = 0.5;
                        menu_shear.x = pageWidth * 0.15;
                        menu_shear.y = pageHeight * 0.45;
                        menu_shear.zOrder = 5;
                        Laya.stage.addChild(menu_shear);
                        menu_shear.alpha = 0;

                        //加载分享按钮
                        menu_again = new Sprite();
                        menu_again.loadImage("res/images/menu_again.png");
                        menu_again.scaleX = 0.5;
                        menu_again.scaleY = 0.5;
                        menu_again.x = pageWidth * 0.5;
                        menu_again.y = pageHeight * 0.45;
                        menu_again.zOrder = 5;
                        Laya.stage.addChild(menu_again);
                        menu_again.alpha = 0;

                        //关注按钮
                        winner_guanzhu = new Sprite();
                        winner_guanzhu.loadImage("res/images/menu_qrcode.png");
                        winner_guanzhu.scaleX = 0.5;
                        winner_guanzhu.scaleY = 0.5;
                        winner_guanzhu.y = pageHeight * 0.54;
                        winner_guanzhu.zOrder = 5;
                        Laya.stage.addChild(winner_guanzhu);
                        winner_guanzhu.alpha = 0;
                        var winner_guanzhu_info = winner_guanzhu.getBounds();
                        winner_guanzhu.x = (pageWidth - winner_guanzhu_info.width)/2;

                        Laya.timer.frameLoop(1, _this, showBlessText_animation);
                    }
                }

                function showBlessText_animation(e){
                    if(winner_bless_title.alpha < 1){
                        winner_bless_title.alpha += 0.1;
                        winner_bless_text.alpha += 0.1;
                        winner_guanzhu.alpha += 0.1;
                        menu_shear.alpha += 0.1;
                        menu_again.alpha += 0.1;
                    }else{
                        Laya.timer.clear(_this, showBlessText_animation);

                        //监听事件(开始游戏)
                        menu_again.on(Event.CLICK, this, game_again);
                        //监听事件(开始游戏)
                        menu_shear.on(Event.CLICK, this, game_shear);
                        //跳转关注页
                        winner_guanzhu.on(Event.CLICK, this, game_fllow);
                    }
                }

                function game_again(e){
                    location.reload();
                }

                function game_shear(e){
                    console.log('分享');
                    winner_bless_title.text = '点击右上角微信菜单'+"\n"+'分享给你的好友';
                    winner_bless_title.y = pageHeight * 0.32;
                    winner_bless_text.destroy();

                    qrtj = new Sprite();
                    qrtj.loadImage("res/images/tj.png", pageWidth * 0.85 , 10, pageWidth*0.1, (pageWidth*0.1)*(91/104));
                    qrtj.zOrder = 5;
                    Laya.stage.addChild(qrtj);
                }

                function game_fllow(e){
                    window.location.href = followUlr;
                }
            }
        }
    }

    //血条减血
    _proto.bloodJian = function(){
        var textureUrl = 'res/images/game_bg_blood_'+blood+'.png'
        // 更换纹理
		gamebg_blood.graphics.clear();
		var texture = Laya.loader.getRes(textureUrl);
		gamebg_blood.graphics.drawTexture(texture, 10, -10, pageWidth*0.38, (pageWidth*0.38)*(86/298));
    }

    //陀螺仪监听
    _proto.eventGyroscope = function(){
        var _this = this;
        
        //////////////////////////////////////////////////////////////////////////////
        /*/陀螺仪测试数据
        testInfo = new Text();
        testInfo.fontSize = 12;
        testInfo.color = "#000000";
        testInfo.x = 10;
        testInfo.y = 10;
        testInfo.alpha = 0.5;
        Laya.stage.addChild(testInfo);
        testInfo.zOrder = 99;
        /////////////////////////////////////////////////////////////////////////////*/

        window.addEventListener("deviceorientation", onOrientationChange, false);
    }
    //陀螺仪监听动作执行
    function onOrientationChange(event) {
        //////////////////////////////////////////////////////////////////////////////
        //陀螺仪测试数据
        /*
        var isIphoneT = 'no';
        if(isIphone()){
            isIphoneT = 'yes';
        }
        testInfo.text = 
        "alpha:" + Math.floor(event.alpha) + '\n' +//左右旋转
        "beta :" + Math.floor(event.beta) + '\n' +//前后旋转
        "gamma:" + Math.floor(event.gamma) + '\n' +//扭转设备
        "Jump Num:" + JumpNum + '\n' +
        "is Iphone:" + isIphoneT
        */
        //////////////////////////////////////////////////////////////////////////////

        //判断左右和扭转值，取大的值发送给北极熊移动
        if(event.alpha >=0 && event.alpha <180){//向左倾斜
            var alpha = event.alpha;
        }else{//向右倾斜
            var alpha = Math.abs(alpha-360);
        }
        var gamma = Math.abs(event.gamma);

        if(alpha >= gamma && isIphone()){
            _proto.pengXMove(event.alpha, 'alpha');
        }else{
            _proto.pengXMove(event.gamma, 'gamma');
        }
    }

    //聚宝盆X轴方向移动
    _proto.pengXMove = function(xMove, type){
        if(type == 'alpha'){
            if(xMove >=0 && xMove <180){//向左倾斜
                var xAdd = -(xMove * MovingSpeed);
            }else{//向右倾斜
                var xAdd = Math.abs(xMove-360) * MovingSpeed;
            }
        }else{
            var xAdd = xMove * MovingSpeed;
        }

        //设置左右边界

        if(game_jubaopeng.x <= 0){
            if(xAdd < 0){
                xAdd = 0;
            }
        }else if(game_jubaopeng.x >= pageWidth-pengInfo.width){
            if(xAdd > 0){
                xAdd = 0;
            }
        }
        game_jubaopeng.x += xAdd;
    }

    //判断是否是iphone
    function isIphone(){
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            return true;
        }else{
            return false;
        }
    };

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