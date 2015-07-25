"use strict";

if (!com.javecross) {
    throw new Error("Namespace not yet defined!");
}

com.javecross.TilesetParser = function () {
    var tilesetInputObject;
    var tilesetInputPath;

    var pageContainerObject;

    var tilesetImage;
    /* MUTATOR FUNCTIONS */
    function createTilesetHashMap() {
        if (!tilesetInputPath) {
            throw new Error("Tileset wasn't defined.");
        }
        tilesetImage = new Image();

        tilesetImage.onload = function () {
            parseLoadedTileset();
        };
        tilesetImage.src = tilesetInputPath;
    }

    function parseLoadedTileset() {
        var width = tilesetImage.width;
        var height = tilesetImage.height;
        var tileSize = com.javecross.TileUtils.getTileSize();
        var tileWidth = width / tileSize;
        var tileHeight = height / tileSize;
        var totalTiles = 0;
        var tilex, tiley;
        for (var y = 0; y < tileHeight; y++) {
            tiley = y * tileSize;
            for (var x = 0; x < tileWidth; x++) {
                tilex = x * tileSize;

                totalTiles++;
            }
        }
        console.log("Total tiles :: " + totalTiles);
    }

    /* GETTERS & SETTERS */
    function setTilesetInput(tilesetInput) {
        tilesetInputObject = tilesetInput;
        tilesetInputObject.change(function (event) {
            var tempPath = URL.createObjectURL(event.target.files[0]);
            tilesetInputPath = tempPath;
        });
    }

    function setPageContainer(pageContainer) {
        pageContainerObject = pageContainer;
    }

    return {
        setTilesetInput: function (tilesetInput) {
            setTilesetInput(tilesetInput);
        },
        setPageContainer: function (pageContainer) {
            setPageContainer(pageContainer);
        },
        createTilesetHashMap: function () {
            createTilesetHashMap();
        }
    };
}();