import { existsSync } from "node:fs";
import { join } from "node:path";

/** Скан задания лежит в public/zadanie.jpg; пока файла нет, показываем инструкцию. */
export function hasAssignmentPhoto(): boolean {
  return existsSync(join(process.cwd(), "public", "zadanie.jpg"));
}
