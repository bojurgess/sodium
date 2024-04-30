import { parseArgs } from 'util';

export default function checkArgs() {
    const args = new Map();

    const { values } = parseArgs({
        args: Bun.argv,
        options: {
            register_commands: {
                type: 'boolean',
            },
        },
        strict: true,
        allowPositionals: true,
    });

    Object.entries(values).forEach(([key, value]) => {
        args.set(key, value);
    });

    return args;
}
