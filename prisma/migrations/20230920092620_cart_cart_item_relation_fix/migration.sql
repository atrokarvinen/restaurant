/*
  Warnings:

  - You are about to drop the column `cartItemId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_cartItemId_fkey";

-- DropIndex
DROP INDEX "Cart_cartItemId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "cartItemId";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
