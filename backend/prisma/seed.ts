// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed do banco de dados...');

  const adminEmail = 'admin@investsim.com';
  const adminPassword = await bcrypt.hash('admin123', 10); // Senha padrão criptografada

  // O upsert procura pelo email. Se achar, não faz nada (update: {}). Se não achar, cria.
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Administrador do Sistema',
      email: adminEmail,
      password: adminPassword,
    },
  });

  console.log(`Admin criado/verificado com sucesso!`);
  console.log(`Email: ${admin.email}`);
  console.log(`Senha: admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });