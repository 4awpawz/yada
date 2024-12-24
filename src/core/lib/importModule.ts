/**
 * importModule - dynamically import a module.
 */

import chalk from "chalk";
import { join, parse } from "path";
import type { CollectionComponent, Component, Configuration } from "../../types/types.js";

export const importModule = async function(moduleName: string, config: Configuration) {
    // Dynamic import returns promise.
    let component: Component | CollectionComponent;
    try {
        const _modulePath = join(process.cwd(), config.libFolder, moduleName);
        component = await import(_modulePath).then(module => module[parse(moduleName).name]);
    } catch (error) {
        console.error(chalk.red(`there was an error: Unable to dynamically import component module ${moduleName}`));
        throw error;
    }
    return component;
};
