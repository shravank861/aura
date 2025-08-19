export interface ComponentData {
  id: string;
  type: ComponentType;
  position: Position;
  properties: ComponentProperties;
  zIndex: number;
}

export interface Position {
  x: number;
  y: number;
}

export type ComponentType = 'text' | 'textarea' | 'image' | 'button';

export interface ComponentProperties {
  // Text component properties
  fontSize?: number;
  fontWeight?: '400' | '700';
  color?: string;
  
  // TextArea component properties
  textAlign?: 'left' | 'center' | 'right';
  
  // Image component properties
  imageUrl?: string;
  altText?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: number;
  height?: number;
  width?: number;
  
  // Button component properties
  url?: string;
  buttonText?: string;
  padding?: number;
  backgroundColor?: string;
  textColor?: string;
  
  // Common properties
  content?: string;
}

export interface HistoryState {
  components: ComponentData[];
  timestamp: number;
}

export interface PaletteItem {
  type: ComponentType;
  label: string;
  icon: string;
}
