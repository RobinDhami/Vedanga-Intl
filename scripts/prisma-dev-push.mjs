import { execFileSync } from "node:child_process";

if (process.env.NODE_ENV === "production") {
  throw new Error("Refusing Prisma development setup while NODE_ENV=production.");
}

const databaseUrl = process.env.DATABASE_URL || "";
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required. Configure a separate development MySQL secret first.");
}

let databaseName = "";
try {
  databaseName = decodeURIComponent(new URL(databaseUrl).pathname.replace(/^\//, ""));
} catch {
  throw new Error("DATABASE_URL is not a valid MySQL connection URL.");
}

if (!/(^|[_-])dev(elopment)?([_-]|$)/i.test(databaseName)) {
  throw new Error(
    `Refusing to run against database '${databaseName}'. The database name must identify a development database (for example vedanga_dev).`,
  );
}

console.log(`Applying the existing Prisma db-push workflow to development database '${databaseName}'.`);
execFileSync(process.platform === "win32" ? "npx.cmd" : "npx", ["prisma", "db", "push"], {
  stdio: "inherit",
});
