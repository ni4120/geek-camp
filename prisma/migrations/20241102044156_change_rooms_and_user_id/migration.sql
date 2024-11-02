/*
  Warnings:

  - The primary key for the `Rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hostId` on the `Rooms` table. All the data in the column will be lost.
  - The `id` column on the `Rooms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_hostId_fkey";

-- DropIndex
DROP INDEX "Rooms_hostId_key";

-- AlterTable
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_pkey",
DROP COLUMN "hostId",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
