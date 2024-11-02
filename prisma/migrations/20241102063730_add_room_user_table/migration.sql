-- CreateTable
CREATE TABLE "RoomUsers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "roomId" UUID NOT NULL,

    CONSTRAINT "RoomUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomUsers_roomId_userId_key" ON "RoomUsers"("roomId", "userId");

-- AddForeignKey
ALTER TABLE "RoomUsers" ADD CONSTRAINT "RoomUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUsers" ADD CONSTRAINT "RoomUsers_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
