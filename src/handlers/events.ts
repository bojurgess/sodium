import { join } from 'path';
import { readdirSync } from 'fs';
import { client } from '../client';

const dir = join(__dirname, 'events');
const files = readdirSync(dir).filter((file: string) => file.endsWith('.ts'));

for (const file of files) {
    const path = join(dir, file);
    const event = await import(path);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
