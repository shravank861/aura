import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ComponentData, ComponentType } from '../types';
import CanvasComponent from './CanvasComponent';
import Toolbar from './Toolbar';

const CanvasContainer = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CanvasArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: default;
  background: radial-gradient(800px 400px at 50% -10%, #eef2ff 0%, transparent 50%),
              radial-gradient(900px 480px at 50% -30%, #e0f2fe 0%, transparent 55%);
`;

const PageSurface = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid var(--panelBorder);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.08), 0 6px 16px rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  width: 900px;
  height: 1400px;
  overflow: hidden;
`;

interface CanvasProps {
  components: ComponentData[];
  selectedComponent: ComponentData | null;
  onSelectComponent: (component: ComponentData | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponentAt: (type: ComponentType, x: number, y: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponentAt,
  isDragging,
  setIsDragging,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedComponent, setDraggedComponent] = useState<ComponentData | null>(null);
  

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType') as ComponentType;
    
    if (componentType && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onAddComponentAt(componentType, x, y);
    }
  }, [onAddComponentAt]);

  const handleMouseDown = useCallback((e: React.MouseEvent, component: ComponentData) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left - component.position.x;
      const offsetY = e.clientY - rect.top - component.position.y;
      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedComponent(component);
      setIsDragging(true);
      onSelectComponent(component);
    }
  }, [onSelectComponent, setIsDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && draggedComponent && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left - dragOffset.x;
      const rawY = e.clientY - rect.top - dragOffset.y;
      // Snap to 8px grid
      const newX = Math.round(rawX / 8) * 8;
      const newY = Math.round(rawY / 8) * 8;
      
      onUpdateComponent(draggedComponent.id, {
        position: { x: newX, y: newY }
      });
    }
  }, [isDragging, draggedComponent, dragOffset, onUpdateComponent]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDraggedComponent(null);
    }
  }, [isDragging, setIsDragging]);

  const handleMouseLeave = useCallback(() => {
    handleMouseUp();
  }, [handleMouseUp]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectComponent(null);
    }
  }, [onSelectComponent]);

  const getDefaultProperties = (type: ComponentType): any => {
    switch (type) {
      case 'text':
        return {
          content: 'Sample Text',
          fontSize: 16,
          fontWeight: '400' as const,
          color: '#000000',
        };
      case 'textarea':
        return {
          content: 'Sample Text Area',
          fontSize: 14,
          color: '#000000',
          textAlign: 'left' as const,
        };
      case 'image':
        return {
          imageUrl: 'https://via.placeholder.com/200x150',
          altText: 'Sample Image',
          objectFit: 'cover' as const,
          borderRadius: 0,
          height: 150,
          width: 200,
        };
      case 'button':
        return {
          buttonText: 'Click Me',
          url: '#',
          fontSize: 14,
          padding: 10,
          backgroundColor: '#007bff',
          textColor: '#ffffff',
          borderRadius: 4,
        };
      default:
        return {};
    }
  };

  return (
    <CanvasContainer>
      <Toolbar
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={onUndo}
        onRedo={onRedo}
        components={components}
      />
      <CanvasArea
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
      >
        <PageSurface>
          {components.map((component) => (
            <CanvasComponent
              key={component.id}
              component={component}
              isSelected={selectedComponent?.id === component.id}
              onSelect={() => onSelectComponent(component)}
              onMouseDown={(e) => handleMouseDown(e, component)}
              onDelete={() => onDeleteComponent(component.id)}
            />
          ))}
        </PageSurface>
      </CanvasArea>
    </CanvasContainer>
  );
};

export default Canvas;
