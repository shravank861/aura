import React from 'react';
import styled from 'styled-components';
import { ComponentType } from '../types';

const PaletteContainer = styled.div`
  width: 20%;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  border-right: 1px solid var(--panelBorder);
  padding: 24px 16px;
  overflow-y: auto;
`;

const PaletteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PaletteTitle = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const Badge = styled.span`
  background: var(--brandSoft);
  color: var(--brand);
  border: 1px solid #e0e7ff;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
`;

const ComponentItem = styled.div`
  background: #ffffff;
  border: 1px solid var(--panelBorder);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    border-color: var(--brand);
    box-shadow: 0 6px 18px rgba(79, 70, 229, 0.08);
    transform: translateY(-1px);
  }
  
  &:active {
    cursor: grabbing;
    transform: translateY(0);
  }
`;

const ComponentIcon = styled.div`
  width: 40px;
  height: 40px;
  background: var(--brandSoft);
  border: 1px solid #e0e7ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  font-size: 18px;
  font-weight: 700;
`;

const ComponentTexts = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComponentLabel = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const ComponentDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent }) => {
  const paletteItems = [
    {
      type: 'text' as ComponentType,
      label: 'Text',
      icon: 'T',
      description: 'Add text content with customizable styling'
    },
    {
      type: 'textarea' as ComponentType,
      label: 'Text Area',
      icon: '¶',
      description: 'Add multi-line text with alignment options'
    },
    {
      type: 'image' as ComponentType,
      label: 'Image',
      icon: '🖼',
      description: 'Add images with size and fit controls'
    },
    {
      type: 'button' as ComponentType,
      label: 'Button',
      icon: '🔘',
      description: 'Add clickable buttons with custom styling'
    }
  ];

  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleClick = (type: ComponentType) => {
    onAddComponent(type);
  };

  return (
    <PaletteContainer>
      <PaletteHeader>
        <PaletteTitle>Components</PaletteTitle>
        <Badge>Drag to Canvas</Badge>
      </PaletteHeader>
      {paletteItems.map((item) => (
        <ComponentItem
          key={item.type}
          draggable
          onDragStart={(e) => handleDragStart(e, item.type)}
          onClick={() => handleClick(item.type)}
        >
          <ComponentIcon>{item.icon}</ComponentIcon>
          <ComponentTexts>
            <ComponentLabel>{item.label}</ComponentLabel>
            <ComponentDescription>{item.description}</ComponentDescription>
          </ComponentTexts>
        </ComponentItem>
      ))}
    </PaletteContainer>
  );
};

export default ComponentPalette;
