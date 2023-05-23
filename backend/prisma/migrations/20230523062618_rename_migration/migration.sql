/*
  Warnings:

  - Added the required column `share` to the `Code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Code" ADD COLUMN     "language" VARCHAR(8) NOT NULL DEFAULT 'js',
ADD COLUMN     "share" VARCHAR(256) NOT NULL,
ADD COLUMN     "title" VARCHAR(64) NOT NULL DEFAULT 'untitled';
