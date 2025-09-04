import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export function createFile(filePath: string, content: string): void {
  const dir = join(filePath, "..");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, content);
}

export function createDirectory(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}
