import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function experiencePdfPlugin(): Plugin {
  return {
    name: 'experience-pdf-resolver',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url) {
          const pathname = req.url.split('?')[0];
          if (pathname === '/assets/experience/LabMentix_Offer_Letter.pdf') {
            const filePath = path.resolve(__dirname, 'public/assets/experience/LabMentix_Offer_Letter.pdf.pdf');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', 'inline; filename="LabMentix_Offer_Letter.pdf"');
              return fs.createReadStream(filePath).pipe(res);
            }
          } else if (pathname === '/assets/experience/LabMentix_Certificate.pdf') {
            const filePath = path.resolve(__dirname, 'public/assets/experience/LabMentix_Certificate.pdf.pdf');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', 'inline; filename="LabMentix_Certificate.pdf"');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
        }
        next();
      });
    },
    closeBundle() {
      const distOffer = path.resolve(__dirname, 'dist/assets/experience/LabMentix_Offer_Letter.pdf');
      const distOfferSrc = path.resolve(__dirname, 'dist/assets/experience/LabMentix_Offer_Letter.pdf.pdf');
      if (fs.existsSync(distOfferSrc) && !fs.existsSync(distOffer)) {
        try {
          fs.copyFileSync(distOfferSrc, distOffer);
        } catch {
          // ignore if already present
        }
      }
      const distCert = path.resolve(__dirname, 'dist/assets/experience/LabMentix_Certificate.pdf');
      const distCertSrc = path.resolve(__dirname, 'dist/assets/experience/LabMentix_Certificate.pdf.pdf');
      if (fs.existsSync(distCertSrc) && !fs.existsSync(distCert)) {
        try {
          fs.copyFileSync(distCertSrc, distCert);
        } catch {
          // ignore if already present
        }
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), experiencePdfPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
