interface EnvironmentVariables {
    port: number;
    isDev: boolean;
    islocalDeploy: boolean;
    client: {
        cientAppLocakUrl: string;
        clientAppUrl: string;
    },
    db: {
        host: string;
        port: number;
        user: string;
        password: string;
    }
}

const env = process.env;

// TODO
export default (): EnvironmentVariables => {
    return ({
        port: parseInt(env.PORT ?? '3000', 10),
        isDev: env.IS_DEV === 'true',
        islocalDeploy: env.IS_LOCAL_NETWORK_DEPLOY === 'true',
        client: {
            cientAppLocakUrl: env.CLIENT_APP_LOCAL_NETWORK_URL ?? 'http://localhost:3000',
            clientAppUrl: env.CLIENT_APP_URL ?? '',
        },
        db: {
            host: env.DB_HOST || 'localhost',
            port: parseInt(env.DB_PORT ?? '5432', 10) || 5432,
            user: env.DB_USER || 'postgres',
            password: env.DB_PASSWORD || 'password',
        }
    });
};