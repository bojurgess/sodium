import { join } from 'path';
import { readdirSync } from 'fs';
import { client } from '../client';

export const handle = async (): Promise<void> => {
    const dir = new URL('../events', import.meta.url).pathname;
    const files = readdirSync(dir).filter((file: string) =>
        file.endsWith('.ts')
    );

    let count = 0;

    for (const file of files) {
        const path = join(dir, file);
        const { default: event } = await import(path);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        count++;
    }

    console.info(`Initialised ${count} events.`);
};
