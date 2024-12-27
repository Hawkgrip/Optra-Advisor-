import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Advisor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fieldOfExpertise: string;

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  location: string;

  // Relation with Companies
  @OneToMany(() => Company, (company) => company.advisor)
  companies: Company[];

  // Relation with Investors
  @OneToMany(() => Investor, (investor) => investor.advisor)
  investors: Investor[];
}

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fundAmount: number;

  @Column({ nullable: true })
  launchDate: string;

  @Column({ nullable: true })
  investmentPeriod: string;

  // Relation to Advisor
  @ManyToOne(() => Advisor, (advisor) => advisor.companies, { nullable: false })
  advisor: Advisor;
}

@Entity()
export class Investor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  investedAmount: number;

  @Column({ nullable: true })
  investmentDate: string;

  @Column({ nullable: true })
  riskLevel: string;

  // Relation to Advisor
  @ManyToOne(() => Advisor, (advisor) => advisor.investors, { nullable: false })
  advisor: Advisor;
}
