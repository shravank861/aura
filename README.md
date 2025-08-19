# Aura - No-Code Content Editor

A powerful, in-house visual editor that empowers internal teams to build and modify simple web layouts and promotional materials without direct engineering support.

## 🚀 Features

### Core Functionality
- **Component Palette**: Pre-defined components (Text, TextArea, Image, Button) ready to use
- **Drag & Drop**: Intuitive drag and drop interface for component placement
- **Freeform Canvas**: Components can be positioned anywhere on the canvas
- **Dynamic Properties Panel**: Real-time editing of component properties
- **Real-Time Updates**: Instant visual feedback for all property changes
- **Preview & HTML Export**: Preview functionality with HTML code generation
- **Copy to Clipboard**: One-click HTML export for use in other applications

### Advanced Features (I3+ Members)
- **Undo/Redo System**: 50-step history for all actions
- **Custom Inline Text Editor**: Built-in text editing without external dependencies
- **Mobile & Desktop Preview**: Responsive preview modes for different devices

### Component Types & Properties

#### Text Component
- Font size (8-72px with slider and number input)
- Font weight (Normal: 400, Bold: 700)
- Color picker
- Content editing

#### TextArea Component
- Font size (8-72px with slider and number input)
- Color picker
- Text alignment (Left, Center, Right)
- Content editing

#### Image Component
- Image URL input
- Alt text input
- Object fit (Cover, Contain, Fill)
- Border radius (0-50px with slider and number input)
- Height and width controls (50-800px)

#### Button Component
- URL input
- Button text input
- Font size (8-72px with slider and number input)
- Padding (5-30px with slider and number input)
- Background color picker
- Text color picker
- Border radius (0-25px with slider and number input)

## 🛠️ Technical Implementation

### Built from Scratch
- **Native Drag & Drop**: Custom implementation using browser events (mousedown, mousemove, mouseup)
- **No External Libraries**: No reliance on comprehensive drag-and-drop libraries
- **Custom State Management**: React hooks with localStorage persistence
- **Responsive Design**: Modern UI with styled-components

### Architecture
- **Three-Panel Layout**: Left (20%), Middle (60%), Right (20%)
- **Component-Based**: Modular React components for maintainability
- **TypeScript**: Full type safety throughout the application
- **Local Storage**: Browser-based persistence without external APIs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 📖 Usage Guide

### Adding Components
1. **From Palette**: Click on any component in the left panel to add it to the canvas
2. **Drag & Drop**: Drag components from the palette to the canvas for precise positioning

### Editing Components
1. **Select**: Click on any component on the canvas to select it
2. **Properties**: Use the right panel to modify component properties
3. **Real-time Updates**: See changes instantly on the canvas

### Moving Components
1. **Click & Drag**: Click and drag any component to reposition it
2. **Precise Control**: Components can be placed anywhere on the canvas

### Preview & Export
1. **Preview**: Click the "Preview" button to see the final result
2. **Mobile/Desktop**: Toggle between mobile and desktop preview modes
3. **HTML Export**: Click "Copy HTML" to get the generated HTML code

### Undo/Redo
- **Undo**: Use the "Undo" button or Ctrl+Z to revert changes
- **Redo**: Use the "Redo" button or Ctrl+Y to reapply changes
- **History**: Up to 50 steps of action history

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── NoCodeEditor.tsx # Main editor component
│   ├── ComponentPalette.tsx # Left panel component palette
│   ├── Canvas.tsx      # Middle panel canvas
│   ├── CanvasComponent.tsx # Individual component renderer
│   ├── PropertiesPanel.tsx # Right panel properties editor
│   ├── Toolbar.tsx     # Top toolbar with actions
│   └── PreviewModal.tsx # Preview modal component
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts # Local storage management
│   └── useHistory.ts   # Undo/redo functionality
├── types/              # TypeScript type definitions
│   └── index.ts        # Component and property interfaces
└── utils/              # Utility functions
```

## 🔧 Customization

### Adding New Components
1. Define the component type in `src/types/index.ts`
2. Add component to the palette in `ComponentPalette.tsx`
3. Implement rendering logic in `CanvasComponent.tsx`
4. Add properties panel in `PropertiesPanel.tsx`

### Styling
- Uses styled-components for all styling
- CSS-in-JS approach for component-specific styles
- Responsive design with mobile-first approach

## 🧪 Testing

The application includes comprehensive testing:
- Unit tests for all components
- Integration tests for user workflows
- Test coverage reporting

Run tests with:
```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is proprietary software developed for internal use at Talentica.

## 🆘 Support

For technical support or questions, please contact:
- Dipen Mistry (dipen.mistry@talentica.com)
- Nilesh Mallick (nilesh.mallick@talentica.com)
- Sachin Salunke (sachin.salunke@talentica.com)

## 🎯 Roadmap

- [ ] Additional component types (Video, Form elements)
- [ ] Component templates and presets
- [ ] Collaboration features
- [ ] Advanced styling options
- [ ] Export to multiple formats
- [ ] Component library management
