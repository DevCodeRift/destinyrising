# Destiny Rising Database Schema

## Core Tables

### categories
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL) - e.g., "Weapons", "Armor", "Artifacts", "Resources", "Maps"
- `slug` (VARCHAR, UNIQUE, NOT NULL) - URL-friendly version
- `description` (TEXT)
- `icon_url` (VARCHAR) - Category icon
- `sort_order` (INTEGER) - Display order
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### item_types
- `id` (UUID, Primary Key)
- `category_id` (UUID, Foreign Key → categories.id)
- `name` (VARCHAR, NOT NULL) - e.g., "Hand Cannon", "Helmet", "Energy Artifact"
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `description` (TEXT)
- `icon_url` (VARCHAR)
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### rarities
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL) - e.g., "Common", "Uncommon", "Rare", "Legendary", "Exotic"
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `color` (VARCHAR) - Hex color for UI
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)

### elements
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL) - e.g., "Arc", "Solar", "Void", "Stasis", "Kinetic"
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `color` (VARCHAR) - Hex color
- `icon_url` (VARCHAR)
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)

### items
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL)
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `description` (TEXT)
- `lore_text` (TEXT)
- `item_type_id` (UUID, Foreign Key → item_types.id)
- `rarity_id` (UUID, Foreign Key → rarities.id)
- `element_id` (UUID, Foreign Key → elements.id, NULLABLE)
- `power_level` (INTEGER, NULLABLE)
- `is_craftable` (BOOLEAN, DEFAULT FALSE)
- `is_sunset` (BOOLEAN, DEFAULT FALSE)
- `release_date` (DATE, NULLABLE)
- `source` (TEXT) - How to obtain the item
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### item_images
- `id` (UUID, Primary Key)
- `item_id` (UUID, Foreign Key → items.id)
- `image_url` (VARCHAR, NOT NULL)
- `alt_text` (VARCHAR)
- `image_type` (VARCHAR) - "icon", "full", "3d_model", etc.
- `is_primary` (BOOLEAN, DEFAULT FALSE)
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)

### stats
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL) - e.g., "Impact", "Range", "Stability"
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `description` (TEXT)
- `icon_url` (VARCHAR)
- `category` (VARCHAR) - "combat", "defensive", "utility", etc.
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)

### item_stats
- `id` (UUID, Primary Key)
- `item_id` (UUID, Foreign Key → items.id)
- `stat_id` (UUID, Foreign Key → stats.id)
- `value` (INTEGER, NOT NULL)
- `max_value` (INTEGER) - For percentage calculations
- `created_at` (TIMESTAMP)

### perks
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL)
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `description` (TEXT)
- `icon_url` (VARCHAR)
- `perk_type` (VARCHAR) - "trait", "intrinsic", "frame", etc.
- `is_enhanced` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### item_perks
- `id` (UUID, Primary Key)
- `item_id` (UUID, Foreign Key → items.id)
- `perk_id` (UUID, Foreign Key → perks.id)
- `slot_position` (INTEGER) - Which perk slot (1, 2, 3, etc.)
- `is_default` (BOOLEAN, DEFAULT FALSE)
- `unlock_requirement` (TEXT, NULLABLE)
- `created_at` (TIMESTAMP)

### collections
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL)
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `description` (TEXT)
- `icon_url` (VARCHAR)
- `is_featured` (BOOLEAN, DEFAULT FALSE)
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### collection_items
- `id` (UUID, Primary Key)
- `collection_id` (UUID, Foreign Key → collections.id)
- `item_id` (UUID, Foreign Key → items.id)
- `sort_order` (INTEGER)
- `created_at` (TIMESTAMP)

## Admin Tables

### users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `password_hash` (VARCHAR, NOT NULL)
- `name` (VARCHAR)
- `role` (VARCHAR) - "admin", "editor", "viewer"
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `last_login` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### tags
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL)
- `slug` (VARCHAR, UNIQUE, NOT NULL)
- `color` (VARCHAR) - Hex color for UI
- `created_at` (TIMESTAMP)

### item_tags
- `id` (UUID, Primary Key)
- `item_id` (UUID, Foreign Key → items.id)
- `tag_id` (UUID, Foreign Key → tags.id)
- `created_at` (TIMESTAMP)

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_items_item_type_id ON items(item_type_id);
CREATE INDEX idx_items_rarity_id ON items(rarity_id);
CREATE INDEX idx_items_element_id ON items(element_id);
CREATE INDEX idx_items_slug ON items(slug);
CREATE INDEX idx_items_name ON items(name);
CREATE INDEX idx_item_images_item_id ON item_images(item_id);
CREATE INDEX idx_item_stats_item_id ON item_stats(item_id);
CREATE INDEX idx_item_perks_item_id ON item_perks(item_id);
CREATE INDEX idx_collection_items_collection_id ON collection_items(collection_id);
CREATE INDEX idx_item_tags_item_id ON item_tags(item_id);

-- Search indexes
CREATE INDEX idx_items_search ON items USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

## Example Data Structure

### Sample Weapon Entry
```json
{
  "id": "uuid-here",
  "name": "Fatebringer",
  "slug": "fatebringer",
  "description": "\"His name was Kabr. He wasn't my friend.\"",
  "item_type": "Hand Cannon",
  "rarity": "Legendary",
  "element": "Arc",
  "power_level": 1350,
  "stats": {
    "impact": 84,
    "range": 46,
    "stability": 33,
    "handling": 36,
    "reload_speed": 34,
    "magazine": 12
  },
  "perks": [
    {
      "slot": 1,
      "name": "Precision Frame",
      "description": "Recoil pattern on this weapon is more predictable."
    },
    {
      "slot": 2,
      "name": "Explosive Payload",
      "description": "Projectiles create an area-of-effect detonation on impact."
    }
  ],
  "images": [
    {
      "type": "icon",
      "url": "/images/weapons/fatebringer-icon.png",
      "is_primary": true
    }
  ]
}
```