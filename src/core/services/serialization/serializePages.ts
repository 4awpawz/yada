/**
 * serializePage - Serialize every template's content except for those that are
* collection generators and return the total number of pages serialized.
 */

import { join } from "path";
import { _writeContentToFile } from "../../lib/io/_writeContentToFile.js";
import { _filter } from "../../lib/functional.js";
import { getConfiguration } from "./../configuration/getConfiguration.js";
import type { Assets } from "../../../types/types";
import { _remove } from "../../lib/io/_remove.js";

export const serializePages = async function(assets: Assets): Promise<number> {
    const buildFolderPath = join(process.cwd(), (await getConfiguration()).buildFolder);
    _remove(buildFolderPath);
    const templateAssets: Assets = _filter(assets, asset => asset.assetType === "template" && !asset.fm?.data["isCollection"]);
    let count = 0;
    for (const asset of templateAssets) {
        const outputPath = join(buildFolderPath, asset.htmlDocumentName as string);
        if (typeof asset.content === "undefined") continue;
        await _writeContentToFile(outputPath, asset.content);
        count++;
    }
    return count;
};
