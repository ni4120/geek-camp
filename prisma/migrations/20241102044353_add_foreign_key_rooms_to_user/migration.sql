/*
  Warnings:

  - A unique constraint covering the columns `[hostId]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hostId` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "hostId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_hostId_key" ON "Rooms"("hostId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
