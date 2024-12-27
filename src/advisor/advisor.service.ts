import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advisor, Company, Investor } from './advisor.entity';

@Injectable()
export class AdvisorService {
  constructor(
    @InjectRepository(Advisor)
    private readonly advisorRepository: Repository<Advisor>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Investor)
    private readonly investorRepository: Repository<Investor>,
  ) {}

  // Create a new advisor
  async createAdvisor(advisorData: Partial<Advisor>): Promise<Advisor> {
    const advisor = this.advisorRepository.create(advisorData);
    return this.advisorRepository.save(advisor);
  }

  async login(email: string, password: string): Promise<{ message: string; advisor: Advisor }> {
    const advisor = await this.advisorRepository.findOneBy({ email });

    if (!advisor) {
      throw new NotFoundException('Advisor not found');
    }
    const isPasswordValid = password === advisor.password; // Use this for plaintext passwords

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      message: 'Login successful',
      advisor,
    };
  }

  // Get all advisors
  async findAllAdvisors(): Promise<Advisor[]> {
    return this.advisorRepository.find({ relations: ['companies', 'investors'] });
  }

  // Get an advisor by ID
  async findAdvisorById(id: number): Promise<Advisor> {
    const advisor = await this.advisorRepository.findOne({
      where: { id },
      relations: ['companies', 'investors'],
    });

    if (!advisor) {
      throw new NotFoundException('Advisor not found');
    }

    return advisor;
  }

  // Add a company to an advisor
  async addCompanyToAdvisor(advisorId: number, companyData: Partial<Company>): Promise<Company> {
    const advisor = await this.findAdvisorById(advisorId);

    const company = this.companyRepository.create({
      ...companyData,
      advisor,
    });

    return this.companyRepository.save(company);
  }

  // Add an investor to an advisor
  async addInvestorToAdvisor(advisorId: number, investorData: Partial<Investor>): Promise<Investor> {
    const advisor = await this.findAdvisorById(advisorId);

    const investor = this.investorRepository.create({
      ...investorData,
      advisor,
    });

    return this.investorRepository.save(investor);
  }

  // Get all companies linked to an advisor
  async findCompaniesByAdvisor(advisorId: number): Promise<Company[]> {
    const advisor = await this.findAdvisorById(advisorId);
    return advisor.companies;
  }

  // Get all investors linked to an advisor
  async findInvestorsByAdvisor(advisorId: number): Promise<Investor[]> {
    const advisor = await this.findAdvisorById(advisorId);
    return advisor.investors;
  }

  // Delete an advisor by ID
  async deleteAdvisor(id: number): Promise<void> {
    const result = await this.advisorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Advisor not found');
    }
  }
}
