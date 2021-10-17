import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default  {
  entry: './src/index.js',
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({parallel: true,})
    ],
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
  },
  resolve: {
    extensions: [".js", "json"],
  },
};