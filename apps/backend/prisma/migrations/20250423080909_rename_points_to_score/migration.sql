/*
  Warnings:

  - You are about to drop the column `points` on the `Score` table. All the data in the column will be lost.
  - Added the required column `score` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "points",
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;
