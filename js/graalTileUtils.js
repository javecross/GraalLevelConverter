"use strict";
if (!com.javecross) {
    throw new Error("Namespace not yet defined!");
}

com.javecross.TileUtils = function () {

    var PATTERN = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ];

    var CHUNK_WIDTH = 16;
    var CHUNK_HEIGHT = 4;
    var SQUARE = 8;
    var TILE_SIZE = 16;

    var CHUNK_HORIZ_OFFSET = (CHUNK_WIDTH * TILE_SIZE);
    var CHUNK_VERT_OFFSET = (CHUNK_HEIGHT * TILE_SIZE);

    function convertTileIdToXy(tileId) {
        var chars = tileId.split('');

        var indexOne = (PATTERN.indexOf(chars[0]));
        var indexTwo = (PATTERN.indexOf(chars[1]));

        var column = Math.floor(indexOne / SQUARE);
        var row = indexOne % SQUARE;


        var subsetRow = Math.floor(indexTwo / CHUNK_WIDTH);
        var subsetColumn = indexTwo % CHUNK_WIDTH;

        var x = (column * CHUNK_HORIZ_OFFSET);
        x += (subsetColumn * TILE_SIZE);
        var y = (row * CHUNK_VERT_OFFSET);
        y += (subsetRow * TILE_SIZE);

        return [x, y];
    }

    function convertXyToTileId(x, y) {
        var tilePosX = x / TILE_SIZE;
        var tilePosY = y / TILE_SIZE;
        var chunkX = Math.floor(tilePosX / CHUNK_WIDTH);
        var chunkY = Math.floor(tilePosY / CHUNK_HEIGHT);
        var chunkIndex = (chunkX * SQUARE) + chunkY;

        var modSubX = (chunkX === 0) ? CHUNK_WIDTH : (chunkX * CHUNK_WIDTH);
        var modSubY = (chunkY === 0) ? CHUNK_HEIGHT : (chunkY * CHUNK_HEIGHT);
        var subTileX = tilePosX % modSubX;
        var subTileY = tilePosY % modSubY;

        var subIndex = (subTileX) + (subTileY * CHUNK_WIDTH);
        var tileId = PATTERN[chunkIndex] + "" + PATTERN[subIndex];
        return tileId;
    }

    return {
        convertTileIdToXy: function (tileId) {
            return convertTileIdToXy(tileId);
        },
        convertXyToTileId: function (x, y) {
            return convertXyToTileId(x, y);
        },
        getTileSize: function () {
            return TILE_SIZE;
        }
    };
}();