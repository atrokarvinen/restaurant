/*
  Warnings:

  - You are about to alter the column `name` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20);
