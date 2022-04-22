//所有物件要對齊 都可以使用這個 class
class Align
{
    static scaleToGameW(obj,per)
    {
        obj.displayWidth=game.config.width*per;
        obj.scaleY=obj.scaleX;
    }

    //置中控制
    static center(obj){
        obj.x= game.config.width /2;
        obj.y= game.config.height /2;
        // Align.center(obj name);
    }

    //垂直
    static centerH(obj){
        obj.x= game.config.width /2;
    }
    //水平
    static centerV(obj){
        obj.y= game.config.height /2;
    }
}