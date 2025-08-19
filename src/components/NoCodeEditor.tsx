import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ComponentPalette from './ComponentPalette';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import { ComponentData, ComponentType, ComponentProperties } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useHistory } from '../hooks/useHistory';

const EditorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const NoCodeEditor: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Load components from localStorage
  const [savedComponents, setSavedComponents] = useLocalStorage<ComponentData[]>('aura-components', []);
  
  // History management for undo/redo
  const { history, currentIndex, addToHistory, undo, redo, canUndo, canRedo } = useHistory(savedComponents);

  // Initialize components from localStorage
  useEffect(() => {
    if (savedComponents.length > 0) {
      setComponents(savedComponents);
      addToHistory(savedComponents);
    }
  }, []);

  // Save components to localStorage whenever they change
  useEffect(() => {
    if (components.length > 0 || savedComponents.length > 0) {
      setSavedComponents(components);
    }
  }, [components, setSavedComponents]);

  const addComponent = useCallback((type: ComponentType) => {
    const newComponent: ComponentData = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      position: { x: 100, y: 100 },
      properties: getDefaultProperties(type),
      zIndex: components.length + 1,
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    addToHistory(newComponents);
    setSelectedComponent(newComponent);
  }, [components, addToHistory]);

  const addComponentAt = useCallback((type: ComponentType, x: number, y: number) => {
    const newComponent: ComponentData = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      position: { x, y },
      properties: getDefaultProperties(type),
      zIndex: components.length + 1,
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    addToHistory(newComponents);
    setSelectedComponent(newComponent);
  }, [components, addToHistory]);

  const updateComponent = useCallback((id: string, updates: Partial<ComponentData>) => {
    const newComponents = components.map(comp =>
      comp.id === id ? { ...comp, ...updates } : comp
    );
    setComponents(newComponents);
    addToHistory(newComponents);
    
    // Update selected component if it's the one being updated
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  }, [components, selectedComponent, addToHistory]);

  const deleteComponent = useCallback((id: string) => {
    const newComponents = components.filter(comp => comp.id !== id);
    setComponents(newComponents);
    addToHistory(newComponents);
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  }, [components, selectedComponent, addToHistory]);

  const selectComponent = useCallback((component: ComponentData | null) => {
    setSelectedComponent(component);
  }, []);

  const getDefaultProperties = (type: ComponentType): ComponentProperties => {
    switch (type) {
      case 'text':
        return {
          content: 'Sample Text',
          fontSize: 16,
          fontWeight: '400',
          color: '#000000',
        };
      case 'textarea':
        return {
          content: 'Sample Text Area',
          fontSize: 14,
          color: '#000000',
          textAlign: 'left',
        };
      case 'image':
        return {
          imageUrl: 'https://via.placeholder.com/200x150',
          altText: 'Sample Image',
          objectFit: 'cover',
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

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setComponents(previousState);
      setSelectedComponent(null);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setComponents(nextState);
      setSelectedComponent(null);
    }
  };

  return (
    <EditorContainer>
      <ComponentPalette onAddComponent={addComponent} />
      <Canvas
        components={components}
        selectedComponent={selectedComponent}
        onSelectComponent={selectComponent}
        onUpdateComponent={updateComponent}
        onDeleteComponent={deleteComponent}
        onAddComponentAt={addComponentAt}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <PropertiesPanel
        selectedComponent={selectedComponent}
        onUpdateComponent={updateComponent}
      />
    </EditorContainer>
  );
};

export default NoCodeEditor;
