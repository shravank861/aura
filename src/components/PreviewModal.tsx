import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #495057;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  
  &:hover {
    color: #495057;
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`;

const ViewToggleButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
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

const PreviewContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const PreviewFrame = styled.div<{ viewMode: 'desktop' | 'mobile' }>`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  ${props => props.viewMode === 'mobile' && `
    width: 375px;
    height: 667px;
    border-radius: 20px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: #dee2e6;
      border-radius: 2px;
    }
  `}
  
  ${props => props.viewMode === 'desktop' && `
    width: 100%;
    max-width: 1200px;
    height: 100%;
  `}
`;

const PreviewContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

interface PreviewModalProps {
  html: string;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ html, onClose }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ModalTitle>Preview</ModalTitle>
            <ViewToggleContainer>
              <ViewToggleButton
                active={viewMode === 'desktop'}
                onClick={() => setViewMode('desktop')}
              >
                Desktop
              </ViewToggleButton>
              <ViewToggleButton
                active={viewMode === 'mobile'}
                onClick={() => setViewMode('mobile')}
              >
                Mobile
              </ViewToggleButton>
            </ViewToggleContainer>
          </div>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <PreviewContainer>
          <PreviewFrame viewMode={viewMode}>
            <PreviewContent
              dangerouslySetInnerHTML={{ __html: html }}
              onKeyDown={handleEscape}
            />
          </PreviewFrame>
        </PreviewContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PreviewModal;
