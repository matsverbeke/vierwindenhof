import { existsSync, mkdirSync, rmSync } from "fs";
import { cp } from "fs/promises";
import path from "path";

const src = path.resolve("studio", "dist");
const dest = path.resolve("dist", "admin");

async function main() {
  if (!existsSync(src)) {
    console.error(
      "studio/dist not found. Ensure the Studio build ran successfully.",
    );
    process.exit(1);
  }

  mkdirSync(path.dirname(dest), { recursive: true });

  if (existsSync(dest)) {
    rmSync(dest, { recursive: true, force: true });
  }

  await cp(src, dest, { recursive: true });
  console.log("Copied studio/dist to dist/admin");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
