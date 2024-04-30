export default function checkEnv(args?: string[]) {
    // args = optional env to check for
    args = args || [];
    const requiredEnv = [...args, 'DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];
    const missingEnv = requiredEnv.filter((env) => !process.env[env]);

    if (missingEnv.length) {
        console.error(
            `Missing required environment variables: ${missingEnv.join(
                ', '
            )}, exiting...`
        );
        process.exit(1);
    }
}
