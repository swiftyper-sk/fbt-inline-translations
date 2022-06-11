module.exports = function (api) {
    api.cache(true)

    const useESModules = process.env.BABEL_MODULE === 'es'

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    loose: true,
                    modules: useESModules ? false : 'commonjs',
                },
            ],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-proposal-class-properties'],
    }
}
