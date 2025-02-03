import { TAGS } from '@shared/constants/tags';
import type { TagCategory } from '@/shared/api/reviews/types';

export class TagMapper {
  static getTagDescriptions(tags: TagCategory) {
    return {
      menu: tags.menu.map(tag => {
        const menuTag = TAGS.menu.find(t => t.id === tag.id);
        return menuTag?.description || '';
      }).filter(Boolean),
      interior: tags.interior.map(tag => {
        const interiorTag = TAGS.interior.find(t => t.id === tag.id);
        return interiorTag?.description || '';
      }).filter(Boolean)
    };
  }

  static findTagById(category: keyof typeof TAGS, id: number) {
    const tag = TAGS[category].find(tag => tag.id === id);
    return tag ? {
      description: tag.description,
      defaultIcon: tag.defaultIcon,
      activeIcon: tag.activeIcon
    } : undefined;
  }

  static getAllTagsForCategory(category: keyof typeof TAGS) {
    return TAGS[category].map(tag => ({
      id: tag.id,
      description: tag.description,
      defaultIcon: tag.defaultIcon,
      activeIcon: tag.activeIcon
    }));
  }

  static getTagIcon(category: keyof typeof TAGS, id: number, isActive: boolean) {
    const tag = TAGS[category].find(tag => tag.id === id);
    return tag ? (isActive ? tag.activeIcon : tag.defaultIcon) : undefined;
  }
}