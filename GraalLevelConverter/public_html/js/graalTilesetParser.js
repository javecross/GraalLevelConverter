"use strict";

if (!com.javecross) {
    throw new Error("Namespace not yet defined!");
}

com.javecross.TilesetParser = function () {

    var tilesetInputObject;
    /* MUTATOR FUNCTIONS */


    /* GETTERS & SETTERS */
    function setTilesetInput(tilesetInput) {
        tilesetInputObject = tilesetInput;
    }

    return {
        setTilesetInput: function (tilesetInput) {
            setTilesetInput(tilesetInput);
        }
    };
}();