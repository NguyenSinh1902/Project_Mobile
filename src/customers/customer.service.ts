import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService, // Inject JwtService để tạo token
  ) {}

  async createCustomer(
    name: string,
    email: string,
    phone_number: string,
    password: string,
  ): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = this.customerRepository.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });
    return await this.customerRepository.save(customer);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });
    if (!customer) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    return isMatch;
  }

  // Phương thức tạo token khi đăng nhập thành công
  async generateJwtToken(customer: Customer) {
    const payload = { customer_id: customer.customer_id, name: customer.name };
    return this.jwtService.sign(payload); // Tạo JWT token
  }

  // Tìm khách hàng theo email để lấy thông tin khi login
  async findByEmail(email: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { email },
    });
  }
}
