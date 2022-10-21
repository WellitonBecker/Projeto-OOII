-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_usuarios" ("codigo", "created_at", "email", "login", "nome", "senha", "updated_at") SELECT "codigo", "created_at", "email", "login", "nome", "senha", "updated_at" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE UNIQUE INDEX "usuarios_login_key" ON "usuarios"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
