import { fakerPT_BR as faker } from '@faker-js/faker';
import { Author } from 'src/entities/author.entity';
import { Repository } from 'typeorm';

export class AuthorSeeder {
  constructor(private readonly authorRepository: Repository<Author>) {}

  async seed(): Promise<Author[]> {
    const authors: Author[] = [];
    const bio = 'Seeder Author';
    const refDate = new Date().setFullYear(2003);

    for (let i = 0; i < 10; i++) {
      const fromBoundaryDate = faker.date.past({ refDate, years: 50 });
      const toBoundaryDate = faker.date.past({ refDate, years: 50 });

      const partialAuthor: Partial<Author> = {
        name: faker.person.fullName(),
        bio,
        birthDate: faker.date.between({
          from: fromBoundaryDate,
          to: toBoundaryDate,
        }),
      };

      const author = this.authorRepository.create(partialAuthor);
      authors.push(author);
    }

    await this.authorRepository.save(authors);
    return authors;
  }
}
