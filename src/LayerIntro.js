/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var LayerIntro = cc.Layer.extend({
    tiempoTotal:0,
    nave:null,
    velocidad:0,
    enemigo:0,
    velocidadEnemigo:-150,

    init:function ()
    {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.setKeyboardEnabled(true);

        this.setTouchEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        var fondo = cc.Sprite.create("resources/sunset.jpg");
        fondo.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(fondo);

        var ground = cc.Sprite.create("resources/ground.png");
        ground.setPosition(cc.p(size.width/2,ground.getContentSize().height/2));
        this.addChild(ground);

        var nave = cc.Sprite.create("resources/ship.png");
        nave.setPosition(cc.p(size.width*0.15,size.height/2));
        this.addChild(nave);
        this.nave = nave;

        var enemigo = cc.Sprite.create("resources/enemy.png");
        var posY = Math.floor((Math.random()*size.height-enemigo.getContentSize.height/2));
        enemigo.setPosition(cc.p(size.width + enemigo.getContentSize().width/2,posY));
        this.addChild(enemigo);
        this.enemigo = enemigo;

        this.scheduleUpdate();
        
        return true;
    },

    update:function(dt)
    {
        this.tiempoTotal += dt;
        var size = cc.Director.getInstance().getWinSize();

        var pos = this.nave.getPositionY()+this.velocidad*dt;

        this.nave.setPositionY(pos);

        var posEnemigo = this.enemigo.getPositionX()+this.velocidadEnemigo*dt;

        if(posEnemigo <= -this.enemigo.getContentSize().width/2)
        {
            posEnemigo = size.width + this.enemigo.getContentSize().width/2;
            var posY = Math.floor((Math.random()*size.height)) - this.enemigo.getContentSize().height/2;
            this.enemigo.setPositionY(posY);
        }
        this.enemigo.setPositionX(posEnemigo);
    },

    onKeyUp:function(evt)
    {
        this.velocidad = 0;
    },

    onKeyDown:function(evt)
    {
        if(evt == 40)
        {
            //abajo creo
            this.velocidad = -150;
        }
        else if(evt == 38)
        {
            //arriba creo
            this.velocidad = 150;
        }
    },

    registerWithTouchDispatcher:function()
    {
        cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
    },

    onTouchesBegan:function(touches, event)
    {
        if(touches.length <= 0) return;
        var touch = touches[0];
        var location = touch.getLocation();
    },

    onTouchesMoved:function(touches, event)
    {
        if(touches.length <= 0) return;
        var touch = touches[0];
        var location = touch.getLocation();
    },

    onTouchesEnded:function(touches, event)
    {
        if(touches.length <= 0) return;
        var touch = touches[0];
        var location = touch.getLocation();
    },

    onTouchesCancelled:function(touches, event){
        this.onTouchesEnded(touches, event);
    }
});

var SceneIntro = cc.Scene.extend({
    onEnter:function ()
    {
        this._super();
        var layer = new LayerIntro();
        this.addChild(layer);
        layer.init();
    }
});
