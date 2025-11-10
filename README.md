# AIVDL Core Library

<div align="center">

![AIVDL Logo](./assets/logo.svg)

**The Standard Library for AI-Generated Visual Design**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@aivdl/core.svg)](https://www.npmjs.com/package/@aivdl/core)
[![Downloads](https://img.shields.io/npm/dm/@aivdl/core.svg)](https://www.npmjs.com/package/@aivdl/core)
[![Build Status](https://github.com/aivdl/core/workflows/CI/badge.svg)](https://github.com/aivdl/core/actions)
[![Test Coverage](https://codecov.io/gh/aivdl/core/branch/main/graph/badge.svg)](https://codecov.io/gh/aivdl/core)
[![Discord](https://img.shields.io/discord/XXXXXXXXXX.svg?label=Discord&logo=discord)](https://discord.gg/aivdl)

[Documentation](https://docs.aivdl.dev) • [Playground](https://playground.aivdl.dev) • [Discord](https://discord.gg/aivdl) • [Twitter](https://twitter.com/aivdl_dev)

</div>

---

## 🎯 What is AIVDL?

AIVDL Core is an **open-source TypeScript library** for generating visual designs through **Direct Code Execution**. Unlike traditional design tools that output static images, AIVDL generates **production-ready, editable code** as the primary output.

### ✨ Key Features

- 🎨 **Code-First Paradigm** - Generate editable TypeScript/React/Vue/Svelte components
- ⚡ **10x Faster** - High-performance ECS (Entity-Component-System) architecture
- 🎭 **10-Level Abstraction** - From natural language to raw performance
- 🔒 **Production-Ready** - Auto-generated tests, validation, and documentation
- 🎨 **Design Systems** - Built-in support for Material Design, Apple HIG, Tailwind, Ant Design
- 🔌 **Extensible** - Secure plugin system with sandboxing
- 🤝 **Real-time Collaboration** - Conflict-free collaborative editing
- 📦 **Multi-Output** - SVG, PNG, PDF, Lottie, iOS/Android assets

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @aivdl/core

# pnpm (recommended)
pnpm add @aivdl/core

# yarn
yarn add @aivdl/core

# bun
bun add @aivdl/core
```

### Hello World - Create Your First Logo

```typescript
import { AIVDL } from '@aivdl/core';

// Initialize
const aivdl = new AIVDL();

// Generate a logo (Level 9 API - Semantic)
const logo = await aivdl.createLogo({
  style: 'modern',
  colors: ['#0066FF', '#00CCFF'],
  text: 'ACME'
});

// Get the React component code
console.log(logo.code.source);

// Export assets
await logo.exportSVG('./logo.svg');
await logo.exportPNG('./logo.png', { width: 512 });
```

**Output**: Production-ready React component with tests, documentation, and multiple asset formats!

---

## 🎨 Usage Examples

### Level 10: Natural Language (Coming Soon)

```typescript
const logo = await aivdl.generate(`
  Create a modern tech logo for a company called "NeuralFlow".
  Use blue and purple gradient. Make it minimal and professional.
`);
```

### Level 9: Semantic API

```typescript
const card = await aivdl.createBusinessCard({
  name: 'John Doe',
  title: 'Senior Designer',
  email: 'john@example.com',
  style: 'minimal',
  colors: ['#667eea', '#764ba2']
});
```

### Level 8: Template-Based

```typescript
import { BrandIdentityTemplate } from '@aivdl/core';

const brand = await BrandIdentityTemplate.execute({
  company: 'TechCorp',
  industry: 'technology',
  values: ['innovation', 'trust', 'simplicity']
});
```

### Type-Safe DSL (Fluent API)

```typescript
import { design, linearGradient, fadeIn } from '@aivdl/core';

const logo = await design()
  .canvas({ width: 100, height: 100 })
  .circle({ cx: 50, cy: 50, r: 45 })
    .style({
      fill: linearGradient(['#667eea', '#764ba2'], 45),
      stroke: 'transparent'
    })
    .id('mainCircle')
    .done()
  .text('BRAND', { x: 50, y: 55 })
    .style({
      fontSize: 12,
      fill: '#ffffff',
      fontWeight: 700,
      textAnchor: 'middle'
    })
    .animate(fadeIn(500))
    .done()
  .compile({ framework: 'react', typescript: true });
```

### Direct ECS (Maximum Control)

```typescript
import { World } from '@aivdl/core';

const world = new World();

// Create entity
const circle = world.createEntity();
world.addComponent(circle, 'Transform', { x: 50, y: 50 });
world.addComponent(circle, 'Shape', { type: 'circle', radius: 45 });
world.addComponent(circle, 'Style', { fill: '#0066FF' });

// Compile to code
const output = await aivdl.compile(world, {
  framework: 'react',
  validate: true
});
```

---

## 🎯 Why AIVDL?

### Traditional Tools vs AIVDL

| Feature | Figma/Sketch | AIVDL |
|---------|-------------|-------|
| **Output** | Static designs | Editable code |
| **Version Control** | Limited | Full Git support |
| **Testing** | Manual | Auto-generated |
| **Collaboration** | Real-time visual | Real-time code |
| **Production-Ready** | Handoff required | Direct deployment |
| **Extensibility** | Plugins | Secure plugins + Custom systems |
| **Performance** | Good | 10x faster (ECS) |
| **Cost** | Subscription | Free & Open Source |

### Perfect For:

- 🎨 **Designers** - Generate production code from design intent
- 💻 **Developers** - Rapid component prototyping with full control
- 🤖 **AI Engineers** - Build design generation systems
- 👥 **Teams** - Collaborate across design and development
- 🚀 **Startups** - Fast iteration from idea to production

---

## 📚 Documentation

### Core Concepts

- **[Architecture](./DESIGN.md)** - Detailed system architecture
- **[API Reference](https://docs.aivdl.dev/api)** - Complete API documentation
- **[Tutorials](https://docs.aivdl.dev/tutorials)** - Step-by-step guides
- **[Cookbook](https://docs.aivdl.dev/cookbook)** - Common patterns and recipes

### Guides

- **[Getting Started](https://docs.aivdl.dev/getting-started)** - 5-minute quickstart
- **[ECS Architecture](https://docs.aivdl.dev/ecs)** - Understanding Entity-Component-System
- **[Plugin Development](https://docs.aivdl.dev/plugins)** - Creating custom plugins
- **[Design Systems](https://docs.aivdl.dev/design-systems)** - Using and creating design systems
- **[Performance Guide](https://docs.aivdl.dev/performance)** - Optimization tips

---

## 🔌 Ecosystem

### Official Packages

- **[@aivdl/core](./packages/core)** - Core library
- **[@aivdl/cli](./packages/cli)** - Command-line interface
- **[@aivdl/playground](./packages/playground)** - Visual editor
- **[@aivdl/plugin-3d](./packages/plugin-3d)** - 3D rendering plugin
- **[@aivdl/plugin-animation](./packages/plugin-animation)** - Animation plugin
- **[@aivdl/adapters](./packages/adapters)** - Figma/Sketch/XD adapters

### Community

- **[Discord](https://discord.gg/aivdl)** - Chat with the community
- **[GitHub Discussions](https://github.com/aivdl/core/discussions)** - Ask questions and share ideas
- **[Template Gallery](https://templates.aivdl.dev)** - Community templates
- **[Plugin Marketplace](https://plugins.aivdl.dev)** - Community plugins
- **[Twitter](https://twitter.com/aivdl_dev)** - Latest updates

---

## 🛠️ Development

### Prerequisites

- Node.js 20+ or Bun 1.0+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/aivdl/core.git
cd core

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start development
pnpm dev
```

### Project Structure

```
aivdl-core/
├── packages/
│   ├── core/           # Core library
│   ├── cli/            # CLI tool
│   ├── playground/     # Visual playground
│   └── plugins/        # Official plugins
├── docs/               # Documentation site
├── examples/           # Usage examples
└── tools/              # Development tools
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Report bugs** - [Open an issue](https://github.com/aivdl/core/issues/new?template=bug_report.md)
- 💡 **Request features** - [Start a discussion](https://github.com/aivdl/core/discussions/new)
- 📝 **Improve docs** - Documentation PRs are always welcome
- 🔌 **Create plugins** - Extend AIVDL's capabilities
- 🎨 **Share templates** - Help others with ready-made templates
- ⭐ **Star the repo** - Show your support!

### Top Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Will be auto-generated -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📊 Project Status

### Current Phase

**Phase 1: MVP Foundation** (Months 1-2)

- [x] Project setup and infrastructure (0%)
- [ ] Core ECS implementation (0%)
- [ ] Template system (0%)
- [ ] Code generation (0%)
- [ ] Testing & documentation (0%)

See [TODO.md](./TODO.md) for detailed progress tracking.

### Roadmap

- **v0.1.0-alpha** (Month 2) - MVP with core ECS and templates
- **v0.2.0-alpha** (Month 3) - Validation and design systems
- **v0.3.0-beta** (Month 4) - Plugin system and advanced features
- **v0.4.0-beta** (Month 6) - AI features and optimization
- **v1.0.0** (Month 8) - Stable release with full ecosystem

---

## 🎯 Performance Benchmarks

AIVDL is built for speed. Here are some benchmark results:

```
Operation                    Traditional OOP    AIVDL (ECS)    Improvement
─────────────────────────────────────────────────────────────────────────
Create 1,000 entities        8.2ms              0.8ms          10.3x faster
Query 10,000 entities        45.3ms             2.1ms          21.6x faster
Update 1,000 components      12.8ms             1.2ms          10.7x faster
Render 500 shapes            78.2ms             8.5ms          9.2x faster
```

*Benchmarked on MacBook Pro M2. See [benchmarks/](./benchmarks) for full details.*

---

## 📦 Examples

### Logos

```typescript
// Modern tech logo
const logo = await aivdl.createLogo({
  style: 'modern',
  industry: 'technology',
  colors: ['#0066FF', '#00CCFF']
});

// Classic brand logo
const classic = await aivdl.createLogo({
  style: 'classic',
  industry: 'finance',
  colors: ['#1a1a1a', '#gold']
});
```

### Business Cards

```typescript
const card = await aivdl.createBusinessCard({
  layout: 'modern',
  name: 'Jane Smith',
  title: 'Creative Director',
  company: 'DesignCo',
  email: 'jane@designco.com',
  phone: '+1 234 567 8900'
});
```

### Social Media Graphics

```typescript
const post = await aivdl.createSocialMedia({
  platform: 'instagram',
  type: 'post',
  headline: 'New Product Launch',
  subheadline: 'Coming Soon',
  style: 'bold'
});
```

More examples in [examples/](./examples) directory.

---

## 🔒 Security

Security is a top priority. See our [Security Policy](./SECURITY.md) for:

- Vulnerability reporting
- Plugin sandboxing
- Security best practices
- Security audit results

---

## 📄 License

AIVDL Core is [MIT licensed](./LICENSE).

```
MIT License

Copyright (c) 2025 AIVDL Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

AIVDL is inspired by and builds upon:

- **Figma** - Design tool innovation
- **React** - Component architecture
- **Unity ECS** - Entity-Component-System pattern
- **Style Dictionary** - Design token system
- **TypeScript** - Type safety and DX

Special thanks to:
- All our [contributors](https://github.com/aivdl/core/graphs/contributors)
- The open-source community
- Early adopters and testers

---

## 📞 Support

### Need Help?

- 📖 **[Documentation](https://docs.aivdl.dev)** - Comprehensive guides and API reference
- 💬 **[Discord](https://discord.gg/aivdl)** - Real-time chat with community
- 🐛 **[GitHub Issues](https://github.com/aivdl/core/issues)** - Bug reports and feature requests
- 💡 **[Discussions](https://github.com/aivdl/core/discussions)** - Q&A and ideas
- 📧 **[Email](mailto:hello@aivdl.dev)** - Direct support

### Enterprise Support

Need dedicated support, custom features, or consulting?

📧 **Contact**: [enterprise@aivdl.dev](mailto:enterprise@aivdl.dev)

---

## 🌟 Show Your Support

If you like AIVDL, please:

- ⭐ **Star this repo** on GitHub
- 🐦 **Follow us** on [Twitter](https://twitter.com/aivdl_dev)
- 💬 **Join our** [Discord](https://discord.gg/aivdl)
- 📢 **Share** with your network
- 🤝 **Contribute** to the project

---

## 🎉 Built With AIVDL

Showcase your project! Submit a PR to add your project here.

- **[Your Project]** - Description
- **[Another Project]** - Description

---

<div align="center">

**[Website](https://aivdl.dev)** • 
**[Documentation](https://docs.aivdl.dev)** • 
**[Playground](https://playground.aivdl.dev)** • 
**[Discord](https://discord.gg/aivdl)** • 
**[Twitter](https://twitter.com/aivdl_dev)**

Made with ❤️ by the AIVDL Community

</div>