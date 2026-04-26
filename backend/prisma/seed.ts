import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.category.upsert({
    where: { name: 'Eletrônicos' },
    update: {},
    create: { name: 'Eletrônicos' },
  });

  await prisma.category.upsert({
    where: { name: 'Informática' },
    update: {},
    create: { name: 'Informática' },
  });

  await prisma.category.upsert({
    where: { name: 'Periféricos' },
    update: {},
    create: { name: 'Periféricos' },
  });

  await prisma.category.upsert({
    where: { name: 'Móveis' },
    update: {},
    create: { name: 'Móveis' },
  });

}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });