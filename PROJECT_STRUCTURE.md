# Project Structure - Aura No-Code Content Editor

This document provides a comprehensive overview of the project structure, explaining the purpose of each folder and key module in the Aura No-Code Content Editor.

## 📁 Root Directory Structure

```
aura/
├── public/                 # Static assets and HTML template
├── src/                    # Source code directory
├── node_modules/           # Dependencies (auto-generated)
├── package.json            # Project configuration and dependencies
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
├── .gitignore             # Git ignore rules
├── README.md              # Project overview and setup instructions
├── PROJECT_STRUCTURE.md   # This file - detailed structure explanation
├── ARCHITECTURE.md        # Architecture design and decisions
└── CHAT_HISTORY.md        # AI assistant conversation summary
```

## 🗂️ Source Code Structure (`src/`)

### Components Directory (`src/components/`)

The components directory contains all React components organized by functionality:

#### Core Editor Components

**`NoCodeEditor.tsx`** - Main Application Component
- **Purpose**: Root component that orchestrates the entire editor
- **Responsibilities**: 
  - Manages global state for components
  - Coordinates communication between panels
  - Handles component lifecycle (add, update, delete)
  - Manages undo/redo functionality
  - Integrates with localStorage for persistence
- **Key Features**: State management, event handling, component coordination

**`ComponentPalette.tsx`** - Left Panel Component Palette
- **Purpose**: Displays available components for users to add to the canvas
- **Responsibilities**:
  - Renders component options (Text, TextArea, Image, Button)
  - Handles drag and drop initiation
  - Provides visual feedback for component types
  - Manages component descriptions and icons
- **Key Features**: Drag source, component categorization, visual design

**`Canvas.tsx`** - Middle Panel Canvas
- **Purpose**: Main interactive area where components are placed and manipulated
- **Responsibilities**:
  - Renders the canvas grid background
  - Handles drop events for new components
  - Manages component positioning and movement
  - Coordinates with individual component instances
  - Integrates with toolbar for actions
- **Key Features**: Drop zone, component positioning, drag handling

**`CanvasComponent.tsx`** - Individual Component Renderer
- **Purpose**: Renders individual components on the canvas with selection states
- **Responsibilities**:
  - Displays components based on their type and properties
  - Handles component selection and highlighting
  - Manages component-specific rendering logic
  - Provides selection overlays and delete buttons
  - Supports inline editing for text components
- **Key Features**: Component rendering, selection states, inline editing

**`PropertiesPanel.tsx`** - Right Panel Properties Editor
- **Purpose**: Displays and allows editing of selected component properties
- **Responsibilities**:
  - Shows relevant properties for selected component type
  - Provides appropriate input controls (sliders, color pickers, dropdowns)
  - Updates component properties in real-time
  - Validates input values and ranges
  - Maintains property state consistency
- **Key Features**: Dynamic property editing, real-time updates, input validation

**`Toolbar.tsx`** - Top Toolbar
- **Purpose**: Provides global actions and controls for the editor
- **Responsibilities**:
  - Undo/redo functionality
  - Preview generation and display
  - HTML export and clipboard functionality
  - Project title display
  - Action grouping and organization
- **Key Features**: Action controls, preview generation, HTML export

**`PreviewModal.tsx`** - Preview Modal
- **Purpose**: Displays preview of the final output with mobile/desktop views
- **Responsibilities**:
  - Renders HTML preview in modal
  - Provides mobile and desktop view toggles
  - Handles modal interactions and keyboard shortcuts
  - Maintains preview state and responsiveness
- **Key Features**: Preview rendering, view mode switching, modal management

### Hooks Directory (`src/hooks/`)

Custom React hooks for specialized functionality:

**`useLocalStorage.ts`** - Local Storage Management Hook
- **Purpose**: Provides persistent storage for component data
- **Responsibilities**:
  - Manages localStorage read/write operations
  - Handles JSON serialization/deserialization
  - Provides error handling for storage operations
  - Maintains state synchronization
- **Key Features**: Persistence, error handling, state sync

**`useHistory.ts`** - Undo/Redo History Hook
- **Purpose**: Manages action history for undo/redo functionality
- **Responsibilities**:
  - Maintains history stack (up to 50 steps)
  - Handles undo/redo operations
  - Manages history state and current position
  - Provides history navigation controls
- **Key Features**: History management, undo/redo, step limiting

### Types Directory (`src/types/`)

TypeScript type definitions for the application:

**`index.ts`** - Type Definitions
- **Purpose**: Central location for all TypeScript interfaces and types
- **Contents**:
  - `ComponentData`: Main component structure
  - `ComponentType`: Component type enumeration
  - `ComponentProperties`: Property definitions for each component type
  - `Position`: Position coordinates interface
  - `HistoryState`: History management types
  - `PaletteItem`: Component palette item structure
- **Key Features**: Type safety, interface definitions, property specifications

### Utils Directory (`src/utils/`)

Utility functions and helpers:

**Note**: Currently empty but reserved for future utility functions such as:
- HTML generation utilities
- Validation helpers
- Formatting functions
- Common calculations

## 🔧 Configuration Files

### `package.json`
- **Purpose**: Project metadata and dependency management
- **Key Dependencies**:
  - React 18+ for UI framework
  - TypeScript for type safety
  - styled-components for styling
  - Development tools and testing frameworks

### `tsconfig.json`
- **Purpose**: TypeScript compilation configuration
- **Features**: Strict type checking, modern JavaScript features, React JSX support

### `.gitignore`
- **Purpose**: Specifies files and directories to exclude from version control
- **Contents**: Node modules, build artifacts, environment files, IDE files

## 📱 Public Assets (`public/`)

### `index.html`
- **Purpose**: HTML template for the React application
- **Features**: Meta tags, viewport settings, root div for React mounting

### `favicon.ico`
- **Purpose**: Browser tab icon for the application

## 🏗️ Build and Development

### Development Scripts
- **`npm start`**: Starts development server with hot reload
- **`npm test`**: Runs test suite in watch mode
- **`npm run build`**: Creates production build
- **`npm run eject`**: Ejects from Create React App (one-way operation)

### Build Output
- **`build/`**: Production-ready static files
- **`dist/`**: Alternative build output directory

## 🔍 Key Architectural Patterns

### Component Hierarchy
```
NoCodeEditor (Root)
├── ComponentPalette (Left Panel)
├── Canvas (Middle Panel)
│   ├── Toolbar (Top)
│   └── CanvasComponent[] (Individual Components)
└── PropertiesPanel (Right Panel)
```

### Data Flow
1. **Component Addition**: Palette → Canvas → State Update → Properties Panel
2. **Property Editing**: Properties Panel → State Update → Canvas → Component Update
3. **Component Movement**: Canvas → State Update → Component Repositioning
4. **History Management**: All Actions → History Hook → Undo/Redo Support

### State Management
- **Local State**: Component-specific state (editing modes, temporary values)
- **Global State**: Component data, selection state, history
- **Persistence**: localStorage for component data persistence
- **Synchronization**: Real-time updates across all panels

## 🎯 Design Principles

### Modularity
- Each component has a single, well-defined responsibility
- Clear separation of concerns between UI and logic
- Reusable component patterns

### Type Safety
- Full TypeScript implementation
- Comprehensive interface definitions
- Compile-time error checking

### Performance
- Efficient re-rendering with React hooks
- Minimal state updates
- Optimized component rendering

### User Experience
- Intuitive drag and drop interface
- Real-time visual feedback
- Responsive design principles
- Accessibility considerations

## 🔮 Future Extensibility

The current structure is designed to easily accommodate:
- New component types
- Additional property types
- Enhanced editing capabilities
- Plugin system integration
- Advanced collaboration features
- Export format extensions
