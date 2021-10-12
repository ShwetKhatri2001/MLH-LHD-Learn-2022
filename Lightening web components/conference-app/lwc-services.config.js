module.exports = {
    resources: [{ from: 'src/client/resources/', to: 'dist/resources/' }
        
        
        
            ],
        
            sourceDir: './src/client',
        
        
            devServer: {
                proxy: { '/': 'http://localhost:3002' }
            }
        
};
