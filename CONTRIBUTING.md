# Contributing to AIVDL Core

First off, thank you for considering contributing to AIVDL! It's people like you that make AIVDL such a great tool. 🎉

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by the [AIVDL Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@aivdl.dev](mailto:conduct@aivdl.dev).

---

## 🚀 Getting Started

### What Should I Know Before I Get Started?

#### Project Structure

AIVDL Core is organized as a monorepo:

```
aivdl-core/
├── packages/
│   ├── core/           # Core library (@aivdl/core)
│   ├── cli/            # CLI tool (@aivdl/cli)
│   ├── playground/     # Visual playground
│   ├── types/          # Shared TypeScript types
│   ├── ecs/            # ECS implementation
│   ├── compiler/       # Creative compiler
│   └── plugins/        # Official plugins
├── docs/               # Documentation (Docusaurus)
├── examples/           # Usage examples
├── tools/              # Development tools
└── tests/              # Integration tests
```

#### Architecture

Before contributing, please read:

1. **[DESIGN.md](./DESIGN.md)** - Complete architecture documentation
2. **[TODO.md](./TODO.md)** - Current development priorities
3. **[API Documentation](https://docs.aivdl.dev/api)** - API reference

#### Key Technologies

- **Language**: TypeScript 5.3+ (strict mode)
- **Build**: pnpm workspaces + Turborepo
- **Testing**: Vitest + Playwright
- **Linting**: ESLint 9 (flat config)
- **Formatting**: Prettier

---

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting a Bug Report:**

- Check the [documentation](https://docs.aivdl.dev)
- Search [existing issues](https://github.com/aivdl/core/issues) to avoid duplicates
- Collect information about the bug:
  - Stack trace
  - OS, Node.js version
  - Steps to reproduce
  - Expected vs actual behavior

**How to Submit a Good Bug Report:**

Bugs are tracked as [GitHub issues](https://github.com/aivdl/core/issues). Create an issue using the bug report template and provide the following:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** - Include code snippets
- **Describe the behavior you observed** and **expected**
- **Include screenshots** if applicable
- **Include environment details** (OS, Node version, etc.)

### Suggesting Enhancements 💡

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

**Before Submitting an Enhancement:**

- Check if the enhancement is already [in the roadmap](./TODO.md)
- Search [discussions](https://github.com/aivdl/core/discussions) for similar suggestions
- Determine which package the enhancement should belong to

**How to Submit a Good Enhancement Suggestion:**

Enhancement suggestions are tracked as [GitHub Discussions](https://github.com/aivdl/core/discussions). Create a discussion and provide the following:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List some examples** of how it would be used
- **Mention other tools** where this enhancement exists (if any)

### Your First Code Contribution 🎯

Unsure where to begin? Start with these:

#### Good First Issues

Look for issues labeled `good first issue` - these are specifically chosen for newcomers:

- [Good First Issues](https://github.com/aivdl/core/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

#### Help Wanted

More challenging issues that need attention:

- [Help Wanted Issues](https://github.com/aivdl/core/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

#### Documentation

Documentation improvements are always welcome:

- Fixing typos
- Improving explanations
- Adding examples
- Creating tutorials

---

## 💻 Development Setup

### Prerequisites

- **Node.js**: 20+ or Bun 1.0+
- **pnpm**: 8+ (Install: `npm install -g pnpm`)
- **Git**: Latest version

### Installation

1. **Fork the repository** on GitHub

2. **Clone your fork:**

```bash
git clone https://github.com/YOUR_USERNAME/core.git
cd core
```

3. **Add upstream remote:**

```bash
git remote add upstream https://github.com/aivdl/core.git
```

4. **Install dependencies:**

```bash
pnpm install
```

5. **Build packages:**

```bash
pnpm build
```

6. **Run tests:**

```bash
pnpm test
```

### Development Workflow

1. **Create a branch:**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make your changes**

3. **Run tests:**

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test --filter @aivdl/core

# Run with coverage
pnpm test:coverage
```

4. **Check code quality:**

```bash
# Lint
pnpm lint

# Type check
pnpm type-check

# Format
pnpm format
```

5. **Build:**

```bash
pnpm build
```

6. **Commit your changes** (see [Commit Messages](#commit-messages))

7. **Push to your fork:**

```bash
git push origin feature/your-feature-name
```

8. **Create a Pull Request** (see [Pull Request Process](#pull-request-process))

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Read and follow all instructions in the [pull request template](./github/PULL_REQUEST_TEMPLATE.md)
- [ ] Check your code follows the [coding standards](#coding-standards)
- [ ] Add/update tests for your changes
- [ ] Update documentation if needed
- [ ] Ensure all tests pass locally
- [ ] Update CHANGELOG.md (if applicable)

### PR Guidelines

1. **One PR, One Concern**
   - Each PR should address a single concern
   - Split large changes into multiple PRs

2. **Descriptive Title**
   - Use format: `feat: add feature X` or `fix: resolve issue Y`
   - Follow [Conventional Commits](https://www.conventionalcommits.org/)

3. **Detailed Description**
   - Explain what changes you made and why
   - Reference related issues: `Closes #123`
   - Add screenshots/videos for UI changes

4. **Tests**
   - Add unit tests for new features
   - Add integration tests if applicable
   - Ensure coverage doesn't decrease

5. **Documentation**
   - Update relevant documentation
   - Add JSDoc comments to new functions
   - Update README.md if needed

### Review Process

1. **Automated Checks**
   - CI must pass (tests, linting, type-checking)
   - Coverage must be maintained (>80%)

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Keep discussions respectful and constructive

3. **Merging**
   - Maintainer will merge after approval
   - PR will be squashed into a single commit
   - Your contribution will be added to CHANGELOG.md

---

## 📝 Coding Standards

### TypeScript Style Guide

#### General Rules

```typescript
// ✅ DO: Use descriptive names
function calculateLayoutConstraints(entities: EntityId[]): Layout {
  // Implementation
}

// ❌ DON'T: Use abbreviations or unclear names
function calcLC(e: EntityId[]): Layout {
  // Implementation
}
```

#### Type Safety

```typescript
// ✅ DO: Explicit types for public APIs
export function createEntity(options: CreateEntityOptions): EntityId {
  // Implementation
}

// ❌ DON'T: Use 'any' type
export function createEntity(options: any): any {
  // Implementation
}
```

#### Interfaces vs Types

```typescript
// ✅ DO: Use interfaces for objects
interface ComponentData {
  x: number;
  y: number;
}

// ✅ DO: Use types for unions, intersections
type Status = 'idle' | 'loading' | 'success' | 'error';
```

#### Async/Await

```typescript
// ✅ DO: Use async/await
async function loadWorld(): Promise<World> {
  const data = await fetchData();
  return deserialize(data);
}

// ❌ DON'T: Use Promise chains (unless necessary)
function loadWorld(): Promise<World> {
  return fetchData()
    .then(data => deserialize(data));
}
```

### Code Organization

```typescript
// File structure template
// 1. Imports (external, internal, types)
import { Component } from 'external-lib';
import { World } from '../core/world';
import type { EntityId } from '../types';

// 2. Type definitions
interface MyComponentData {
  value: number;
}

// 3. Constants
const DEFAULT_VALUE = 0;

// 4. Main implementation
export class MyComponent implements Component {
  // Implementation
}

// 5. Helper functions (if any)
function helperFunction(): void {
  // Implementation
}
```

### Comments and Documentation

```typescript
/**
 * Creates a new entity in the world.
 * 
 * @param world - The world to create the entity in
 * @param components - Optional components to add
 * @returns The ID of the created entity
 * 
 * @example
 * ```typescript
 * const world = new World();
 * const entityId = createEntity(world, {
 *   Transform: { x: 0, y: 0 },
 *   Style: { fill: '#FF0000' }
 * });
 * ```
 */
export function createEntity(
  world: World,
  components?: Record<string, unknown>
): EntityId {
  // Implementation
}
```

### Error Handling

```typescript
// ✅ DO: Use custom error classes
class ValidationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ DO: Provide helpful error messages
if (!isValidColor(color)) {
  throw new ValidationError(
    `Invalid color value: "${color}". Use a valid CSS color or token reference.`,
    'INVALID_COLOR'
  );
}

// ❌ DON'T: Generic error messages
if (!isValidColor(color)) {
  throw new Error('Invalid color');
}
```

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { World } from '../world';

describe('World', () => {
  let world: World;
  
  beforeEach(() => {
    world = new World();
  });
  
  describe('createEntity()', () => {
    it('should create a unique entity ID', () => {
      const entity1 = world.createEntity();
      const entity2 = world.createEntity();
      
      expect(entity1).not.toBe(entity2);
      expect(world.exists(entity1)).toBe(true);
    });
    
    it('should throw error for invalid input', () => {
      expect(() => {
        world.createEntity({ invalid: true });
      }).toThrow('Invalid entity options');
    });
  });
});
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the code does, not how
   - Avoid testing private methods directly

2. **Descriptive Test Names**
   ```typescript
   // ✅ DO
   it('should return null when entity does not exist', () => {});
   
   // ❌ DON'T
   it('test getComponent', () => {});
   ```

3. **AAA Pattern** (Arrange, Act, Assert)
   ```typescript
   it('should add component to entity', () => {
     // Arrange
     const entity = world.createEntity();
     const data = { x: 10, y: 20 };
     
     // Act
     world.addComponent(entity, 'Transform', data);
     
     // Assert
     expect(world.getComponent(entity, 'Transform')).toEqual(data);
   });
   ```

4. **Edge Cases**
   - Test boundary conditions
   - Test error conditions
   - Test empty/null inputs

5. **Coverage Goals**
   - Aim for >80% overall coverage
   - 100% coverage for critical paths
   - Use `pnpm test:coverage` to check

---

## 📚 Documentation

### Code Documentation

All public APIs must have JSDoc comments:

```typescript
/**
 * Brief description of what this does.
 * 
 * Detailed explanation if needed. Can be multiple paragraphs.
 * 
 * @param paramName - Description of parameter
 * @param optionalParam - Optional parameter (indicated by ?)
 * @returns Description of return value
 * 
 * @throws {ErrorType} When this error occurs
 * 
 * @example
 * ```typescript
 * // Example usage
 * const result = myFunction('value', 42);
 * ```
 * 
 * @see {@link RelatedFunction} for related functionality
 * @since 1.0.0
 */
export function myFunction(
  paramName: string,
  optionalParam?: number
): ReturnType {
  // Implementation
}
```

### Markdown Documentation

When contributing to docs:

1. **Use clear headings**
   ```markdown
   # Main Title (H1)
   ## Section (H2)
   ### Subsection (H3)
   ```

2. **Code examples**
   - Always include language identifier
   - Add comments to explain complex code
   - Show both usage and output

3. **Links**
   - Use relative links for internal docs
   - Use absolute links for external resources

4. **Formatting**
   - Bold for **important** concepts
   - Italic for *emphasis*
   - Code for `inline code`
   - Blockquotes for notes/warnings

### Documentation Types

- **README.md** - Project overview and quick start
- **DESIGN.md** - Architecture and design decisions
- **API docs** - Generated from JSDoc comments
- **Guides** - Step-by-step tutorials
- **Cookbook** - Common patterns and recipes

---

## 💬 Community

### Communication Channels

- **[Discord](https://discord.gg/aivdl)** - Real-time chat
  - `#general` - General discussion
  - `#help` - Get help
  - `#contributors` - Contributor chat
  - `#showcase` - Show your work

- **[GitHub Discussions](https://github.com/aivdl/core/discussions)** - Async discussions
  - Q&A
  - Feature requests
  - Ideas and brainstorming

- **[Twitter](https://twitter.com/aivdl_dev)** - Announcements and updates

### Getting Help

If you need help:

1. Check the [documentation](https://docs.aivdl.dev)
2. Search [existing issues](https://github.com/aivdl/core/issues) and [discussions](https://github.com/aivdl/core/discussions)
3. Ask in Discord `#help` channel
4. Create a new discussion on GitHub

### Office Hours

Join our weekly office hours every Friday:
- **Time**: 10:00 AM PST / 1:00 PM EST / 6:00 PM GMT
- **Where**: Discord voice channel
- **What**: Q&A, pair programming, design discussions

---

## 🎯 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **ci**: CI/CD changes

### Examples

```bash
# Simple commit
feat: add logo generation API

# With scope
feat(compiler): add incremental compilation

# With body
fix(ecs): resolve memory leak in component storage

Component storage was not properly cleaning up removed components,
causing memory usage to grow over time.

Closes #123

# Breaking change
feat(api)!: redesign plugin API

BREAKING CHANGE: Plugin.install() now receives SandboxedAIVDL instead of AIVDL
```

### Rules

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep subject line under 72 characters
- Separate subject from body with blank line
- Wrap body at 72 characters
- Use body to explain what and why, not how

---

## 🏆 Recognition

Contributors are recognized in multiple ways:

- Listed in [Contributors section](https://github.com/aivdl/core#contributors)
- Mentioned in release notes
- Featured in monthly community highlights
- Invited to contributor Discord channels
- Opportunity to become maintainer

---

## 📜 License

By contributing to AIVDL, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

## ❓ Questions?

Don't hesitate to ask questions! We're here to help:

- 💬 [Discord](https://discord.gg/aivdl)
- 💡 [GitHub Discussions](https://github.com/aivdl/core/discussions)
- 📧 [Email](mailto:contributors@aivdl.dev)

---

**Thank you for contributing to AIVDL! 🎉**

Your contributions make this project better for everyone.