import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    
    console.log('PrismaService - DATABASE_URL:', databaseUrl?.replace(/:[^:@]+@/, ':****@'));
    console.log('PrismaService - DATABASE_URL type:', typeof databaseUrl);
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Créer un pool pg manuellement pour éviter les problèmes de parsing
    const url = String(databaseUrl).trim();
    const pool = new Pool({ 
      connectionString: url,
      ssl: false, // Désactiver SSL pour le développement local
    });
    
    const adapter = new PrismaPg(pool);
    super({ adapter });
    
    // Assigner après super() pour pouvoir l'utiliser dans onModuleDestroy
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
