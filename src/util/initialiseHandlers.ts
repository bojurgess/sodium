import { join } from 'path';
import { readdirSync } from 'fs';

export const initialiseHandlers = async () => {
    const dir = new URL('../handlers', import.meta.url).pathname;
    const files = readdirSync(dir).filter((file) => file.endsWith('.ts'));
    for (const file of files) {
        const path = join(dir, file);
        const { handle } = await import(path);

        if (handle) {
            await handle();
        } else {
            console.warn(
                `Handler at ${path} is missing a handler function. Skipping...`
            );
        }
    }
};
