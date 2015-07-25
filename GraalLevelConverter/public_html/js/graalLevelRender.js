"use strict";

if (!com.javecross) {
    throw new Error("Namespace not yet defined!");
}

com.javecross.LevelRender = function () {

    var renderCanvasObject;


    function setRenderCanvas(renderCanvas) {
        renderCanvasObject = renderCanvas;
    }

    return {
        setRenderCanvas: function (renderCanvas) {
            setRenderCanvas(renderCanvas);
        }
    };
}();