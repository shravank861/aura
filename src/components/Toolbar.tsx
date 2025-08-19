import React, { useState } from 'react';
import styled from 'styled-components';
import { ComponentData } from '../types';
import PreviewModal from './PreviewModal';

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const ToolbarButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
  color: #495057;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #adb5bd;
  }
  
  &:active:not(:disabled) {
    background: #e9ecef;
  }
`;

const PrimaryButton = styled(ToolbarButton)`
  background: #007bff;
  color: white;
  border-color: #007bff;
  
  &:hover:not(:disabled) {
    background: #0056b3;
    border-color: #0056b3;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 30px;
  background: #dee2e6;
  margin: 0 15px;
`;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #495057;
  flex: 1;
`;

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  components: ComponentData[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  components,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const generateHTML = (): string => {
    const componentHTML = components
      .sort((a, b) => a.zIndex - b.zIndex)
      .map(component => {
        switch (component.type) {
          case 'text':
            return `<div style="position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; font-size: ${component.properties.fontSize || 16}px; font-weight: ${component.properties.fontWeight || '400'}; color: ${component.properties.color || '#000000'}; z-index: ${component.zIndex};">${component.properties.content || 'Sample Text'}</div>`;
          
          case 'textarea':
            return `<div style="position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; font-size: ${component.properties.fontSize || 14}px; color: ${component.properties.color || '#000000'}; text-align: ${component.properties.textAlign || 'left'}; z-index: ${component.zIndex};">${component.properties.content || 'Sample Text Area'}</div>`;
          
          case 'image':
            return `<img src="${component.properties.imageUrl || 'https://via.placeholder.com/200x150'}" alt="${component.properties.altText || 'Sample Image'}" style="position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; object-fit: ${component.properties.objectFit || 'cover'}; border-radius: ${component.properties.borderRadius || 0}px; height: ${component.properties.height || 150}px; width: ${component.properties.width || 200}px; z-index: ${component.zIndex};">`;
          
          case 'button':
            return `<button style="position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; font-size: ${component.properties.fontSize || 14}px; padding: ${component.properties.padding || 10}px; background-color: ${component.properties.backgroundColor || '#007bff'}; color: ${component.properties.textColor || '#ffffff'}; border: none; border-radius: ${component.properties.borderRadius || 4}px; z-index: ${component.zIndex};">${component.properties.buttonText || 'Click Me'}</button>`;
          
          default:
            return '';
        }
      })
      .join('\n');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aura No-Code Editor Output</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f8f9fa;
        }
        .canvas-container {
            position: relative;
            width: 100%;
            height: 100vh;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="canvas-container">
        ${componentHTML}
    </div>
</body>
</html>`;
  };

  const copyHTMLToClipboard = async () => {
    try {
      const html = generateHTML();
      await navigator.clipboard.writeText(html);
      alert('HTML copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy HTML:', err);
      alert('Failed to copy HTML to clipboard');
    }
  };

  return (
    <>
      <ToolbarContainer>
        <ProjectTitle>Aura - No-Code Content Editor</ProjectTitle>
        
        <ToolbarGroup>
          <ToolbarButton disabled={!canUndo} onClick={onUndo}>
            ↩ Undo
          </ToolbarButton>
          <ToolbarButton disabled={!canRedo} onClick={onRedo}>
            ↪ Redo
          </ToolbarButton>
        </ToolbarGroup>
        
        <Separator />
        
        <ToolbarGroup>
          <PrimaryButton onClick={() => setShowPreview(true)}>
            👁 Preview
          </PrimaryButton>
          <ToolbarButton onClick={copyHTMLToClipboard}>
            📋 Copy HTML
          </ToolbarButton>
        </ToolbarGroup>
      </ToolbarContainer>
      
      {showPreview && (
        <PreviewModal
          html={generateHTML()}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default Toolbar;
