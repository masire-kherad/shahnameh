import { Category } from './db';

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>();
  const roots: CategoryNode[] = [];

  categories.forEach(category => {
    map.set(category.id, { ...category, children: [] });
  });

  categories.forEach(category => {
    const node = map.get(category.id)!;
    if (category.parent_id) {
      const parent = map.get(category.parent_id);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}
