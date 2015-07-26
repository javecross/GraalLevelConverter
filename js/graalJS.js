/**
 * Initialize namespace
 *
 * @author Jave L. Cross
 */
"use strict";
var com;
if (!com) {
    com = {};
}

if (!com.javecross) {
    com.javecross = {};
}

com.javecross.RootFunctions = function () {

    var tilesetParser;

    function logInvalidObject(rootError, err) {
        if (!rootError) {
            rootError = "";
        }
        rootError += (" " + err + " ");
        return rootError;
    }
    function validateObjectMap(objectMap) {
        var errorMsg;

        if (!com.javecross.TilesetParser) {
            logInvalidObject(errorMsg, "Tileset parser is not yet defined.");
        }
        if (!com.javecross.TileUtils) {
            logInvalidObject(errorMsg, "Tile Utils are not yet defined.");
        }
        if (!objectMap.originalTileset) {
            logInvalidObject(errorMsg, "Original tileset input not yet defined.");
        }
        if (!objectMap.parseTilesetButton) {
            logInvalidObject(errorMsg, "Parse tileset button not yet defined.");
        }
        if (!objectMap.pageContainer) {
            logInvalidObject(errorMsg, "Page container is not defined.");
        }
        return errorMsg;
    }

    function initializeObjectInputs(objectMap) {
        tilesetParser.setOriginalTilesetInput(objectMap.originalTileset);
        tilesetParser.setPageContainer(objectMap.pageContainer);
    }

    function initializeObjectFunctionality(objectMap) {
        (objectMap.parseTilesetButton).on('click', function () {
            tilesetParser.createTilesetHashMap();
        });
    }

    function initialize(objectMap) {
        var valid = validateObjectMap(objectMap);

        if (valid) {
            throw new Error(valid);
        }
        tilesetParser = com.javecross.TilesetParser;

        initializeObjectInputs(objectMap);
        initializeObjectFunctionality(objectMap);

        console.log("Initialized!");
    }

    return {
        initialize: function (objectMap) {
            initialize(objectMap);
        }
    };
}();

$(document).ready(function () {
    var pageObjects = {
        "pageContainer": $("#page-container"),
        "originalTileset": $("#original-tileset-input"),
        "newTileset": $("#new-tileset-input"),
        "parseTilesetButton": $("#tileset-parser")
    };

    try {
        com.javecross.RootFunctions.initialize(pageObjects);
    } catch (error) {
        alert("Unable to initialize graal converter. " + error);
    }
});
