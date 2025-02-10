import fs from "fs";
import path from "path";

const stylesDir = "C:/Users/n_nob/Documents/WEB 3/Client/Simple E-Commerce/src"; // Ruta principal
const outputFile = "C:/Users/n_nob/Documents/WEB 3/combined-styles.css"; // Ruta y nombre del archivo combinado

function combineCSSFiles(dir, combinedCSS = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Si es una carpeta, hacemos una llamada recursiva
      combinedCSS = combineCSSFiles(filePath, combinedCSS);
    } else if (file.endsWith(".css")) {
      // Si es un archivo CSS, leemos su contenido y lo añadimos
      combinedCSS += fs.readFileSync(filePath, "utf8") + "\n";
    }
  });

  return combinedCSS;
}

try {
  console.log("Combinando archivos CSS...");
  const combinedCSS = combineCSSFiles(stylesDir);
  fs.writeFileSync(outputFile, combinedCSS, "utf8");
  console.log(`Archivos CSS combinados en: ${outputFile}`);
} catch (error) {
  console.error("Error combinando los archivos CSS:", error);
}
