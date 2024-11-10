import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  async register(@Body() registerCustomerDto: RegisterCustomerDto) {
    const { name, email, phone_number, password } = registerCustomerDto;
    return await this.customerService.createCustomer(
      name,
      email,
      phone_number,
      password,
    );
  }

  @Post('login')
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    const { email, password } = loginCustomerDto;
    const isValid = await this.customerService.validatePassword(
      email,
      password,
    );
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Lấy thông tin khách hàng từ email
    const customer = await this.customerService.findByEmail(email);

    // Tạo JWT token cho khách hàng
    const token = await this.customerService.generateJwtToken(customer);

    return { message: 'Login successful', token };
  }
}
