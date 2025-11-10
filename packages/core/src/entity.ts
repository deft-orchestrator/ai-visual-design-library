/**
 * @file Manages entities within the ECS world.
 * @module @aivdl/core/entity
 */

/**
 * A branded type for entity IDs to ensure type safety.
 * Prevents accidental use of regular numbers where an EntityId is expected.
 */
export type EntityId = number & { readonly __brand: 'EntityId' };

/**
 * Manages the lifecycle of entities, including creation, destruction, and querying.
 * This class is designed for high performance, using object pooling for entity IDs
 * to minimize memory allocation and garbage collection overhead.
 */
export class EntityManager {
  private nextEntityId: number = 0;
  private recycledEntityIds: EntityId[] = [];
  private activeEntities: Set<EntityId> = new Set();

  /**
   * Creates a new entity. It will recycle a previously destroyed entity ID if one
   * is available, otherwise it will create a new one.
   * Time Complexity: O(1)
   * @returns The ID of the newly created entity.
   */
  public create(): EntityId {
    let id: EntityId;

    if (this.recycledEntityIds.length > 0) {
      id = this.recycledEntityIds.pop()!;
    } else {
      id = this.nextEntityId++ as EntityId;
    }

    this.activeEntities.add(id);
    return id;
  }

  /**
   * Destroys an existing entity, releasing its ID for reuse.
   * This operation is idempotent; destroying a non-existent entity has no effect.
   * Time Complexity: O(1)
   * @param id The ID of the entity to destroy.
   */
  public destroy(id: EntityId): void {
    if (this.activeEntities.has(id)) {
      this.activeEntities.delete(id);
      this.recycledEntityIds.push(id);
    }
  }

  /**
   * Checks if an entity with the given ID exists and is currently active.
   * Time Complexity: O(1)
   * @param id The ID of the entity to check.
   * @returns True if the entity exists, false otherwise.
   */
  public exists(id: EntityId): boolean {
    return this.activeEntities.has(id);
  }

  /**
   * Creates a clone of an existing entity. Throws an error if the entity does not exist.
   * Note: This only clones the entity ID. Components must be cloned separately.
   * Time Complexity: O(1)
   * @param id The ID of the entity to clone.
   * @returns The ID of the newly created clone.
   * @throws {Error} If the entity with the given ID does not exist.
   */
  public clone(id: EntityId): EntityId {
    if (!this.exists(id)) {
      throw new Error(`Entity with ID ${id} does not exist and cannot be cloned.`);
    }
    return this.create();
  }

  /**
   * Creates a batch of new entities. This is more performant than creating
   * entities one by one in a loop.
   * Time Complexity: O(n) where n is the count.
   * @param count The number of entities to create.
   * @returns An array of newly created entity IDs.
   */
  public createBatch(count: number): EntityId[] {
    const ids: EntityId[] = new Array(count);
    for (let i = 0; i < count; i++) {
      ids[i] = this.create();
    }
    return ids;
  }

  /**
   * Destroys a batch of existing entities. This is more performant than
   * destroying entities one by one in a loop.
   * Time Complexity: O(n) where n is the number of IDs.
   * @param ids An array of entity IDs to destroy.
   */
  public destroyBatch(ids: EntityId[]): void {
    for (const id of ids) {
      this.destroy(id);
    }
  }
}
