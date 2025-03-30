import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    type: String,
  })
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domainCategory: Category | null) {
    if (domainCategory === null) return null;

    return new CategoryResponseDto(domainCategory.id, domainCategory.name);
  }
}
