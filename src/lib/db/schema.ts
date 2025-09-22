import { pgTable, text, uuid, timestamp, integer, boolean, varchar, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  iconUrl: varchar('icon_url', { length: 512 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  slugIdx: index('categories_slug_idx').on(table.slug),
}));

// Item types table
export const itemTypes = pgTable('item_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  iconUrl: varchar('icon_url', { length: 512 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  categoryIdIdx: index('item_types_category_id_idx').on(table.categoryId),
  slugIdx: index('item_types_slug_idx').on(table.slug),
}));

// Rarities table
export const rarities = pgTable('rarities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  color: varchar('color', { length: 7 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  slugIdx: index('rarities_slug_idx').on(table.slug),
}));

// Elements table
export const elements = pgTable('elements', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  color: varchar('color', { length: 7 }),
  iconUrl: varchar('icon_url', { length: 512 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  slugIdx: index('elements_slug_idx').on(table.slug),
}));

// Items table
export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  loreText: text('lore_text'),
  itemTypeId: uuid('item_type_id').notNull().references(() => itemTypes.id),
  rarityId: uuid('rarity_id').notNull().references(() => rarities.id),
  elementId: uuid('element_id').references(() => elements.id),
  powerLevel: integer('power_level'),
  isCraftable: boolean('is_craftable').default(false),
  isSunset: boolean('is_sunset').default(false),
  releaseDate: timestamp('release_date', { mode: 'date' }),
  source: text('source'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  itemTypeIdIdx: index('items_item_type_id_idx').on(table.itemTypeId),
  rarityIdIdx: index('items_rarity_id_idx').on(table.rarityId),
  elementIdIdx: index('items_element_id_idx').on(table.elementId),
  slugIdx: index('items_slug_idx').on(table.slug),
  nameIdx: index('items_name_idx').on(table.name),
}));

// Item images table
export const itemImages = pgTable('item_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  imageUrl: varchar('image_url', { length: 512 }).notNull(),
  altText: varchar('alt_text', { length: 255 }),
  imageType: varchar('image_type', { length: 50 }),
  isPrimary: boolean('is_primary').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  itemIdIdx: index('item_images_item_id_idx').on(table.itemId),
}));

// Stats table
export const stats = pgTable('stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  iconUrl: varchar('icon_url', { length: 512 }),
  category: varchar('category', { length: 50 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  slugIdx: index('stats_slug_idx').on(table.slug),
}));

// Item stats table
export const itemStats = pgTable('item_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  statId: uuid('stat_id').notNull().references(() => stats.id),
  value: integer('value').notNull(),
  maxValue: integer('max_value'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  itemIdIdx: index('item_stats_item_id_idx').on(table.itemId),
  statIdIdx: index('item_stats_stat_id_idx').on(table.statId),
}));

// Perks table
export const perks = pgTable('perks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  iconUrl: varchar('icon_url', { length: 512 }),
  perkType: varchar('perk_type', { length: 50 }),
  isEnhanced: boolean('is_enhanced').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  slugIdx: index('perks_slug_idx').on(table.slug),
}));

// Item perks table
export const itemPerks = pgTable('item_perks', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  perkId: uuid('perk_id').notNull().references(() => perks.id),
  slotPosition: integer('slot_position').notNull(),
  isDefault: boolean('is_default').default(false),
  unlockRequirement: text('unlock_requirement'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  itemIdIdx: index('item_perks_item_id_idx').on(table.itemId),
  perkIdIdx: index('item_perks_perk_id_idx').on(table.perkId),
}));

// Collections table
export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  iconUrl: varchar('icon_url', { length: 512 }),
  isFeatured: boolean('is_featured').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  slugIdx: index('collections_slug_idx').on(table.slug),
}));

// Collection items table
export const collectionItems = pgTable('collection_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  collectionIdIdx: index('collection_items_collection_id_idx').on(table.collectionId),
  itemIdIdx: index('collection_items_item_id_idx').on(table.itemId),
}));

// Users table (for admin)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('viewer'),
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// Tags table
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  color: varchar('color', { length: 7 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  slugIdx: index('tags_slug_idx').on(table.slug),
}));

// Item tags table
export const itemTags = pgTable('item_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  itemIdIdx: index('item_tags_item_id_idx').on(table.itemId),
  tagIdIdx: index('item_tags_tag_id_idx').on(table.tagId),
}));

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  itemTypes: many(itemTypes),
}));

export const itemTypesRelations = relations(itemTypes, ({ one, many }) => ({
  category: one(categories, {
    fields: [itemTypes.categoryId],
    references: [categories.id],
  }),
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  itemType: one(itemTypes, {
    fields: [items.itemTypeId],
    references: [itemTypes.id],
  }),
  rarity: one(rarities, {
    fields: [items.rarityId],
    references: [rarities.id],
  }),
  element: one(elements, {
    fields: [items.elementId],
    references: [elements.id],
  }),
  images: many(itemImages),
  stats: many(itemStats),
  perks: many(itemPerks),
  collectionItems: many(collectionItems),
  tags: many(itemTags),
}));

export const itemImagesRelations = relations(itemImages, ({ one }) => ({
  item: one(items, {
    fields: [itemImages.itemId],
    references: [items.id],
  }),
}));

export const itemStatsRelations = relations(itemStats, ({ one }) => ({
  item: one(items, {
    fields: [itemStats.itemId],
    references: [items.id],
  }),
  stat: one(stats, {
    fields: [itemStats.statId],
    references: [stats.id],
  }),
}));

export const itemPerksRelations = relations(itemPerks, ({ one }) => ({
  item: one(items, {
    fields: [itemPerks.itemId],
    references: [items.id],
  }),
  perk: one(perks, {
    fields: [itemPerks.perkId],
    references: [perks.id],
  }),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  items: many(collectionItems),
}));

export const collectionItemsRelations = relations(collectionItems, ({ one }) => ({
  collection: one(collections, {
    fields: [collectionItems.collectionId],
    references: [collections.id],
  }),
  item: one(items, {
    fields: [collectionItems.itemId],
    references: [items.id],
  }),
}));

export const itemTagsRelations = relations(itemTags, ({ one }) => ({
  item: one(items, {
    fields: [itemTags.itemId],
    references: [items.id],
  }),
  tag: one(tags, {
    fields: [itemTags.tagId],
    references: [tags.id],
  }),
}));