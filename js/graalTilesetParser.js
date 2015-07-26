"use strict";

if (!com.javecross) {
    throw new Error("Namespace not yet defined!");
}

com.javecross.TilesetParser = function () {

    var BASE_64_LENGTH = 256;

    var originalTilesetInputObject;
    var originalTilesetInputPath;

    var newTilesetInputObject;
    var newTilesetInputPath;

    var pageContainerObject;

    var originalTilesetImage;
    var imageEncodingCanvas;
    var imageEncodingContext;

    /* MUTATOR FUNCTIONS */
    function createTilesetHashMap() {
        var msg = "";
        if (!originalTilesetInputPath) {
            msg += " Original tileset wasn't defined! ";
        }
        if (!newTilesetInputPath) {
            console.log("Warning :: new tileset");
            //msg += " New tileset wasn't defined! ";
        }
        if (!pageContainerObject) {
            msg += " Page container object wasn't set! ";
        }
        if (msg.length > 0) {
            alert(msg);
            throw new Error(msg);
        }
        imageEncodingCanvas = $("<canvas></canvas>");
        imageEncodingCanvas.prop('id', 'image-encoding-canvas');
        imageEncodingCanvas[0].width = 16;
        imageEncodingCanvas[0].height = 16;
        imageEncodingCanvas.width(16);
        imageEncodingCanvas.height(16);
        imageEncodingCanvas.addClass('hidden-canvas');

        var search = pageContainerObject.find(imageEncodingCanvas.prop('id'));
        if (!search || !search.length) {
            pageContainerObject.append(imageEncodingCanvas);
        }
        imageEncodingContext = imageEncodingCanvas[0].getContext('2d');
        originalTilesetImage = new Image();

        originalTilesetImage.onload = function () {
            parseOriginalTileset();
        };
        originalTilesetImage.src = originalTilesetInputPath;
    }

    function parseOriginalTileset() {
        var width = originalTilesetImage.width;
        var height = originalTilesetImage.height;
        var tileSize = com.javecross.TileUtils.getTileSize();
        var tileWidth = width / tileSize;
        var tileHeight = height / tileSize;
        var totalTiles = 0;
        var collisions = 0;
        var tilex, tiley;

        var originalTileset = {};
        var lvlContext = $("#level-canvas")[0].getContext('2d');

        for (var y = 0; y < tileHeight; y++) {
            tiley = y * tileSize;
            for (var x = 0; x < tileWidth; x++) {
                tilex = x * tileSize;

                var tileId = com.javecross.TileUtils.convertXyToTileId(tilex, tiley);
                var encoded = base64EncodeTile(tilex, tiley);

                var tileArray = originalTileset[encoded];
                var tile = {};
                tile.tileId = tileId;
                tile.x = tilex;
                tile.y = tiley;

                if (!tileArray) {
                    var tileArray = [];
                    originalTileset[encoded] = tileArray;
                } else {
                    collisions++;
                    lvlContext.drawImage(originalTilesetImage,
                            tilex, tiley,
                            tileSize, tileSize,
                            (collisions % 18) * tileSize,
                            Math.floor(collisions / 18) * tileSize,
                            tileSize, tileSize);
                }
                tileArray.push(tile);
                totalTiles++;
            }
        }
        console.log("Total tiles processed :: " + totalTiles);
        console.log("Total collisions encountered :: " + collisions);
        // console.log(originalTileset);
    }

    function base64EncodeTile(tilex, tiley) {
        imageEncodingContext.drawImage(originalTilesetImage, tilex, tiley, 16, 16, 0, 0, 16, 16);
        var tileDataUrl = imageEncodingCanvas[0].toDataURL().split(",")[1];
        if (BASE_64_LENGTH > 0) {
            tileDataUrl = tileDataUrl.substring(0, BASE_64_LENGTH);
        }
        return tileDataUrl;
    }

    /* GETTERS & SETTERS */
    function setOriginalTilesetInput(tilesetInput) {
        originalTilesetInputObject = tilesetInput;
        originalTilesetInputObject.change(function (event) {
            var tempPath = URL.createObjectURL(event.target.files[0]);
            originalTilesetInputPath = tempPath;
        });
    }

    function setNewTilesetInput(tilesetInput) {
        newTilesetInputObject = tilesetInput;
        newTilesetInputObject.change(function (event) {
            var tempPath = URL.createObjectURL(event.target.files[0]);
            newTilesetInputPath = tempPath;
        });
    }

    function setPageContainer(pageContainer) {
        pageContainerObject = pageContainer;
    }

    return {
        setOriginalTilesetInput: function (tilesetInput) {
            setOriginalTilesetInput(tilesetInput);
        },
        setNewTilesetInput: function (tilesetInput) {
            setNewTilesetInput(tilesetInput);
        },
        setPageContainer: function (pageContainer) {
            setPageContainer(pageContainer);
        },
        createTilesetHashMap: function () {
            createTilesetHashMap();
        }
    };
}();