/*
  Warnings:

  - A unique constraint covering the columns `[shareUrl]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "formColor" TEXT NOT NULL DEFAULT 'bg-gray-200';

-- CreateIndex
CREATE UNIQUE INDEX "Form_shareUrl_key" ON "Form"("shareUrl");
