"use strict";

var com;
if (!com) {
    com = {};
}

com.javecross = {};
com.javecross.TilesetMapper = function () {

    var toTilesetCanvas, fromTilesetCanvas;
    var toTSContext, fromTSContext;

    var toTileset, fromTileset;

    var imagesLoaded;

    var toTile, fromTile;

    var mappedTilesCount;
    var mappedTiles;

    var mappedFromTiles, mappedToTiles;

    function initialize(params) {
        if (!params) {
            mappedTilesCount = 0;
            mappedTiles = {};

            mappedFromTiles = [];
            mappedToTiles = [];
        } else {
            mappedTilesCount = params.mappedTilesCount;
            mappedTiles = params.mappedTiles;
            mappedFromTiles = params.mappedTileArrays.fromTiles;
            mappedToTiles = params.mappedTileArrays.toTiles;
        }
        imagesLoaded = 0;

        toTilesetCanvas = $("#to-tileset-canvas");
        fromTilesetCanvas = $("#from-tileset-canvas");
    }

    function setupTilesetImages() {
        toTileset = new Image();
        toTileset.onload = function () {
            tilesetLoaded();
        };
        toTileset.src = "../imgs/unholy_nation_tileset.png";

        fromTileset = new Image();
        fromTileset.onload = function () {
            tilesetLoaded();
        };
        fromTileset.src = "../imgs/pics1.png";

    }

    function tilesetLoaded() {
        imagesLoaded++;
        if (imagesLoaded >= 2) {
            drawTilesetImages();
        }
    }

    function drawTilesetImages() {
        if (toTilesetCanvas && fromTilesetCanvas) {
            toTSContext = toTilesetCanvas[0].getContext('2d');
            fromTSContext = fromTilesetCanvas[0].getContext('2d');

            fromTSContext.drawImage(fromTileset, 0, 0);
            toTSContext.drawImage(toTileset, 0, 0);

            toTilesetCanvas[0].addEventListener('mousemove', function (evt) {
                handleMouseOverEvent(toTilesetCanvas[0], toTSContext, evt, toTileset, 1);
            }, false);
            toTilesetCanvas[0].addEventListener('click', function (evt) {
                handleMouseClickEvent(toTilesetCanvas[0], toTSContext, evt, 1);
            });

            fromTilesetCanvas[0].addEventListener('mousemove', function (evt) {
                handleMouseOverEvent(fromTilesetCanvas[0], fromTSContext, evt, fromTileset, 0);
            }, false);
            fromTilesetCanvas[0].addEventListener('click', function (evt) {
                handleMouseClickEvent(fromTilesetCanvas[0], fromTSContext, evt, 0);
            }, false);
        }
    }

    function handleMouseOverEvent(canvas, context, event, img, toFrom) {
        var mousePos = getMousePos(canvas, event);
        redrawTilesetImage(canvas, context, img);
        var selectedTile = (toFrom === 0) ? fromTile : toTile;
        redrawSelectedTile(context, selectedTile);
        updateTileOverlay(mousePos, context);
    }

    function handleMouseClickEvent(canvas, context, event, toFrom) {
        var mousePos = getMousePos(canvas, event);
        if (toFrom === 0) {
            fromTile = mousePos;
        } else {
            toTile = mousePos;
        }
        redrawSelectedTile(context, mousePos);
    }

    function redrawTilesetImage(canvas, context, img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        updateMappedTiles();
    }

    function redrawSelectedTile(context, tilePos) {
        if (tilePos) {
            context.beginPath();
            context.rect(tilePos.x, tilePos.y, 16, 16);
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(10, 200, 10, 1)';
            context.fillStyle = 'rgba(10, 50, 10, 0.2)';
            context.fill();
            context.stroke();
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        var tileSize = com.javecross.TileUtils.getTileSize();
        var mousex = evt.clientX - rect.left;
        var mousey = evt.clientY - rect.top;

        var tilex = mousex - (mousex % tileSize);
        var tiley = mousey - (mousey % tileSize);
        return {
            x: tilex,
            y: tiley
        };
    }

    function updateTileOverlay(mousePos, context) {

        context.beginPath();
        context.rect(mousePos.x, mousePos.y, 16, 16);
        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.fillStyle = 'rgba(10, 10, 10, 0.2)';
        context.fill();
        context.stroke();
    }

    function updateMappedTiles() {
        for (var old in mappedFromTiles) {
            fromTSContext.beginPath();
            fromTSContext.rect(mappedFromTiles[old].x, mappedFromTiles[old].y, 16, 16);
            fromTSContext.lineWidth = 2;
            fromTSContext.strokeStyle = 'black';
            fromTSContext.fillStyle = 'rgba(10, 10, 10, 0.7)';
            fromTSContext.fill();
            fromTSContext.stroke();
        }
        for (var newTile in mappedToTiles) {
            toTSContext.beginPath();
            toTSContext.rect(mappedToTiles[newTile].x, mappedToTiles[newTile].y, 16, 16);
            toTSContext.lineWidth = 2;
            toTSContext.strokeStyle = 'black';
            toTSContext.fillStyle = 'rgba(10, 10, 10, 0.7)';
            toTSContext.fill();
            toTSContext.stroke();
        }
    }

    function confirmMappingAction() {
        if (fromTile && toTile) {
            var oldTile = com.javecross.TileUtils.convertXyToTileId(fromTile.x, fromTile.y);
            var newTile = com.javecross.TileUtils.convertXyToTileId(toTile.x, toTile.y);

            mappedTilesCount++;
            mappedTiles[oldTile] = newTile;
            mappedFromTiles.push(fromTile);
            mappedToTiles.push(toTile);
            
            fromTile = null;
            toTile = null;

            redrawTilesetImage(fromTilesetCanvas[0], fromTSContext, fromTileset);
            redrawTilesetImage(toTilesetCanvas[0], toTSContext, toTileset);

        } else {
            console.log("Both from and to tile need to be set!");
        }
    }

    return {
        setupTilesetImages: function () {
            setupTilesetImages();
        },
        confirmMappingAction: function () {
            confirmMappingAction();
        },
        completeMapping: function () {
            var mapperObj = {};
            mapperObj.mappedTiles = mappedTiles;
            mapperObj.mappedTilesCount = mappedTilesCount;

            var mappedTileArrays = {};
            mappedTileArrays.toTiles = mappedToTiles;
            mappedTileArrays.fromTiles = mappedFromTiles;
            mapperObj.mappedTileArrays = mappedTileArrays;


            return JSON.stringify(mapperObj);
        },
        initialize: function () {
            initialize(null);
        },
        loadMappingParams: function (params) {
            initialize(params);
        }
    };
}();


$(document).ready(function () {
    var tilesetMapper = com.javecross.TilesetMapper;
    tilesetMapper.initialize();
    tilesetMapper.setupTilesetImages();
    var mappingFilePath;

    $("#mapping-file").change(function (event) {
        mappingFilePath = URL.createObjectURL(event.target.files[0]);

        var fr = new FileReader();
        fr.onload = function (data) {
            var loadedParams = JSON.parse(data.target.result);
            tilesetMapper.loadMappingParams(loadedParams);
        };
        fr.readAsText(event.target.files[0]);
    });
    $("#save-mapping").on('click', function () {
        var link = $("<a>");
        var str = 'data:text/plain;charset=utf-8,' + encodeURIComponent(tilesetMapper.completeMapping());
        link.attr('download', 'tileset-mapping.json');
        link.attr('href', str);
        link.css('display', 'none');
        $("#input-container").append(link);
        link[0].click();
        link.remove();
    });
    $("#confirm-mapping").on('click', function () {
        tilesetMapper.confirmMappingAction();
    });
    $("#complete-mapping").on('click', function () {
        console.log(tilesetMapper.completeMapping());
    });
});