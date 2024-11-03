/*
  Warnings:

  - Added the required column `isJudgment` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "isJudgment" BOOLEAN NOT NULL;
