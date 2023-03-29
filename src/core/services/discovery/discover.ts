/**
 * getAssets - Creates assets for files found in user's src
 * that participates in page compostion. Resolves to an array of assets.
 */

import { join, parse } from "path";
import matter from "gray-matter";
import { markdownToHTML } from "../../lib/markdownToHTML.js";
import { _readFile } from "../../lib/io/_readFile.js";
import { fileModifiedTime } from "../../lib/io/fileModifiedTime.js";
import { getFiles } from "./getFiles.js";
import { getAssetType } from "./getAssetType.js";
import type { Asset, Assets, PostProfile } from "../../../types/types";
import * as metrics from "../../lib/metrics.js";
import { normalizeOutPath } from "./normalizeOutPath.js";
import { getPostOutPath } from "./getPostOutPath.js";
import { getCategoriesPath } from "./getCategoriesPath.js";
import { isPost } from "./isPost.js";
import chalk from "chalk";
import { getConfiguration } from "../configuration/getConfiguration.js";

const templateIsWIP = function(wips: string[], templatePath: string) {
    return wips.includes(templatePath);
};

export const discover = async function(): Promise<Assets> {
    metrics.startTimer("discovery");
    const config = await getConfiguration();
    const pathsToAssets = await getFiles();
    const assets = await Promise.all(pathsToAssets.map(async (assetPath: string) => {
        const fileInfo = parse(assetPath);
        const filePath = assetPath;
        const fileType = fileInfo.ext;
        const timestamp = await fileModifiedTime(assetPath);
        const assetType = getAssetType(assetPath);
        const fileName = fileInfo.name;
        const asset: Asset = {
            timestamp,
            assetType,
            filePath,
            fileType,
        };
        // Assets that represent data and components files do not include their content.
        asset.isPost = false;
        if (["data", "component"].includes(assetType)) return asset;
        const buffer = await _readFile(assetPath);
        if (typeof buffer === "undefined") return asset;
        try {
            asset.fm = matter(buffer, { excerpt: true });
        } catch (error) {
            console.log(chalk.red(`there was an error: Can't compile front matter in ${asset.filePath}.`));
            throw error;
        }
        asset.content = fileType === ".md" ? markdownToHTML(asset.fm.content) : asset.fm.content;
        if (asset.assetType !== "template") return asset;

        // -- At this point asset is a template! --

        const wips = config.userConfig.wips;
        asset.isWip = templateIsWIP(wips, asset.filePath);
        const page: string | undefined = asset.fm.data["page"];
        asset.associatedPage = (typeof page === "string" && page.length !== 0) && `src/pages/${page}.html` || "";
        asset.isPost = await isPost(assetPath);
        const postProfile = asset.isPost ? asset.fm.data["post"] as PostProfile : undefined;
        const postCategoriesPath = asset.isPost && typeof postProfile !== "undefined" ? getCategoriesPath(postProfile.categories) : undefined;
        const oPath = asset.isPost && fileInfo.name !== "index" ?
            await getPostOutPath(asset.filePath, postCategoriesPath) : normalizeOutPath(fileInfo.dir);
        if (typeof oPath === "undefined") return asset;
        const postNamePath = asset.isPost ? join(oPath, parse(filePath.split("-").pop() as string).name, "index.html") : "";
        const oName = asset.isPost && postNamePath || fileName.endsWith("index") ? "index.html" : fileName + "/index.html";
        asset.htmlDocumentName = asset.isPost ? postNamePath : join(oPath, oName);
        asset.url = parse(asset.htmlDocumentName).dir + "/";
        return asset;
    }));
    metrics.stopTimer("discovery");
    return assets;
};
