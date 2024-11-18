import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  async register(@Body() registerCustomerDto: RegisterCustomerDto) {
    const { name, phone_number, password } = registerCustomerDto;
    try {
      // Đăng ký khách hàng mới
      const customer = await this.customerService.createCustomer(
        name,
        phone_number,
        password,
      );
      return { message: 'Registration successful', customer };
    } catch {
      throw new HttpException(
        'Registration failed, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    const { phone_number, password } = loginCustomerDto;
    try {
      // Kiểm tra mật khẩu
      const isValid = await this.customerService.validatePassword(
        phone_number,
        password,
      );
      if (!isValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Lấy thông tin khách hàng từ số điện thoại
      const customer = await this.customerService.findByPhone(phone_number);

      // Tạo JWT token cho khách hàng
      const token = await this.customerService.generateJwtToken(customer);

      return { message: 'Login successful', token };
    } catch {
      throw new HttpException(
        'Login failed, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
