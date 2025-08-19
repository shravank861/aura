import React, { useState } from 'react';
import styled from 'styled-components';
import { ComponentData } from '../types';

const ComponentWrapper = styled.div<{ 
  isSelected: boolean; 
  zIndex: number;
  left: number;
  top: number;
}>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  z-index: ${props => props.zIndex};
  cursor: ${props => (props.isSelected ? 'grab' : 'pointer')};
  user-select: none;
  
  ${props => props.isSelected && `
    outline: 2px solid #007bff;
    outline-offset: 2px;
  `}
`;

const SelectionOverlay = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -25px;
  right: -25px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &:hover {
    background: #c82333;
  }
`;

const TextComponent = styled.div<{ fontSize: number; fontWeight: string; color: string }>`
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  min-width: 100px;
  min-height: 20px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
`;

const TextAreaComponent = styled.div<{ fontSize: number; color: string; textAlign: string }>`
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
  text-align: ${props => props.textAlign};
  min-width: 150px;
  min-height: 60px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  border: 1px solid #dee2e6;
  resize: both;
  overflow: auto;
`;

const ImageComponent = styled.img<{ 
  objectFit: string; 
  borderRadius: number; 
  height: number; 
  width: number 
}>`
  object-fit: ${props => props.objectFit};
  border-radius: ${props => props.borderRadius}px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: 1px solid #dee2e6;
`;

const ButtonComponent = styled.button<{
  fontSize: number;
  padding: number;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
}>`
  font-size: ${props => props.fontSize}px;
  padding: ${props => props.padding}px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  border: none;
  border-radius: ${props => props.borderRadius}px;
  cursor: pointer;
  min-width: 80px;
  min-height: 30px;
  
  &:hover {
    opacity: 0.9;
  }
`;

interface CanvasComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onDelete: () => void;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onMouseDown,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(component.properties.content || '');

  const handleDoubleClick = () => {
    if (component.type === 'text' || component.type === 'textarea') {
      setIsEditing(true);
    }
  };

  const handleEditBlur = () => {
    setIsEditing(false);
    // Update component content
    // This would need to be passed down from parent
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return (
          <TextComponent
            fontSize={component.properties.fontSize || 16}
            fontWeight={component.properties.fontWeight || '400'}
            color={component.properties.color || '#000000'}
            onDoubleClick={handleDoubleClick}
          >
            {component.properties.content || 'Sample Text'}
          </TextComponent>
        );
      
      case 'textarea':
        return (
          <TextAreaComponent
            fontSize={component.properties.fontSize || 14}
            color={component.properties.color || '#000000'}
            textAlign={component.properties.textAlign || 'left'}
            onDoubleClick={handleDoubleClick}
          >
            {component.properties.content || 'Sample Text Area'}
          </TextAreaComponent>
        );
      
      case 'image':
        return (
          <ImageComponent
            src={component.properties.imageUrl || 'https://via.placeholder.com/200x150'}
            alt={component.properties.altText || 'Sample Image'}
            objectFit={component.properties.objectFit || 'cover'}
            borderRadius={component.properties.borderRadius || 0}
            height={component.properties.height || 150}
            width={component.properties.width || 200}
          />
        );
      
      case 'button':
        return (
          <ButtonComponent
            fontSize={component.properties.fontSize || 14}
            padding={component.properties.padding || 10}
            backgroundColor={component.properties.backgroundColor || '#007bff'}
            textColor={component.properties.textColor || '#ffffff'}
            borderRadius={component.properties.borderRadius || 4}
          >
            {component.properties.buttonText || 'Click Me'}
          </ButtonComponent>
        );
      
      default:
        return <div>Unknown Component</div>;
    }
  };

  return (
    <ComponentWrapper
      isSelected={isSelected}
      zIndex={component.zIndex}
      left={component.position.x}
      top={component.position.y}
      onClick={onSelect}
      onMouseDown={onMouseDown}
    >
      {renderComponent()}
      
      {isSelected && (
        <>
          <SelectionOverlay>
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </SelectionOverlay>
          <DeleteButton onClick={onDelete}>×</DeleteButton>
        </>
      )}
    </ComponentWrapper>
  );
};

export default CanvasComponent;
