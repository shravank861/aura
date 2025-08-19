import React, { useState } from 'react';
import styled from 'styled-components';
import { ComponentData, ComponentProperties } from '../types';

const PropertiesContainer = styled.div`
  width: 20%;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  border-left: 1px solid var(--panelBorder);
  padding: 24px 16px;
  overflow-y: auto;
`;

const PropertiesTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #111827;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const NoSelectionMessage = styled.div`
  color: #6c757d;
  font-style: italic;
  text-align: center;
  margin-top: 40px;
`;

const PropertyGroup = styled.div`
  margin-bottom: 16px;
`;

const PropertyLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #111827;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--panelBorder);
  border-radius: 10px;
  font-size: 14px;
  background: #ffffff;
  
  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const PropertySelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--panelBorder);
  border-radius: 10px;
  font-size: 14px;
  background: #ffffff;
  
  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const PropertySlider = styled.input`
  width: 100%;
  margin: 8px 0;
`;

const ColorInput = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid var(--panelBorder);
  border-radius: 10px;
  cursor: pointer;
  background: #ffffff;
  
  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ButtonGroupButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${props => props.active ? '#007bff' : '#dee2e6'};
  border-radius: 4px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #007bff;
    background: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

interface PropertiesPanelProps {
  selectedComponent: ComponentData | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  onUpdateComponent,
}) => {
  const [editingContent, setEditingContent] = useState('');

  if (!selectedComponent) {
    return (
      <PropertiesContainer>
        <PropertiesTitle>Properties</PropertiesTitle>
        <NoSelectionMessage>
          Select a block to edit its settings
        </NoSelectionMessage>
      </PropertiesContainer>
    );
  }

  const updateProperty = (property: keyof ComponentProperties, value: any) => {
    onUpdateComponent(selectedComponent.id, {
      properties: {
        ...selectedComponent.properties,
        [property]: value,
      },
    });
  };

  const renderTextProperties = () => (
    <>
      <PropertyGroup>
        <PropertyLabel>Content</PropertyLabel>
        <TextAreaInput
          value={selectedComponent.properties.content || ''}
          onChange={(e) => updateProperty('content', e.target.value)}
          placeholder="Enter text content..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Font Size</PropertyLabel>
        <PropertySlider
          type="range"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 16}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 16}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Font Weight</PropertyLabel>
        <PropertySelect
          value={selectedComponent.properties.fontWeight || '400'}
          onChange={(e) => updateProperty('fontWeight', e.target.value)}
        >
          <option value="400">400 - Normal</option>
          <option value="700">700 - Bold</option>
        </PropertySelect>
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Color</PropertyLabel>
        <ColorInput
          type="color"
          value={selectedComponent.properties.color || '#000000'}
          onChange={(e) => updateProperty('color', e.target.value)}
        />
      </PropertyGroup>
    </>
  );


  const renderTextAreaProperties = () => (
    <>
      <PropertyGroup>
        <PropertyLabel>Content</PropertyLabel>
        <TextAreaInput
          value={selectedComponent.properties.content || ''}
          onChange={(e) => updateProperty('content', e.target.value)}
          placeholder="Enter text content..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Font Size</PropertyLabel>
        <PropertySlider
          type="range"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 14}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 14}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Color</PropertyLabel>
        <ColorInput
          type="color"
          value={selectedComponent.properties.color || '#000000'}
          onChange={(e) => updateProperty('color', e.target.value)}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Text Align</PropertyLabel>
        <ButtonGroup>
          <ButtonGroupButton
            active={selectedComponent.properties.textAlign === 'left'}
            onClick={() => updateProperty('textAlign', 'left')}
          >
            Left
          </ButtonGroupButton>
          <ButtonGroupButton
            active={selectedComponent.properties.textAlign === 'center'}
            onClick={() => updateProperty('textAlign', 'center')}
          >
            Center
          </ButtonGroupButton>
          <ButtonGroupButton
            active={selectedComponent.properties.textAlign === 'right'}
            onClick={() => updateProperty('textAlign', 'right')}
          >
            Right
          </ButtonGroupButton>
        </ButtonGroup>
      </PropertyGroup>
    </>
  );

  const renderImageProperties = () => (
    <>
      <PropertyGroup>
        <PropertyLabel>Image URL</PropertyLabel>
        <PropertyInput
          type="text"
          value={selectedComponent.properties.imageUrl || ''}
          onChange={(e) => updateProperty('imageUrl', e.target.value)}
          placeholder="Enter image URL..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Alt Text</PropertyLabel>
        <PropertyInput
          type="text"
          value={selectedComponent.properties.altText || ''}
          onChange={(e) => updateProperty('altText', e.target.value)}
          placeholder="Enter alt text..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Object Fit</PropertyLabel>
        <PropertySelect
          value={selectedComponent.properties.objectFit || 'cover'}
          onChange={(e) => updateProperty('objectFit', e.target.value)}
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
        </PropertySelect>
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Border Radius</PropertyLabel>
        <PropertySlider
          type="range"
          min="0"
          max="50"
          value={selectedComponent.properties.borderRadius || 0}
          onChange={(e) => updateProperty('borderRadius', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="0"
          max="50"
          value={selectedComponent.properties.borderRadius || 0}
          onChange={(e) => updateProperty('borderRadius', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Height</PropertyLabel>
        <PropertyInput
          type="number"
          min="50"
          max="800"
          value={selectedComponent.properties.height || 150}
          onChange={(e) => updateProperty('height', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Width</PropertyLabel>
        <PropertyInput
          type="number"
          min="50"
          max="800"
          value={selectedComponent.properties.width || 200}
          onChange={(e) => updateProperty('width', parseInt(e.target.value))}
        />
      </PropertyGroup>
    </>
  );

  const renderButtonProperties = () => (
    <>
      <PropertyGroup>
        <PropertyLabel>Button Text</PropertyLabel>
        <PropertyInput
          type="text"
          value={selectedComponent.properties.buttonText || ''}
          onChange={(e) => updateProperty('buttonText', e.target.value)}
          placeholder="Enter button text..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>URL</PropertyLabel>
        <PropertyInput
          type="text"
          value={selectedComponent.properties.url || ''}
          onChange={(e) => updateProperty('url', e.target.value)}
          placeholder="Enter URL..."
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Font Size</PropertyLabel>
        <PropertySlider
          type="range"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 14}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="8"
          max="72"
          value={selectedComponent.properties.fontSize || 14}
          onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Padding</PropertyLabel>
        <PropertySlider
          type="range"
          min="5"
          max="30"
          value={selectedComponent.properties.padding || 10}
          onChange={(e) => updateProperty('padding', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="5"
          max="30"
          value={selectedComponent.properties.padding || 10}
          onChange={(e) => updateProperty('padding', parseInt(e.target.value))}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Background Color</PropertyLabel>
        <ColorInput
          type="color"
          value={selectedComponent.properties.backgroundColor || '#007bff'}
          onChange={(e) => updateProperty('backgroundColor', e.target.value)}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Text Color</PropertyLabel>
        <ColorInput
          type="color"
          value={selectedComponent.properties.textColor || '#ffffff'}
          onChange={(e) => updateProperty('textColor', e.target.value)}
        />
      </PropertyGroup>
      
      <PropertyGroup>
        <PropertyLabel>Border Radius</PropertyLabel>
        <PropertySlider
          type="range"
          min="0"
          max="25"
          value={selectedComponent.properties.borderRadius || 4}
          onChange={(e) => updateProperty('borderRadius', parseInt(e.target.value))}
        />
        <PropertyInput
          type="number"
          min="0"
          max="25"
          value={selectedComponent.properties.borderRadius || 4}
          onChange={(e) => updateProperty('borderRadius', parseInt(e.target.value))}
        />
      </PropertyGroup>
    </>
  );


  const renderProperties = () => {
    switch (selectedComponent.type) {
      case 'text':
        return renderTextProperties();
      case 'textarea':
        return renderTextAreaProperties();
      case 'image':
        return renderImageProperties();
      case 'button':
        return renderButtonProperties();
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <PropertiesContainer>
      <PropertiesTitle>
        {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Properties
      </PropertiesTitle>
      {renderProperties()}
    </PropertiesContainer>
  );
};

export default PropertiesPanel;
