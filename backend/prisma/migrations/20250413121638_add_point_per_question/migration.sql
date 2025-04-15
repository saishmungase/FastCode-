/*
  Warnings:

  - Added the required column `point` to the `SolvedProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SolvedProblem" ADD COLUMN     "point" INTEGER NOT NULL;
