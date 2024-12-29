/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiverNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `senderNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountNumber_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropIndex
DROP INDEX "Account_accountNumber_key";

-- DropIndex
DROP INDEX "Transaction_accountNumber_idx";

-- DropIndex
DROP INDEX "Transaction_receiverNumber_idx";

-- DropIndex
DROP INDEX "Transaction_senderNumber_idx";

-- DropIndex
DROP INDEX "Transaction_userId_idx";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("accountNumber");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accountNumber",
DROP COLUMN "receiverNumber",
DROP COLUMN "senderNumber",
DROP COLUMN "userId",
ADD COLUMN     "receiverAccountNumber" TEXT NOT NULL,
ADD COLUMN     "receiverUserId" INTEGER,
ADD COLUMN     "senderAccountNumber" TEXT NOT NULL,
ADD COLUMN     "senderUserId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_senderUserId_idx" ON "Transaction"("senderUserId");

-- CreateIndex
CREATE INDEX "Transaction_receiverUserId_idx" ON "Transaction"("receiverUserId");

-- CreateIndex
CREATE INDEX "Transaction_senderAccountNumber_idx" ON "Transaction"("senderAccountNumber");

-- CreateIndex
CREATE INDEX "Transaction_receiverAccountNumber_idx" ON "Transaction"("receiverAccountNumber");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderAccountNumber_fkey" FOREIGN KEY ("senderAccountNumber") REFERENCES "Account"("accountNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverAccountNumber_fkey" FOREIGN KEY ("receiverAccountNumber") REFERENCES "Account"("accountNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
