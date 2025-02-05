/**
 * composeIncludes - Compose with include assets.
 */

import { join } from "path";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { _find } from "../../../lib/functional.js";
import { config } from "../../configuration/configuration.js";
import type { Asset, Assets, IncludeMatchesResults } from "../../../../types/types";
// import chalk from "chalk";
import { getMatchingTokens } from "../../../lib/getMatchingTokens.js";

const getListOfIncludesFromAsset = function(assetContent: string): IncludeMatchesResults {
    const matches = getMatchingTokens(assetContent, "twoBraces");
    return matches.map(match => ({ matched: match[0] as string, fileName: match[2] as string })) as IncludeMatchesResults;
};

export const composeIncludes = async function(asset: Asset, assets: Assets): Promise<Asset> {
    if (typeof asset.content === "undefined") return asset;
    const srcFolder = config.srcFolder;
    const matcherResults = getListOfIncludesFromAsset(asset.content);
    if (matcherResults.length === 0) return asset;
    for (const matchResult of matcherResults) {
        const pathToInclude = join(`${srcFolder}`, "includes", matchResult.fileName);
        const foundInclude: Asset | undefined = _find(assets, _asset =>
            _asset.assetType === "include" && (_asset.filePath === `${pathToInclude}.html` || _asset.filePath === `${pathToInclude}.md`));
        if (typeof foundInclude === "undefined") {
            // Defer reporting of unresolved includes to tokenization.
            continue;
        }
        const token = matchResult.matched;
        asset.content = findAndReplaceTokenContent(asset.content, token, foundInclude.content as string);
    }
    return asset;
};
