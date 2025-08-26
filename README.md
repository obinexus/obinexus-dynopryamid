# OBINexus 3D Pyramid Component

A dynamic, interactive 3D isometric pyramid visualization for the OBINexus Artistic-Tech Expression Scale with UI/UX flow integration and ODTS (OBINexus Derivative Tracing System) support.

## Features

- 🔺 3D Isometric pyramid visualization with 11 levels (0-10)
- 🎨 Dynamic color-coded levels from Olive to Navy Blue
- 📊 ODTS integration with D1, D2, D3 metrics
- 🔄 UI → UX → Output flow visualization
- 🛡️ FUD (Fear, Uncertainty, Doubt) mitigation tracking
- 📱 Responsive design with dark mode support
- ♿ Accessible with ARIA labels and keyboard navigation

## Project Structure

```
obinexus-pyramid/
├── src/
│   ├── components/
│   │   ├── OBINexusPyramid3D.js
│   │   ├── OBINexusPyramid3D.css
│   │   ├── UIFlowIndicator.js
│   │   └── MetricsPanel.js
│   ├── hooks/
│   │   ├── useODTS.js
│   │   └── useFUDMitigation.js
│   ├── utils/
│   │   ├── pyramidCalculations.js
│   │   └── levelConfig.js
│   └── index.js
├── public/
│   └── index.html
├── examples/
│   ├── basic-usage.html
│   ├── with-react.js
│   └── standalone-svg.svg
├── docs/
│   ├── API.md
│   ├── ODTS-INTEGRATION.md
│   └── UI-UX-FLOW.md
├── package.json
├── webpack.config.js
├── .gitignore
├── LICENSE
└── README.md
```

## Installation

### NPM
```bash
npm install obinexus-pyramid
```

### Yarn
```bash
yarn add obinexus-pyramid
```

### CDN
```html
<script src="https://unpkg.com/obinexus-pyramid/dist/obinexus-pyramid.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/obinexus-pyramid/dist/obinexus-pyramid.min.css">
```

## Usage

### React Component

```jsx
import OBINexusPyramid3D from 'obinexus-pyramid';
import 'obinexus-pyramid/dist/obinexus-pyramid.css';

function App() {
  const handleLevelChange = (level) => {
    console.log(`Level changed to: ${level}`);
  };

  return (
    <OBINexusPyramid3D
      currentLevel={2}
      onLevelChange={handleLevelChange}
      showUIFlow={true}
      enableFUDMitigation={true}
    />
  );
}
```

### Vanilla JavaScript

```html
<div id="pyramid-container"></div>

<script>
  const pyramid = new OBINexusPyramid({
    container: '#pyramid-container',
    currentLevel: 0,
    onLevelChange: (level) => {
      console.log(`Level: ${level}`);
    }
  });
</script>
```

### Vue.js

```vue
<template>
  <obinexus-pyramid 
    :current-level="currentLevel"
    @level-change="handleLevelChange"
  />
</template>

<script>
import { OBINexusPyramid } from 'obinexus-pyramid/vue';

export default {
  components: { OBINexusPyramid },
  data() {
    return { currentLevel: 0 };
  },
  methods: {
    handleLevelChange(level) {
      this.currentLevel = level;
    }
  }
};
</script>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentLevel` | Number | 0 | Current active level (0-10) |
| `onLevelChange` | Function | null | Callback when level is clicked |
| `showUIFlow` | Boolean | true | Show UI→UX→Output flow indicator |
| `enableFUDMitigation` | Boolean | true | Enable FUD mitigation tracking |
| `isometric` | Boolean | true | Use 3D isometric view |
| `theme` | String | 'light' | Theme: 'light', 'dark', or 'auto' |
| `locale` | String | 'en' | Language for labels |

### Methods

```javascript
// Get current ODTS metrics
pyramid.getMetrics(level);
// Returns: { d1: 2.5, d2: 0.9, d3: 0.4 }

// Update level programmatically  
pyramid.setLevel(5);

// Export SVG
pyramid.exportSVG();

// Get level history
pyramid.getLevelHistory();
```

## Level Definitions

| Level | Color | Description | D1 | D2 | D3 |
|-------|-------|-------------|----|----|-----|
| 0 | #808000 | Base doodle / minimal expression | 0.0 | 0.0 | 0.0 |
| 1 | #8B7D00 | Sketch / initial ideas | 0.5 | 0.1 | 0.0 |
| 2 | #9ACD32 | Authentic self-expression | 1.0 | 0.3 | 0.1 |
| 3 | #7CFC00 | Objective user-focused design | 1.5 | 0.5 | 0.2 |
| 4 | #32CD32 | Cultural expression / identity | 2.0 | 0.7 | 0.3 |
| 5 | #228B22 | Community & cultural chain | 2.5 | 0.9 | 0.4 |
| 6 | #00FF00 | Mentorship / teaching | 3.0 | 1.1 | 0.5 |
| 7 | #00CED1 | Self-actualization for culture | 3.5 | 1.3 | 0.6 |
| 8 | #1E90FF | General active change (ACE) | 4.0 | 1.5 | 0.7 |
| 9 | #0000FF | Design + tech for everyday users | 4.5 | 1.7 | 0.8 |
| 10 | #000080 | Systemic transformation | 5.0 | 2.0 | 1.0 |

## Integration Examples

### With Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### With Next.js

```jsx
import dynamic from 'next/dynamic';

const OBINexusPyramid = dynamic(
  () => import('obinexus-pyramid'),
  { ssr: false }
);
```

### With TypeScript

```typescript
import OBINexusPyramid, { PyramidProps, LevelData } from 'obinexus-pyramid';

const handleChange = (level: number): void => {
  console.log(level);
};
```

## Customization

### Custom Colors

```javascript
const customLevels = {
  0: { color: '#custom1', darkColor: '#custom1dark' },
  // ... more levels
};

<OBINexusPyramid3D levels={customLevels} />
```

### Custom Animations

```css
.pyramid-layer-3d {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) file

## Links

- [Documentation](https://obinexus.org/pyramid)
- [GitHub Repository](https://github.com/obinexus/pyramid)
- [NPM Package](https://www.npmjs.com/package/obinexus-pyramid)
- [Demo](https://obinexus.org/pyramid/demo)

## Credits

Created by Nnamdi Michael Okpala for the OBINexus project.

Based on the OBINexus Derivative Tracing System (ODTS) mathematical framework.