/*
  Warnings:

  - A unique constraint covering the columns `[share]` on the table `Code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Code_share_key" ON "Code"("share");
