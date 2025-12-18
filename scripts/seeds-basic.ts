import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';
import { BookSeeder } from './seeders/book.seeder';
import { UserSeeder } from './seeders/user.seeder';

async function main() {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);

    const userSeeder = new UserSeeder(userRepository);
    const bookSeeder = new BookSeeder(bookRepository);

    await userSeeder.seed();
    await bookSeeder.seed();
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
