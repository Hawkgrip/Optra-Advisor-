import { Controller, Post, Get, Body, Delete } from '@nestjs/common';
import { AdvisorService } from './advisor.service';
import { Advisor, Company, Investor } from './advisor.entity';

@Controller('advisors')
export class AdvisorController {
  constructor(private readonly advisorService: AdvisorService) {}


  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ): Promise<{ message: string; advisor: Advisor }> {
    return this.advisorService.login(data.email, data.password);
  }
  
  @Post()
  async createAdvisor(@Body() advisorData: Partial<Advisor>): Promise<Advisor> {
    return this.advisorService.createAdvisor(advisorData);
  }

  /**
   * Get all advisors
   */
  @Get()
  async getAllAdvisors(): Promise<Advisor[]> {
    return this.advisorService.findAllAdvisors();
  }

  /**
   * Get an advisor by ID
   * @param data - Request body containing advisor ID
   */
  @Post('find')
  async getAdvisorById(@Body() data: { id: number }): Promise<Advisor> {
    return this.advisorService.findAdvisorById(data.id);
  }

  /**
   * Add a new company linked to an advisor
   * @param data - Request body containing advisor ID and company data
   */
  @Post('add-company')
  async addCompany(
    @Body() data: { advisorId: number; companyData: Partial<Company> },
  ): Promise<Company> {
    const { advisorId, companyData } = data;
    return this.advisorService.addCompanyToAdvisor(advisorId, companyData);
  }

  /**
   * Add a new investor linked to an advisor
   * @param data - Request body containing advisor ID and investor data
   */
  @Post('add-investor')
  async addInvestor(
    @Body() data: { advisorId: number; investorData: Partial<Investor> },
  ): Promise<Investor> {
    const { advisorId, investorData } = data;
    return this.advisorService.addInvestorToAdvisor(advisorId, investorData);
  }

  /**
   * Get all companies linked to an advisor
   * @param data - Request body containing advisor ID
   */
  @Post('get-companies')
  async getCompaniesByAdvisor(@Body() data: { advisorId: number }): Promise<Company[]> {
    return this.advisorService.findCompaniesByAdvisor(data.advisorId);
  }

  /**
   * Get all investors linked to an advisor
   * @param data - Request body containing advisor ID
   */
  @Post('get-investors')
  async getInvestorsByAdvisor(@Body() data: { advisorId: number }): Promise<Investor[]> {
    return this.advisorService.findInvestorsByAdvisor(data.advisorId);
  }

  /**
   * Delete an advisor by ID
   * @param data - Request body containing advisor ID
   */
  @Delete()
  async deleteAdvisor(@Body() data: { id: number }): Promise<void> {
    return this.advisorService.deleteAdvisor(data.id);
  }
}
