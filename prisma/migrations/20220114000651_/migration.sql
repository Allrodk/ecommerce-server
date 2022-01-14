/*
  Warnings:

  - Added the required column `screen` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plano" ADD COLUMN     "screen" INTEGER NOT NULL;
