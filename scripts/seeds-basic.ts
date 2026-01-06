import 'reflect-metadata';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';
import { BookSeeder } from './seeders/book.seeder';
import { UserSeeder } from './seeders/user.seeder';
import { Loan } from 'src/entities/loan.entity';
import { LoanSeeder } from './seeders/loan.seeder';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('📦 Banco de dados conectado!');

    // --- BLOCO DE LIMPEZA ---
    console.log('🧹 Limpando dados existentes...');
    // Ordem recomendada: limpe as tabelas que possuem FKs primeiro ou use CASCADE
    await AppDataSource.query(
      'TRUNCATE TABLE "loan", "book", "user" RESTART IDENTITY CASCADE',
    );
    console.log('✅ Banco limpo com sucesso!');

    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);
    const loanRepository = AppDataSource.getRepository(Loan);

    const userSeeder = new UserSeeder(userRepository);
    const bookSeeder = new BookSeeder(bookRepository);
    const loanSeeder = new LoanSeeder(
      loanRepository,
      await userSeeder.seed(),
      await bookSeeder.seed(),
    );

    await loanSeeder.seed();
  } catch (error) {
    console.error('Erro nos seeds, ', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((error) => {
  console.error('Erro nos seeds: ', error);
  process.exit(1);
});
