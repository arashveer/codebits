/*
  Warnings:

  - You are about to alter the column `share` on the `Code` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "share" SET DATA TYPE VARCHAR(64);
