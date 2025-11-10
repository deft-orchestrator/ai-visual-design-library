# AGENTS.md - AI Agent Development Guide

> **Purpose**: This document serves as a comprehensive guide for AI agents (like Claude, GPT-4, etc.) working on the AIVDL Core project. It provides context, workflows, best practices, and decision-making frameworks to ensure consistent, high-quality contributions.

---

## 📋 Table of Contents

- [Agent Overview](#agent-overview)
- [Project Context](#project-context)
- [Core Principles](#core-principles)
- [Development Workflow](#development-workflow)
- [Task Execution Guidelines](#task-execution-guidelines)
- [Code Generation Standards](#code-generation-standards)
- [Decision-Making Framework](#decision-making-framework)
- [Communication Protocols](#communication-protocols)
- [Quality Assurance](#quality-assurance)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## 🤖 Agent Overview

### Purpose of This Document

This guide enables AI agents to:
- **Understand** the project architecture and philosophy
- **Make consistent** technical decisions aligned with project goals
- **Generate** production-quality code that fits the existing codebase
- **Collaborate** effectively with human developers
- **Maintain** high standards across all contributions

### Target Agents

- **Code Generation**: Claude, GPT-4, Copilot
- **Code Review**: Automated review tools with LLM backends
- **Documentation**: Doc generation and maintenance agents
- **Testing**: Test generation and validation agents
- **Refactoring**: Code quality improvement agents

---

## 🎯 Project Context

### What is AIVDL Core?

AIVDL Core is a **TypeScript library** for generating visual designs through **Direct Code Execution**. Key characteristics:

1. **Code-First**: Generate editable code, not just static images
2. **ECS Architecture**: High-performance Entity-Component-System
3. **10-Level Abstraction**: From natural language to raw performance
4. **Production-Ready**: Auto-generated tests, validation, documentation
5. **Extensible**: Secure plugin system with sandboxing

### Critical Context Documents

**Before working on any task, read:**

1. **[DESIGN.md](./DESIGN.md)** - Complete architecture (MANDATORY)
2. **[TODO.md](./TODO.md)** - Current priorities and progress
3. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Development standards
4. **[README.md](./README.md)** - Project overview

### Project Philosophy

```
"Code is the source of truth, validated by design intent"
```

**Core Values**:
- **Transparency**: Every design decision is traceable
- **Performance**: Benchmarked and measured
- **Type Safety**: Strict TypeScript, no `any`
- **Testability**: >80% coverage requirement
- **Documentation**: JSDoc on all public APIs

---

## 🧭 Core Principles

### 1. Code-First Thinking

```typescript
// ✅ GOOD: Generate clean, editable code
export const Logo: React.FC<{ size?: number }> = ({ size = 100 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Clear, semantic SVG */}
    </svg>
  );
};

// ❌ BAD: Obfuscated or generated-looking code
export const a=({b=100})=><svg width={b} height={b}><circle cx="50" cy="50" r="45" fill="url(#g)"/></svg>;
```

### 2. ECS Architecture Adherence

**Always respect the ECS pattern**:
- **Entities**: Just IDs, no data
- **Components**: Pure data, no logic
- **Systems**: Pure logic, no data storage

```typescript
// ✅ GOOD: Proper ECS separation
interface Transform {
  x: number;
  y: number;
  rotation: number;
}

class LayoutSystem implements System {
  execute(world: World, deltaTime: number): void {
    // Pure logic, operates on components
  }
}

// ❌ BAD: Mixing concerns
class Entity {
  x: number;
  y: number;
  update() { /* logic in entity */ }
}
```

### 3. Type Safety First

```typescript
// ✅ GOOD: Explicit, strict types
export function createEntity(
  world: World,
  components: Record<string, ComponentData>
): EntityId {
  // Implementation
}

// ❌ BAD: Loose typing
export function createEntity(world: any, components: any): any {
  // Implementation
}
```

### 4. Performance Consciousness

Always consider:
- **Big O complexity**: Document time/space complexity
- **Memory allocation**: Prefer reuse over creation
- **Cache efficiency**: Use Structure of Arrays (SoA)
- **Benchmark**: Measure, don't guess

### 5. Documentation is Code

```typescript
/**
 * Creates a new entity in the world.
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * 
 * @param world - The world to create the entity in
 * @returns The ID of the created entity
 * 
 * @example
 * ```typescript
 * const world = new World();
 * const entity = createEntity(world);
 * ```
 */
export function createEntity(world: World): EntityId {
  // Implementation
}
```

---

## 🔄 Development Workflow

### Step 1: Task Selection

**From TODO.md**:
1. Check current phase and week
2. Find unassigned task matching your capabilities
3. Verify dependencies are met
4. Estimate complexity and time

**Priority Order**:
1. 🔴 Critical (blocking other work)
2. 🟡 High (important for milestone)
3. 🟠 Medium (nice to have)
4. 🟢 Low (future enhancement)

### Step 2: Context Gathering

**Required Reading** (in order):
1. **Task description** in TODO.md
2. **Related sections** in DESIGN.md
3. **Existing code** in the relevant package
4. **Tests** for similar functionality
5. **Dependencies** that the task relies on

**Create Mental Model**:
- What problem does this solve?
- How does it fit into the architecture?
- What are the interfaces?
- What edge cases exist?

### Step 3: Design Before Code

**Always start with design**:

```typescript
// 1. Define interfaces first
interface MyComponent {
  data: number;
  validate(): boolean;
}

// 2. Sketch the API
class MySystem implements System {
  name = 'MySystem';
  query = { all: ['MyComponent'] };
  execute(world: World, deltaTime: number): void;
}

// 3. Document expected behavior
/**
 * MySystem processes entities with MyComponent
 * 
 * Behavior:
 * - Validates component data
 * - Updates based on deltaTime
 * - Handles edge cases: negative values, zero, overflow
 */
```

### Step 4: Implementation

**Follow TDD** (Test-Driven Development):

```typescript
// 1. Write test first
describe('MySystem', () => {
  it('should process valid components', () => {
    const world = new World();
    const entity = world.createEntity();
    world.addComponent(entity, 'MyComponent', { data: 10 });
    
    const system = new MySystem();
    system.execute(world, 1);
    
    const component = world.getComponent(entity, 'MyComponent');
    expect(component.data).toBe(11); // Example expectation
  });
});

// 2. Implement to pass test
class MySystem implements System {
  execute(world: World, deltaTime: number): void {
    const entities = world.query(this.query);
    for (const entity of entities) {
      const component = world.getComponent(entity, 'MyComponent');
      if (component.validate()) {
        component.data += deltaTime;
      }
    }
  }
}

// 3. Refactor while keeping tests green
```

### Step 5: Quality Checks

**Before marking complete**:
- [ ] All tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Code formatted (`pnpm format`)
- [ ] JSDoc complete on public APIs
- [ ] README/docs updated if needed
- [ ] Performance benchmarks run (if applicable)
- [ ] Coverage >80% maintained

### Step 6: Documentation

**Update these files**:
1. **TODO.md**: Mark task complete, update progress
2. **CHANGELOG.md**: Add to unreleased section
3. **Package README**: If public API changed
4. **API docs**: Auto-generated from JSDoc
5. **Examples**: Add usage example if new feature

---

## 📝 Task Execution Guidelines

### Understanding Task Descriptions

**Task Format in TODO.md**:
```markdown
#### 1.2 Entity Manager
- [ ] Implement EntityId type system
- [ ] Create EntityManager class
  - [ ] `create()` - Create new entity
  - [ ] `destroy()` - Destroy entity

**Priority**: 🔴 Critical
**Estimated Time**: 2-3 days
**Assignee**: TBD
**Dependencies**: 1.1
**Progress**: 0/10 tasks
```

**Parse**:
- **What**: Implement EntityId type system
- **Where**: packages/ecs/entity.ts
- **Why**: Core ECS requirement
- **Dependencies**: Project setup (1.1) must be done
- **Success Criteria**: Type system defined, tests pass

### Breaking Down Complex Tasks

**For large tasks (>1 day)**:

```markdown
Task: Implement Component System

Sub-tasks:
1. Define Component interface [2h]
2. Create ComponentStorage (SoA) [4h]
3. Implement add/get/update/remove [3h]
4. Add validation pipeline [2h]
5. Write comprehensive tests [4h]
6. Document API [2h]
7. Benchmark operations [2h]

Total: ~19h = 2.5 days
```

### Handling Ambiguity

**If task is unclear**:

1. **Check related docs** (DESIGN.md, existing code)
2. **Make reasonable assumptions** based on project patterns
3. **Document assumptions** in code comments
4. **Ask for clarification** if truly blocked

**Example**:
```typescript
/**
 * Component validation system.
 * 
 * ASSUMPTION: Validation runs on add/update but not on get
 * for performance reasons. This follows the ECS pattern
 * of validating writes but not reads.
 * 
 * If this assumption is incorrect, refactor to validate
 * on reads as well.
 */
```

---

## 💻 Code Generation Standards

### File Structure Template

```typescript
/**
 * @file Brief description of file purpose
 * @module @aivdl/package-name
 */

// 1. External imports (alphabetical)
import { external } from 'external-package';

// 2. Internal imports (alphabetical by type)
import { World } from '../core/world';
import { System } from '../core/system';

// 3. Type imports
import type { EntityId, ComponentData } from '../types';

// 4. Type definitions
interface MyData {
  value: number;
}

// 5. Constants
const DEFAULT_VALUE = 0;

// 6. Main implementation
export class MyClass {
  // Implementation
}

// 7. Helper functions (private)
function helperFunction(): void {
  // Implementation
}
```

### Naming Conventions

```typescript
// Classes: PascalCase
class EntityManager { }

// Interfaces: PascalCase
interface ComponentData { }

// Types: PascalCase
type EntityId = number;

// Functions: camelCase
function createEntity(): EntityId { }

// Variables: camelCase
const entityCount = 0;

// Constants: UPPER_SNAKE_CASE
const MAX_ENTITIES = 1000000;

// Private members: prefix with underscore
class World {
  private _entities: Map<EntityId, Entity>;
}

// Generic parameters: Single uppercase letter or PascalCase
function query<T>(predicate: (item: T) => boolean): T[] { }
function createComponent<TData extends ComponentData>(): TData { }
```

### Error Handling

```typescript
// ✅ GOOD: Custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, ValidationError);
  }
}

// ✅ GOOD: Descriptive error messages
if (!world.exists(entityId)) {
  throw new ValidationError(
    `Entity ${entityId} does not exist in world. ` +
    `Possible causes: entity was destroyed, or never created.`,
    'ENTITY_NOT_FOUND',
    { entityId, worldEntityCount: world.entityCount }
  );
}

// ❌ BAD: Generic errors
if (!world.exists(entityId)) {
  throw new Error('Entity not found');
}
```

### Testing Patterns

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('EntityManager', () => {
  let manager: EntityManager;
  
  beforeEach(() => {
    manager = new EntityManager();
  });
  
  afterEach(() => {
    manager.cleanup();
  });
  
  describe('create()', () => {
    it('should create unique entity IDs', () => {
      // Arrange
      const count = 100;
      
      // Act
      const ids = Array.from({ length: count }, () => manager.create());
      
      // Assert
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(count);
    });
    
    it('should handle rapid creation', () => {
      // Arrange & Act
      const start = performance.now();
      const ids = Array.from({ length: 10000 }, () => manager.create());
      const duration = performance.now() - start;
      
      // Assert
      expect(ids.length).toBe(10000);
      expect(duration).toBeLessThan(100); // < 100ms for 10k entities
    });
    
    it('should throw on invalid input', () => {
      // Arrange & Act & Assert
      expect(() => {
        manager.create({ invalid: true } as any);
      }).toThrow(ValidationError);
    });
  });
  
  describe('destroy()', () => {
    it('should remove entity', () => {
      // Arrange
      const entity = manager.create();
      
      // Act
      manager.destroy(entity);
      
      // Assert
      expect(manager.exists(entity)).toBe(false);
    });
    
    it('should be idempotent', () => {
      // Arrange
      const entity = manager.create();
      
      // Act
      manager.destroy(entity);
      manager.destroy(entity); // Should not throw
      
      // Assert
      expect(manager.exists(entity)).toBe(false);
    });
  });
});
```

### Performance Benchmarking

```typescript
import { bench, describe } from 'vitest';

describe('EntityManager Benchmarks', () => {
  bench('create 1000 entities', () => {
    const manager = new EntityManager();
    for (let i = 0; i < 1000; i++) {
      manager.create();
    }
  });
  
  bench('destroy 1000 entities', () => {
    const manager = new EntityManager();
    const entities = Array.from({ length: 1000 }, () => manager.create());
    
    return () => {
      entities.forEach(id => manager.destroy(id));
    };
  });
  
  bench('exists check (hit)', () => {
    const manager = new EntityManager();
    const entity = manager.create();
    
    return () => {
      manager.exists(entity);
    };
  });
  
  bench('exists check (miss)', () => {
    const manager = new EntityManager();
    
    return () => {
      manager.exists(99999);
    };
  });
});
```

---

## 🎯 Decision-Making Framework

### When to Use Different Approaches

#### Data Structures

```typescript
// Use Map for O(1) lookups with any key type
const entities = new Map<EntityId, Entity>();

// Use Set for unique values with O(1) checks
const activeEntities = new Set<EntityId>();

// Use Array for ordered data, iteration
const systems: System[] = [];

// Use TypedArray for numeric data, memory efficiency
const positions = new Float32Array(capacity * 2); // x, y
```

#### Design Patterns

```typescript
// Factory Pattern: Creating complex objects
class EntityFactory {
  createLogo(options: LogoOptions): EntityId {
    const entity = this.world.createEntity();
    // Complex setup
    return entity;
  }
}

// Strategy Pattern: Different algorithms
interface LayoutStrategy {
  calculate(entities: EntityId[]): Layout;
}

// Observer Pattern: Event handling
class World {
  private observers = new Map<string, Set<Observer>>();
  
  watch(event: string, observer: Observer): void {
    // Implementation
  }
}

// Command Pattern: Undo/Redo
interface Command {
  execute(): void;
  undo(): void;
}
```

#### Optimization Decisions

**When to optimize**:
1. **Profile first**: Identify actual bottlenecks
2. **Measure impact**: Before/after benchmarks
3. **Document tradeoffs**: Complexity vs performance

```typescript
// ✅ GOOD: Optimized when proven necessary
/**
 * Query entities with caching.
 * 
 * OPTIMIZATION: Caches query results for identical queries.
 * Benchmark: 10x faster for repeated queries (2ms vs 20ms for 10k entities)
 * Tradeoff: +8KB memory per cached query
 */
class QueryEngine {
  private cache = new Map<string, EntityId[]>();
  
  query(query: ComponentQuery): EntityId[] {
    const key = JSON.stringify(query);
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    // Compute and cache
  }
}

// ❌ BAD: Premature optimization
// Optimized before profiling, adds complexity without proven benefit
```

### Handling Edge Cases

**Always consider**:

```typescript
// Null/undefined
function getValue(entity: EntityId): number | null {
  if (!world.exists(entity)) return null;
  // ...
}

// Empty collections
function processEntities(entities: EntityId[]): void {
  if (entities.length === 0) return; // Early return
  // ...
}

// Boundary values
function setOpacity(value: number): void {
  if (value < 0 || value > 1) {
    throw new ValidationError(
      `Opacity must be between 0 and 1, got ${value}`,
      'INVALID_OPACITY'
    );
  }
  // ...
}

// Integer overflow
function generateId(): EntityId {
  if (this.nextId >= Number.MAX_SAFE_INTEGER) {
    throw new Error('Entity ID overflow');
  }
  return this.nextId++;
}

// Concurrent modification
function removeDeadEntities(): void {
  // Create copy to avoid modifying during iteration
  const toRemove = [...this.entities].filter(e => e.isDead);
  toRemove.forEach(e => this.destroy(e.id));
}
```

---

## 💬 Communication Protocols

### Code Comments

```typescript
// ✅ GOOD: Explains "why", not "what"
// Using Float32Array for better cache locality and reduced memory
// This gives us 40% performance improvement in benchmarks
const positions = new Float32Array(capacity * 2);

// ❌ BAD: Explains "what" (obvious from code)
// Create a Float32Array
const positions = new Float32Array(capacity * 2);

// ✅ GOOD: Warns about gotchas
// IMPORTANT: This function modifies the world state
// Callers should create snapshots before calling if rollback is needed
function dangerousOperation(world: World): void {
  // ...
}

// ✅ GOOD: Documents assumptions
// ASSUMPTION: Components are validated on write, not read
// This assumes write-heavy workload. For read-heavy, consider
// validating on read instead.
function getComponent<T>(entityId: EntityId, type: string): T {
  // ...
}

// ✅ GOOD: TODOs with context
// TODO(@agent): Implement spatial partitioning for queries
// Current O(n) query is fine for <1000 entities but will need
// optimization for larger worlds. Consider quadtree or grid.
function queryInRegion(bounds: Rect): EntityId[] {
  // Current linear implementation
}
```

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

<body>

<footer>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style (formatting, semicolons, etc.)
refactor: Code refactoring
perf:     Performance improvement
test:     Adding/updating tests
chore:    Build process, dependencies, etc.

# Examples
feat(ecs): implement entity manager with batch operations

Implements core EntityManager class with:
- create() - O(1) entity creation
- destroy() - O(1) entity removal
- batch operations for bulk creation/destruction

Performance: Benchmarked at 100k ops/sec for creation

Closes #123

# Breaking change
feat(api)!: redesign component validation API

BREAKING CHANGE: validate() now returns ValidationResult instead of boolean.
Migration: change `if (validate(data))` to `if (validate(data).valid)`
```

### Documentation Updates

**When adding new features**:

```typescript
// 1. JSDoc on implementation
/**
 * Creates multiple entities in batch.
 * 
 * This is 3x faster than calling create() in a loop due to
 * reduced allocation overhead.
 * 
 * @param count - Number of entities to create
 * @returns Array of created entity IDs
 * 
 * @example
 * ```typescript
 * const manager = new EntityManager();
 * const entities = manager.createBatch(100);
 * // Created 100 entities efficiently
 * ```
 * 
 * @throws {ValidationError} If count is negative or exceeds limit
 */
public createBatch(count: number): EntityId[] {
  // Implementation
}

// 2. Update package README
// Add to ## API Reference section

// 3. Add to examples/
// Create examples/entity-management.ts

// 4. Update CHANGELOG.md
// Add to [Unreleased] section under ### Added
```

---

## ✅ Quality Assurance

### Pre-Submission Checklist

**Every contribution must**:

```markdown
Code Quality:
- [ ] Follows TypeScript strict mode
- [ ] No `any` types (except for truly dynamic data)
- [ ] Descriptive variable/function names
- [ ] Error handling for edge cases
- [ ] No console.log (use proper logging)

Testing:
- [ ] Unit tests for all public functions
- [ ] Edge case tests
- [ ] Performance benchmarks (if applicable)
- [ ] Coverage >80% maintained
- [ ] All tests pass locally

Documentation:
- [ ] JSDoc on all public APIs
- [ ] Inline comments for complex logic
- [ ] README updated (if public API changed)
- [ ] Examples added (if new feature)
- [ ] CHANGELOG.md updated

Code Review:
- [ ] Self-reviewed diff
- [ ] No debug code or commented-out blocks
- [ ] Follows existing patterns
- [ ] Breaking changes documented
```

### Self-Review Process

**Before marking complete**:

```typescript
// 1. Read your own code as if reviewing someone else's
// Ask:
// - Is this clear?
// - Can I simplify this?
// - Are there edge cases?
// - Is this well-tested?

// 2. Check against DESIGN.md principles
// - Does it follow ECS architecture?
// - Is it performant?
// - Is it type-safe?

// 3. Verify integration
// - Does it work with existing code?
// - Does it match the API design?
// - Are there breaking changes?

// 4. Run full test suite
pnpm test           // All tests
pnpm test:coverage  // Check coverage
pnpm lint           // Linting
pnpm type-check     // Type safety
pnpm build          // Build succeeds

// 5. Manual testing (if UI/CLI)
// - Try the happy path
// - Try error cases
// - Try edge cases
```

### Common Issues to Avoid

```typescript
// ❌ Memory Leaks
class BadComponent {
  private listeners: Set<Function> = new Set();
  
  addListener(fn: Function): void {
    this.listeners.add(fn);
    // ❌ Never removed!
  }
}

// ✅ Proper cleanup
class GoodComponent {
  private listeners: Set<Function> = new Set();
  
  addListener(fn: Function): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn); // Return unsubscribe
  }
  
  cleanup(): void {
    this.listeners.clear();
  }
}

// ❌ Race Conditions
async function badAsync(): Promise<void> {
  const data = await fetchData();
  this.processData(data); // What if fetchData() called twice?
}

// ✅ Proper synchronization
async function goodAsync(): Promise<void> {
  if (this.loading) return; // Guard
  this.loading = true;
  try {
    const data = await fetchData();
    this.processData(data);
  } finally {
    this.loading = false;
  }
}

// ❌ Mutation of external data
function badFunction(data: MyData[]): MyData[] {
  data.sort(); // ❌ Mutates input!
  return data;
}

// ✅ Immutable operations
function goodFunction(data: MyData[]): MyData[] {
  return [...data].sort(); // Copy first
}
```

---

## 📚 Common Scenarios

### Scenario 1: Implementing a New Component

**Steps**:

1. **Define interface** in packages/types/
```typescript
export interface MyComponent {
  value: number;
  enabled: boolean;
}
```

2. **Create validation schema**
```typescript
const MyComponentSchema = z.object({
  value: z.number(),
  enabled: z.boolean()
});
```

3. **Register component**
```typescript
export const MyComponentDef: ComponentDefinition<MyComponent> = {
  name: 'MyComponent',
  schema: MyComponentSchema,
  default: () => ({ value: 0, enabled: true }),
  validate: (data) => {
    if (data.value < 0) {
      return { valid: false, errors: ['value must be >= 0'] };
    }
    return { valid: true };
  }
};
```

4. **Write tests**
```typescript
describe('MyComponent', () => {
  it('should validate correct data', () => {
    const result = MyComponentDef.validate({ value: 10, enabled: true });
    expect(result.valid).toBe(true);
  });
  
  it('should reject negative values', () => {
    const result = MyComponentDef.validate({ value: -1, enabled: true });
    expect(result.valid).toBe(false);
  });
});
```

5. **Document**
```typescript
/**
 * MyComponent stores custom data.
 * 
 * @example
 * ```typescript
 * world.addComponent(entity, 'MyComponent', {
 *   value: 42,
 *   enabled: true
 * });
 * ```
 */
```

### Scenario 2: Implementing a New System

**Steps**:

1. **Define system class**
```typescript
export class MySystem implements System {
  name = 'MySystem';
  priority = 100;
  enabled = true;
  query: ComponentQuery = {
    all: ['MyComponent']
  };
  
  execute(world: World, deltaTime: number): void {
    const entities = world.query(this.query);
    for (const entity of entities) {
      this.processEntity(entity, world, deltaTime);
    }
  }
  
  private processEntity(
    entity: EntityId,
    world: World,
    deltaTime: number
  ): void {
    // Logic here
  }
  
  getMetrics(): SystemMetrics {
    return {
      averageExecutionTime: 0,
      peakExecutionTime: 0,
      entityCount: 0
    };
  }
}
```

2. **Write comprehensive tests**
```typescript
describe('MySystem', () => {
  let world: World;
  let system: MySystem;
  
  beforeEach(() => {
    world = new World();
    system = new MySystem();
  });
  
  it('should process entities with MyComponent', () => {
    const entity = world.createEntity();
    world.addComponent(entity, 'MyComponent', { value: 10, enabled: true });
    
    system.execute(world, 1);
    
    // Assert behavior
  });
  
  it('should skip disabled components', () => {
    const entity = world.createEntity();
    world.addComponent(entity, 'MyComponent', { value: 10, enabled: false });
    
    system.execute(world, 1);
    
    // Assert no changes
  });
  
  it('should handle empty world', () => {
    expect(() => system.execute(world, 1)).not.toThrow();
  });
});
```

3. **Benchmark if performance-critical**
```typescript
bench('MySystem with 1000 entities', () => {
  const world = new World();
  for (let i = 0; i < 1000; i++) {
    const entity = world.createEntity();
    world.addComponent(entity, 'MyComponent', { value: i, enabled: true });
  }
  const system = new MySystem();
  
  return () => {
    system.execute(world, 1);
  };
});
```

### Scenario 3: Adding a New API Method

**Steps**:

1. **Design API first**
```typescript
// Sketch interface
interface AIVDL {
  // New method
  createAnimation(options: AnimationOptions): Promise<CodeOutput>;
}
```

2. **Implement with full validation**
```typescript
async createAnimation(options: AnimationOptions): Promise<CodeOutput> {
  // Validate input
  const validated = AnimationOptionsSchema.parse(options);
  
  // Create world
  const world = this.createWorld();
  
  // Build animation
  const builder = new AnimationBuilder(world);
  builder.build(validated);
  
  // Compile
  return await this.compile(world, {
    framework: validated.framework || 'react',
    generateTests: true
  });
}
```

3. **Add comprehensive tests**
```typescript
describe('AIVDL.createAnimation()', () => {
  let aivdl: AIVDL;
  
  beforeEach(() => {
    aivdl = new AIVDL();
  });
  
  it('should create basic animation', async () => {
    const output = await aivdl.createAnimation({
      type: 'fade',
      duration: 1000
    });
    
    expect(output.code.source).toContain('animation');
    expect(output.code.validation.isValid).toBe(true);
  });
  
  it('should validate options', async () => {
    await expect(
      aivdl.createAnimation({ type: 'invalid' as any })
    ).rejects.toThrow(ValidationError);
  });
  
  it('should generate framework-specific code', async () => {
    const reactOutput = await aivdl.createAnimation({
      type: 'fade',
      duration: 1000,
      framework: 'react'
    });
    
    expect(reactOutput.code.source).toContain('React');
  });
});
```

4. **Document thoroughly**
```typescript
/**
 * Creates an animation based on provided options.
 * 
 * This generates production-ready animation code with:
 * - Framework-specific implementation (React/Vue/Svelte)
 * - Automatic test generation
 * - Performance optimization
 * - Accessibility support
 * 
 * @param options - Animation configuration
 * @param options.type - Animation type (fade, slide, rotate, etc.)
 * @param options.duration - Duration in milliseconds
 * @param options.framework - Target framework (default: 'react')
 * 
 * @returns Promise resolving to code output with animation
 * 
 * @example
 * ```typescript
 * const animation = await aivdl.createAnimation({
 *   type: 'fade',
 *   duration: 500
 * });
 * 
 * // Generated React component with fade animation
 * console.log(animation.code.source);
 * ```
 * 
 * @throws {ValidationError} If options are invalid
 * 
 * @see {@link AnimationOptions} for all available options
 */
async createAnimation(options: AnimationOptions): Promise<CodeOutput> {
  // Implementation
}
```

5. **Add to examples**
```typescript
// examples/animation.ts
import { AIVDL } from '@aivdl/core';

async function main() {
  const aivdl = new AIVDL();
  
  // Fade animation
  const fade = await aivdl.createAnimation({
    type: 'fade',
    duration: 500
  });
  
  await fade.export('react', './FadeAnimation.tsx');
  
  // Slide animation
  const slide = await aivdl.createAnimation({
    type: 'slide',
    direction: 'left',
    duration: 800
  });
  
  await slide.export('react', './SlideAnimation.tsx');
}

main();
```

---

## 🔧 Troubleshooting

### Common Problems and Solutions

#### Problem: Tests Failing After Changes

**Diagnosis**:
```bash
# Run tests with verbose output
pnpm test --reporter=verbose

# Run specific test file
pnpm test entity.test.ts

# Check coverage
pnpm test:coverage
```

**Solutions**:
```typescript
// 1. Check for broken assumptions
// Old code assumed entities array, now it's a Map
// Update tests to reflect new data structure

// 2. Check for timing issues
// Use vi.useFakeTimers() for time-dependent tests
import { vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// 3. Check for async issues
// Make sure all async operations are awaited
await expect(asyncFunction()).resolves.toBe(expected);
```

#### Problem: Type Errors

**Diagnosis**:
```bash
# Run type checker
pnpm type-check

# Check specific file
pnpm tsc --noEmit path/to/file.ts
```

**Solutions**:
```typescript
// 1. Ensure all generic parameters are provided
// ❌ BAD
const result = world.getComponent(entity, 'Transform');
// result is unknown

// ✅ GOOD
const result = world.getComponent<Transform>(entity, 'Transform');
// result is Transform | null

// 2. Use type guards
function isTransform(data: unknown): data is Transform {
  return (
    typeof data === 'object' &&
    data !== null &&
    'x' in data &&
    'y' in data
  );
}

// 3. Prefer interfaces over types for extensibility
interface Base {
  id: number;
}

interface Extended extends Base {
  name: string;
}
```

#### Problem: Performance Degradation

**Diagnosis**:
```bash
# Run benchmarks
pnpm bench

# Profile with Node.js
node --prof dist/benchmark.js
node --prof-process isolate-*.log > profile.txt
```

**Solutions**:
```typescript
// 1. Check for N+1 queries
// ❌ BAD: O(n²) due to nested queries
for (const entity of entities) {
  const related = world.query({ all: ['Related'] });
  // Process related entities
}

// ✅ GOOD: Query once, O(n)
const relatedEntities = world.query({ all: ['Related'] });
const relatedSet = new Set(relatedEntities);
for (const entity of entities) {
  if (relatedSet.has(entity)) {
    // Process
  }
}

// 2. Use batch operations
// ❌ BAD: Individual operations
entities.forEach(e => world.destroy(e));

// ✅ GOOD: Batch operation
world.destroyBatch(entities);

// 3. Cache expensive computations
class ExpensiveSystem {
  private cache = new Map<string, Result>();
  
  compute(input: Input): Result {
    const key = this.getCacheKey(input);
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const result = this.expensiveComputation(input);
    this.cache.set(key, result);
    return result;
  }
}
```

#### Problem: Memory Leaks

**Diagnosis**:
```typescript
// Use Chrome DevTools or Node.js --inspect
// Look for growing heap over time

// Simple heap snapshot
if (global.gc) {
  global.gc();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Memory used: ${used.toFixed(2)} MB`);
}
```

**Solutions**:
```typescript
// 1. Always clean up listeners
class Component {
  private unsubscribe?: () => void;
  
  mount(): void {
    this.unsubscribe = world.watch('change', this.handleChange);
  }
  
  unmount(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}

// 2. Use WeakMap for caches
// Allows garbage collection when keys are no longer referenced
class Cache {
  private cache = new WeakMap<object, CachedData>();
  
  get(key: object): CachedData | undefined {
    return this.cache.get(key);
  }
  
  set(key: object, value: CachedData): void {
    this.cache.set(key, value);
  }
}

// 3. Clear references explicitly
class World {
  cleanup(): void {
    this.entities.clear();
    this.components.clear();
    this.systems = [];
    this.observers.clear();
  }
}
```

---

## 📋 Agent-Specific Guidelines

### For Code Generation Agents (Claude, GPT-4, Copilot)

**Primary Goals**:
1. Generate production-ready code
2. Follow existing patterns
3. Include comprehensive tests
4. Document thoroughly

**Best Practices**:
```typescript
// 1. Always start with the interface
// Define the contract before implementation

// 2. Think in terms of the existing architecture
// How does this fit into ECS?
// What components/systems are involved?

// 3. Generate complete solutions
// Don't leave TODOs or placeholder implementations
// Either implement fully or note explicitly why not

// 4. Include usage examples
// Show how to use the code you generated

// 5. Consider edge cases
// What happens with null/undefined?
// What about empty arrays?
// What about maximum values?
```

### For Code Review Agents

**Focus Areas**:
1. **Architecture Alignment**: Does it follow ECS principles?
2. **Type Safety**: Any `any` types? Proper generics?
3. **Performance**: Any obvious inefficiencies?
4. **Testing**: Adequate test coverage?
5. **Documentation**: JSDoc complete?

**Review Checklist**:
```markdown
Architecture:
- [ ] Follows ECS pattern (Entities/Components/Systems)
- [ ] No business logic in entities
- [ ] Components are pure data
- [ ] Systems are pure logic

Code Quality:
- [ ] TypeScript strict mode compliant
- [ ] No `any` types without justification
- [ ] Descriptive naming
- [ ] Proper error handling
- [ ] No console.log statements

Performance:
- [ ] No obvious O(n²) algorithms
- [ ] Appropriate data structures
- [ ] Caching where beneficial
- [ ] Batch operations used

Testing:
- [ ] Unit tests present
- [ ] Edge cases covered
- [ ] >80% coverage
- [ ] Benchmarks for performance-critical code

Documentation:
- [ ] JSDoc on public APIs
- [ ] Complex logic explained
- [ ] Examples included
- [ ] Assumptions documented
```

### For Documentation Agents

**Primary Goals**:
1. Keep docs in sync with code
2. Make examples runnable
3. Explain "why", not just "what"
4. Maintain consistent style

**Documentation Standards**:
```markdown
# Component Name

Brief description (1-2 sentences).

## Installation

\`\`\`bash
pnpm add @aivdl/package
\`\`\`

## Basic Usage

\`\`\`typescript
import { Component } from '@aivdl/package';

// Simple example
const component = new Component();
component.doSomething();
\`\`\`

## API Reference

### `method(param: Type): ReturnType`

Description of what the method does and why you'd use it.

**Parameters:**
- `param` - Description of parameter

**Returns:** Description of return value

**Throws:** `ErrorType` - When this error occurs

**Example:**
\`\`\`typescript
const result = component.method('value');
console.log(result); // Expected output
\`\`\`

## Advanced Usage

More complex examples showing real-world use cases.

## Best Practices

- Do this for performance
- Avoid that for memory
- Consider this for scalability

## Troubleshooting

Common issues and solutions.
```

### For Testing Agents

**Primary Goals**:
1. Achieve >80% coverage
2. Test edge cases
3. Test error conditions
4. Benchmark performance-critical code

**Testing Strategy**:
```typescript
// 1. Unit tests for each function
describe('functionName()', () => {
  // Happy path
  it('should work with valid input', () => {});
  
  // Edge cases
  it('should handle empty input', () => {});
  it('should handle maximum values', () => {});
  it('should handle minimum values', () => {});
  
  // Error cases
  it('should throw on invalid input', () => {});
  it('should throw on null/undefined', () => {});
});

// 2. Integration tests for workflows
describe('Logo Generation Workflow', () => {
  it('should generate complete logo', async () => {
    const aivdl = new AIVDL();
    const logo = await aivdl.createLogo({ style: 'modern' });
    
    expect(logo.code.source).toBeTruthy();
    expect(logo.code.validation.isValid).toBe(true);
    expect(logo.assets.svg).toBeTruthy();
  });
});

// 3. Performance benchmarks
bench('critical operation', () => {
  // Setup
  return () => {
    // Operation to benchmark
  };
});

// 4. Visual regression tests (if UI)
it('should match baseline screenshot', async () => {
  const screenshot = await render(component);
  expect(screenshot).toMatchImageSnapshot();
});
```

---

## 🎓 Learning Resources

### Understanding ECS

**Recommended Reading**:
1. "Overwatch Gameplay Architecture and Netcode" (GDC Talk)
2. "Data-Oriented Design" by Richard Fabian
3. Unity DOTS documentation
4. "Game Programming Patterns" by Robert Nystrom (Observer, Component patterns)

**Key Concepts**:
```typescript
// ECS vs OOP

// ❌ OOP Approach
class Enemy {
  health: number;
  position: Vector2;
  
  update(): void {
    // Logic mixed with data
  }
  
  takeDamage(amount: number): void {
    this.health -= amount;
  }
}

// ✅ ECS Approach
// Data (Components)
interface Health { value: number; max: number; }
interface Position { x: number; y: number; }

// Logic (Systems)
class DamageSystem implements System {
  execute(world: World): void {
    const entities = world.query({ all: ['Health', 'Damage'] });
    for (const entity of entities) {
      const health = world.getComponent<Health>(entity, 'Health');
      const damage = world.getComponent<Damage>(entity, 'Damage');
      health.value -= damage.value;
    }
  }
}
```

### TypeScript Best Practices

**Recommended**:
1. TypeScript Deep Dive (online book)
2. Effective TypeScript by Dan Vanderkam
3. TypeScript official documentation

**Key Patterns**:
```typescript
// 1. Discriminated Unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

function handleResult<T>(result: Result<T>): void {
  if (result.success) {
    console.log(result.data); // Type: T
  } else {
    console.error(result.error); // Type: Error
  }
}

// 2. Branded Types
type EntityId = number & { __brand: 'EntityId' };
type ComponentId = number & { __brand: 'ComponentId' };

// Can't accidentally use ComponentId where EntityId is expected

// 3. Builder Pattern with Fluent API
class QueryBuilder {
  private query: Partial<ComponentQuery> = {};
  
  all(...components: string[]): this {
    this.query.all = components;
    return this;
  }
  
  any(...components: string[]): this {
    this.query.any = components;
    return this;
  }
  
  build(): ComponentQuery {
    return this.query as ComponentQuery;
  }
}
```

### Performance Optimization

**Profiling Tools**:
1. Chrome DevTools Performance tab
2. Node.js `--prof` flag
3. `perf` on Linux
4. Vitest benchmarking

**Optimization Checklist**:
```typescript
// 1. Measure first
const start = performance.now();
// ... operation ...
const duration = performance.now() - start;
console.log(`Operation took ${duration.toFixed(2)}ms`);

// 2. Identify bottlenecks
// Use profiler to find hot spots

// 3. Optimize data structures
// Array → Map for lookups
// Array → Set for unique checks
// Number[] → TypedArray for numeric data

// 4. Reduce allocations
// Reuse objects/arrays
// Use object pools for frequently created objects

// 5. Cache expensive computations
const cache = new Map();
function expensiveOperation(input: Input): Result {
  const key = getCacheKey(input);
  if (cache.has(key)) return cache.get(key)!;
  const result = compute(input);
  cache.set(key, result);
  return result;
}

// 6. Batch operations
// Instead of N operations, do 1 batch operation

// 7. Use appropriate algorithms
// Sort: QuickSort O(n log n) vs BubbleSort O(n²)
// Search: Binary O(log n) vs Linear O(n)
```

---

## 🚦 Status Reporting

### Progress Updates

**When working on a task, update TODO.md**:

```markdown
#### 1.2 Entity Manager
- [✅] Implement EntityId type system
- [🔄] Create EntityManager class (IN PROGRESS)
  - [✅] `create()` - Create new entity
  - [🔄] `destroy()` - Destroy entity (testing)
  - [ ] `exists()` - Check entity existence
  - [ ] `clone()` - Clone entity (shallow/deep)

**Priority**: 🔴 Critical
**Estimated Time**: 2-3 days
**Assignee**: Agent-Claude-2025
**Dependencies**: 1.1 ✅
**Progress**: 2/10 tasks (20%)

**Notes**:
- EntityId type system complete
- Basic create() working, benchmarked at 100k ops/sec
- Working on destroy() with cleanup logic
- Blocker: Need decision on cleanup strategy for orphaned components
```

### Blockers and Questions

**When blocked, document clearly**:

```markdown
## Blocker: Component Cleanup Strategy

**Context**: When destroying an entity, should we automatically
remove all associated components or leave them for garbage collection?

**Options**:
1. **Eager cleanup**: Remove components immediately
   - Pro: Predictable memory usage
   - Con: Slower destroy operation
   
2. **Lazy cleanup**: Mark for cleanup, batch remove later
   - Pro: Faster destroy operation
   - Con: Higher peak memory usage

3. **Garbage collection**: Don't clean up, let GC handle
   - Pro: Simplest implementation
   - Con: Unpredictable memory usage

**Recommendation**: Option 2 (Lazy cleanup)
- Better performance profile
- Acceptable memory trade-off
- Can batch cleanup during idle time

**Request**: Please confirm approach before continuing.
```

### Completion Reports

**When marking task complete**:

```markdown
## Task Complete: Entity Manager Implementation

**Completed**:
- [x] EntityId type system
- [x] EntityManager class
- [x] All CRUD operations
- [x] Batch operations
- [x] Comprehensive tests (95% coverage)
- [x] Performance benchmarks
- [x] API documentation

**Performance**:
- create(): 120k ops/sec
- destroy(): 110k ops/sec
- exists(): 5M ops/sec
- clone(): 80k ops/sec

**Tests**: 42 tests, all passing
**Coverage**: 95% (target: >80%)
**Benchmarks**: All within performance budget

**Documentation**:
- JSDoc complete on all public APIs
- Examples added to examples/entity-management.ts
- README updated with API reference
- CHANGELOG.md updated

**Next Steps**:
- Ready for review
- Unblocks task 1.3 (Component System)
```

---

## 🎯 Success Metrics

### Code Quality Metrics

**Target Goals**:
- **Test Coverage**: >80%
- **Type Coverage**: 100% (no implicit `any`)
- **Documentation**: 100% of public APIs
- **Performance**: Within 10% of baseline benchmarks
- **Bundle Size**: <100KB minified

**Measurement**:
```bash
# Coverage
pnpm test:coverage

# Type coverage
pnpm type-check

# Bundle size
pnpm build && du -h dist/

# Performance
pnpm bench
```

### Contribution Quality

**Self-Assessment**:
```markdown
Rate your contribution (1-5):

Code Quality:
- Type Safety: 5/5 (no any, proper generics)
- Readability: 4/5 (could simplify one function)
- Maintainability: 5/5 (well-documented, modular)

Testing:
- Coverage: 5/5 (95% coverage)
- Edge Cases: 5/5 (comprehensive)
- Performance: 4/5 (benchmarked, could optimize one path)

Documentation:
- JSDoc: 5/5 (all public APIs)
- Examples: 5/5 (runnable examples included)
- Inline Comments: 4/5 (complex parts explained)

Architecture:
- ECS Alignment: 5/5 (proper separation)
- Pattern Usage: 5/5 (appropriate patterns)
- Integration: 5/5 (works with existing code)

Overall: 4.7/5
```

---

## 🔄 Continuous Improvement

### Learning from Feedback

**When receiving review comments**:

1. **Understand the feedback**
   - Why is this suggested?
   - What problem does it solve?
   - What pattern should I follow?

2. **Apply to current work**
   - Fix the specific issue
   - Look for similar patterns in other code
   - Update personal checklist

3. **Document learnings**
   - Add to this AGENTS.md if generally applicable
   - Share with other agents via commit message
   - Update templates/examples

### Pattern Library

**Maintain reusable patterns**:

```typescript
// Pattern: Type-Safe Event Emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<keyof Events, Set<Function>>();
  
  on<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }
  
  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }
}

// Usage
interface MyEvents {
  entityCreated: { id: EntityId };
  componentAdded: { entity: EntityId; component: string };
}

const emitter = new TypedEventEmitter<MyEvents>();

emitter.on('entityCreated', (data) => {
  console.log(data.id); // Type-safe!
});
```

---

## 📞 Getting Help

### When Stuck

**Escalation Path**:

1. **Check documentation** (DESIGN.md, existing code)
2. **Search similar implementations** in codebase
3. **Document the problem** clearly
4. **Propose solutions** with trade-offs
5. **Ask for guidance** in commit message or comments

**Example**:
```typescript
/**
 * QUESTION: Should this use WeakMap or Map?
 * 
 * Context: Caching component data by entity ID
 * 
 * WeakMap pros: Automatic cleanup, no memory leaks
 * WeakMap cons: Can't use primitive keys (EntityId is number)
 * 
 * Map pros: Works with number keys
 * Map cons: Need manual cleanup
 * 
 * Current approach: Using Map with manual cleanup in destroy()
 * 
 * Alternative: Use object wrapper for EntityId to allow WeakMap
 * 
 * Seeking input on best approach.
 */
```

### Communication Channels

**For AI Agents**:
- **Code Comments**: Questions in code
- **Commit Messages**: Context and reasoning
- **TODO.md**: Status updates and blockers
- **This Document**: General guidance updates

---

## 🎉 Final Reminders

### Core Principles to Remember

1. **Code is for humans** - Write clear, readable code
2. **Performance matters** - But measure, don't guess
3. **Tests are documentation** - Show how to use the code
4. **Documentation is code** - Keep them in sync
5. **Architecture is key** - Follow ECS principles
6. **Quality over speed** - Do it right the first time

### Daily Checklist

**Before starting work**:
- [ ] Read latest TODO.md updates
- [ ] Pull latest changes
- [ ] Review related code
- [ ] Understand the "why"

**During work**:
- [ ] Follow type safety guidelines
- [ ] Write tests alongside code
- [ ] Document as you go
- [ ] Benchmark if performance-critical

**Before submitting**:
- [ ] All tests pass
- [ ] Coverage maintained
- [ ] Linting clean
- [ ] Documentation complete
- [ ] Self-review done
- [ ] TODO.md updated

### Success Mantra

```
Clear, Correct, Complete, Consistent, Communicated
```

- **Clear**: Easy to understand
- **Correct**: Works as intended
- **Complete**: Handles edge cases
- **Consistent**: Follows patterns
- **Communicated**: Well documented

---

## 📚 Appendix

### Quick Reference Links

- **DESIGN.md**: Architecture details
- **TODO.md**: Current tasks
- **CONTRIBUTING.md**: Development setup
- **CHANGELOG.md**: Version history
- **SECURITY.md**: Security guidelines

### Common Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm dev              # Development mode
pnpm clean            # Clean build artifacts

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # With coverage
pnpm bench            # Run benchmarks

# Quality
pnpm lint             # Lint code
pnpm lint:fix         # Fix linting issues
pnpm type-check       # Type checking
pnpm format           # Format code

# Documentation
pnpm docs:dev         # Docs dev server
pnpm docs:build       # Build docs
```

### Version Info

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-XX  
**Maintained By**: AIVDL Core Team  
**Review Schedule**: Monthly

---

<div align="center">

**Thank you for contributing to AIVDL Core!**

Together, we're building the future of code-first design. 🚀

</div>