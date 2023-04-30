-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);
