// La fuente SCSS usa sintaxis compatible con CSS; este paso sincroniza ambos archivos.
import { copyFile } from 'node:fs/promises';
await copyFile(new URL('./styles.scss', import.meta.url), new URL('./styles.css', import.meta.url));
console.log('Estilos actualizados.');
