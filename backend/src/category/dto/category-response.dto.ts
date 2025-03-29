import { Category } from '../entities/category.entity';

export class CategoryReponseDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domainCategory: Category | null) {
    if (domainCategory === null) return null;

    return new CategoryReponseDto(domainCategory.id, domainCategory.name);
  }
}
