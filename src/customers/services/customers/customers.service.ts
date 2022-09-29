import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../../customers/dtos/CreateCustomer.dto';
import { Customer } from '../../../customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Anant',
      email: 'anant@gmail.com',
    },
    {
      id: 2,
      name: 'Gaurav',
      email: 'gaurav@gmail.com',
    },
    {
      id: 3,
      name: 'Jain',
      email: 'jain@gmail.com',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
