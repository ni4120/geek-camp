-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('WAITING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sharedUrl" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'WAITING',

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_hostId_key" ON "Rooms"("hostId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
