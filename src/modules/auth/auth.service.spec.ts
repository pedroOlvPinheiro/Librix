import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));
describe('AuthService', () => {
  let service: AuthService;

  // Criamos "dublês" vazios para as dependências
  const mockAuthRepository = {
    findOne: jest.fn(),
    exists: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Auth),
          useValue: mockAuthRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Como o signIn não usa o UserRepo diretamente, podemos deixar vazio por enquanto
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: DataSource,
          useValue: { transaction: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = { id: '1', name: 'Pedro', role: 'admin' };
  const mockAuth = {
    email: 'pedro@email.com',
    password: 'hash_da_senha',
    user: mockUser,
  };
  const loginDto = { email: 'pedro@email.com', password: '123' };

  describe('signIn', () => {
    it('Deve retornar um access_token quando as credenciais estiverem corretas', async () => {
      //Organizando dados - ARRANGE
      mockAuthRepository.findOne.mockResolvedValue(mockAuth);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('token-de-teste');

      // 2. ACT (Ação: Aqui você chama o código REAL do seu projeto)
      const result = await service.signIn({
        email: 'pedro@email.com',
        password: 'hash_da_senha',
      });

      // 3. ASSERT (Afirmação: Aqui você confere se o 'result' é o que você espera)
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('token-de-teste');
    });

    it('Deve retornar um erro Unauthorized quando auth não existir', async () => {
      //Organizando Arrange
      mockAuthRepository.findOne.mockResolvedValue(null);

      //Organizando Action
      const act = service.signIn(loginDto); //Não usa await pois espera uma exceção. o loginDto deve representar o que um usuário digitaria na tela de cadastro

      //Organizando Assert
      await expect(act).rejects.toThrow(UnauthorizedException);
    });

    it('Deve retornar um erro Unauthorized quando a senha for incorreta', async () => {
      //Organizando Arrange
      mockAuthRepository.findOne.mockResolvedValue(mockAuth);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      //Organizando Action
      const act = service.signIn(loginDto);

      //Organizando Assert
      await expect(act).rejects.toThrow(UnauthorizedException);
    });
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
