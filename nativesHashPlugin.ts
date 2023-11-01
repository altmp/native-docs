import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Plugin } from 'vite';

function hashFile(filePath: string): string {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
}

const nativeHashPlugin: () => Plugin = () => {
  return {
    name: 'native-hash-plugin',
    configureServer(server) {
      const nativesFilePath = path.resolve(process.cwd(), 'data/natives.json');

      server.middlewares.use('/version.json', (req, res, next) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            hash: hashFile(nativesFilePath)
        }, null, 2));
      });

      server.middlewares.use('/natives.json', (req, res, next) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        fs.createReadStream(nativesFilePath).pipe(res);
      });
    },
    
    writeBundle() {
      const nativesFilePath = path.resolve(process.cwd(), 'data/natives.json');
      const distDir = path.resolve(process.cwd(), 'dist');
      const hash = hashFile(nativesFilePath);
      const versionData = {
        hash,
      };

      // Copy natives.json to dist during build
      fs.copyFileSync(nativesFilePath, path.join(distDir, 'natives.json'));

      fs.writeFileSync(
        path.join(distDir, 'version.json'),
        JSON.stringify(versionData, null, 2)
      );
    },
  };
};

export default nativeHashPlugin;
