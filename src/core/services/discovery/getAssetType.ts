/**
 * getAssetType - Returns the type of the asset.
 */

export const getAssetType = function(pathToAsset: string) {
    if (pathToAsset.startsWith("src/templates")) return "template";
    if (pathToAsset.startsWith("src/includes")) return "include";
    if (pathToAsset.startsWith("src/pages")) return "page";
    if (pathToAsset.startsWith("src/data")) return "data";
    if (pathToAsset.startsWith("src/components")) return "component";
    if (pathToAsset.startsWith("src/css")) return "css";
    return "*";
};
