import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../dtos/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'anant@gmail.com',
    },
    {
      email: 'gaurav1010@gmail.com',
    },
    {
      email: 'jain@gmail.com',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new BadRequestException();
    }
    return {
      status: 'success',
    };
  }
}
