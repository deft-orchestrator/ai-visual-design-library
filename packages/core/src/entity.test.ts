import { describe, it, expect, beforeEach } from 'vitest';
import { EntityManager, EntityId } from './entity';

describe('EntityManager', () => {
  let manager: EntityManager;

  beforeEach(() => {
    manager = new EntityManager();
  });

  describe('create()', () => {
    it('should create a new entity with a unique ID', () => {
      const entity1 = manager.create();
      const entity2 = manager.create();
      expect(entity1).not.toBe(entity2);
    });

    it('should return incrementing IDs for new entities', () => {
      const entity1 = manager.create();
      const entity2 = manager.create();
      expect(entity1).toBe(0);
      expect(entity2).toBe(1);
    });
  });

  describe('exists()', () => {
    it('should return true for an existing entity', () => {
      const entity = manager.create();
      expect(manager.exists(entity)).toBe(true);
    });

    it('should return false for a non-existent entity', () => {
      expect(manager.exists(999 as EntityId)).toBe(false);
    });

    it('should return false for a destroyed entity', () => {
      const entity = manager.create();
      manager.destroy(entity);
      expect(manager.exists(entity)).toBe(false);
    });
  });

  describe('destroy()', () => {
    it('should make an entity non-existent', () => {
      const entity = manager.create();
      manager.destroy(entity);
      expect(manager.exists(entity)).toBe(false);
    });

    it('should be idempotent', () => {
      const entity = manager.create();
      manager.destroy(entity);
      expect(() => manager.destroy(entity)).not.toThrow();
      expect(manager.exists(entity)).toBe(false);
    });
  });

  describe('ID Recycling', () => {
    it('should recycle a destroyed entity ID', () => {
      const entity1 = manager.create(); // ID 0
      const entity2 = manager.create(); // ID 1
      manager.destroy(entity1);
      const entity3 = manager.create(); // Should be ID 0
      expect(entity3).toBe(entity1);
    });

    it('should handle multiple recycled IDs (LIFO)', () => {
      const entity1 = manager.create(); // 0
      const entity2 = manager.create(); // 1
      manager.destroy(entity1);
      manager.destroy(entity2);
      const entity3 = manager.create(); // Should be 1
      const entity4 = manager.create(); // Should be 0
      expect(entity3).toBe(entity2);
      expect(entity4).toBe(entity1);
    });
  });

  describe('clone()', () => {
    it('should create a new entity when cloning an existing one', () => {
      const original = manager.create();
      const clone = manager.clone(original);
      expect(clone).not.toBe(original);
      expect(manager.exists(clone)).toBe(true);
    });

    it('should throw an error when cloning a non-existent entity', () => {
      expect(() => manager.clone(999 as EntityId)).toThrow(
        'Entity with ID 999 does not exist and cannot be cloned.'
      );
    });
  });

  describe('createBatch()', () => {
    it('should create the specified number of entities', () => {
      const ids = manager.createBatch(10);
      expect(ids).toHaveLength(10);
      ids.forEach(id => expect(manager.exists(id)).toBe(true));
    });

    it('should return unique IDs', () => {
      const ids = manager.createBatch(100);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(100);
    });
  });

  describe('destroyBatch()', () => {
    it('should destroy all specified entities', () => {
      const ids = manager.createBatch(5);
      manager.destroyBatch(ids);
      ids.forEach(id => expect(manager.exists(id)).toBe(false));
    });

    it('should handle an empty array without errors', () => {
      expect(() => manager.destroyBatch([])).not.toThrow();
    });

    it('should handle non-existent entities in the batch gracefully', () => {
      const ids = manager.createBatch(3);
      const batchToDestroy = [...ids, 998 as EntityId, 999 as EntityId];
      expect(() => manager.destroyBatch(batchToDestroy)).not.toThrow();
      ids.forEach(id => expect(manager.exists(id)).toBe(false));
    });
  });
});
