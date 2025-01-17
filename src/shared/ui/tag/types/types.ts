export interface TagProps {
  content: string;
  defaultIcon?: string;
  activeIcon?: string;
  isActive?: boolean;
  onClick?: () => void;
}