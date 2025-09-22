import { db } from './index';
import { categories, itemTypes, rarities, elements, stats } from './schema';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Seed Categories
    console.log('📁 Seeding categories...');
    const categoryData = [
      {
        name: 'Weapons',
        slug: 'weapons',
        description: 'All weapons available in Destiny Rising',
        sortOrder: 1,
      },
      {
        name: 'Armor',
        slug: 'armor',
        description: 'Protective gear and armor pieces',
        sortOrder: 2,
      },
      {
        name: 'Artifacts',
        slug: 'artifacts',
        description: 'Powerful artifacts with unique abilities',
        sortOrder: 3,
      },
      {
        name: 'Resources',
        slug: 'resources',
        description: 'Materials and consumables',
        sortOrder: 4,
      },
      {
        name: 'Maps',
        slug: 'maps',
        description: 'Locations and areas',
        sortOrder: 5,
      },
    ];

    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Seed Rarities
    console.log('💎 Seeding rarities...');
    const rarityData = [
      {
        name: 'Common',
        slug: 'common',
        color: '#FFFFFF',
        sortOrder: 1,
      },
      {
        name: 'Uncommon',
        slug: 'uncommon',
        color: '#4AE54A',
        sortOrder: 2,
      },
      {
        name: 'Rare',
        slug: 'rare',
        color: '#5EA3F2',
        sortOrder: 3,
      },
      {
        name: 'Legendary',
        slug: 'legendary',
        color: '#B447F2',
        sortOrder: 4,
      },
      {
        name: 'Exotic',
        slug: 'exotic',
        color: '#F2E55E',
        sortOrder: 5,
      },
    ];

    const insertedRarities = await db.insert(rarities).values(rarityData).returning();
    console.log(`✅ Inserted ${insertedRarities.length} rarities`);

    // Seed Elements
    console.log('⚡ Seeding elements...');
    const elementData = [
      {
        name: 'Kinetic',
        slug: 'kinetic',
        color: '#FFFFFF',
        sortOrder: 1,
      },
      {
        name: 'Arc',
        slug: 'arc',
        color: '#80CCFF',
        sortOrder: 2,
      },
      {
        name: 'Solar',
        slug: 'solar',
        color: '#FF8000',
        sortOrder: 3,
      },
      {
        name: 'Void',
        slug: 'void',
        color: '#B866FF',
        sortOrder: 4,
      },
      {
        name: 'Stasis',
        slug: 'stasis',
        color: '#4D88FF',
        sortOrder: 5,
      },
    ];

    const insertedElements = await db.insert(elements).values(elementData).returning();
    console.log(`✅ Inserted ${insertedElements.length} elements`);

    // Find weapons category
    const weaponsCategory = insertedCategories.find(cat => cat.slug === 'weapons');
    const armorCategory = insertedCategories.find(cat => cat.slug === 'armor');

    if (!weaponsCategory || !armorCategory) {
      throw new Error('Failed to find weapons or armor category');
    }

    // Seed Item Types
    console.log('🔫 Seeding item types...');
    const itemTypeData = [
      // Weapon types
      {
        categoryId: weaponsCategory.id,
        name: 'Hand Cannon',
        slug: 'hand-cannon',
        description: 'Precision sidearms with high damage',
        sortOrder: 1,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Auto Rifle',
        slug: 'auto-rifle',
        description: 'Fully automatic rifles',
        sortOrder: 2,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Scout Rifle',
        slug: 'scout-rifle',
        description: 'Long-range precision weapons',
        sortOrder: 3,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Pulse Rifle',
        slug: 'pulse-rifle',
        description: 'Burst-fire rifles',
        sortOrder: 4,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Sniper Rifle',
        slug: 'sniper-rifle',
        description: 'High-damage precision weapons',
        sortOrder: 5,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Shotgun',
        slug: 'shotgun',
        description: 'Close-range spread weapons',
        sortOrder: 6,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Fusion Rifle',
        slug: 'fusion-rifle',
        description: 'Energy-based burst weapons',
        sortOrder: 7,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Rocket Launcher',
        slug: 'rocket-launcher',
        description: 'Explosive heavy weapons',
        sortOrder: 8,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Machine Gun',
        slug: 'machine-gun',
        description: 'High-capacity automatic weapons',
        sortOrder: 9,
      },
      {
        categoryId: weaponsCategory.id,
        name: 'Sword',
        slug: 'sword',
        description: 'Melee weapons with energy blades',
        sortOrder: 10,
      },
      // Armor types
      {
        categoryId: armorCategory.id,
        name: 'Helmet',
        slug: 'helmet',
        description: 'Head protection',
        sortOrder: 1,
      },
      {
        categoryId: armorCategory.id,
        name: 'Gauntlets',
        slug: 'gauntlets',
        description: 'Arm protection',
        sortOrder: 2,
      },
      {
        categoryId: armorCategory.id,
        name: 'Chest Armor',
        slug: 'chest-armor',
        description: 'Torso protection',
        sortOrder: 3,
      },
      {
        categoryId: armorCategory.id,
        name: 'Leg Armor',
        slug: 'leg-armor',
        description: 'Leg protection',
        sortOrder: 4,
      },
      {
        categoryId: armorCategory.id,
        name: 'Class Item',
        slug: 'class-item',
        description: 'Class-specific accessories',
        sortOrder: 5,
      },
    ];

    const insertedItemTypes = await db.insert(itemTypes).values(itemTypeData).returning();
    console.log(`✅ Inserted ${insertedItemTypes.length} item types`);

    // Seed Stats
    console.log('📊 Seeding stats...');
    const statData = [
      // Weapon stats
      {
        name: 'Impact',
        slug: 'impact',
        description: 'Damage per shot',
        category: 'combat',
        sortOrder: 1,
      },
      {
        name: 'Range',
        slug: 'range',
        description: 'Effective range and damage falloff',
        category: 'combat',
        sortOrder: 2,
      },
      {
        name: 'Stability',
        slug: 'stability',
        description: 'Recoil reduction',
        category: 'combat',
        sortOrder: 3,
      },
      {
        name: 'Handling',
        slug: 'handling',
        description: 'Weapon responsiveness',
        category: 'utility',
        sortOrder: 4,
      },
      {
        name: 'Reload Speed',
        slug: 'reload-speed',
        description: 'Time to reload weapon',
        category: 'utility',
        sortOrder: 5,
      },
      {
        name: 'Magazine',
        slug: 'magazine',
        description: 'Rounds per magazine',
        category: 'utility',
        sortOrder: 6,
      },
      // Armor stats
      {
        name: 'Mobility',
        slug: 'mobility',
        description: 'Movement speed and jump height',
        category: 'defensive',
        sortOrder: 7,
      },
      {
        name: 'Resilience',
        slug: 'resilience',
        description: 'Shield capacity and damage resistance',
        category: 'defensive',
        sortOrder: 8,
      },
      {
        name: 'Recovery',
        slug: 'recovery',
        description: 'Shield regeneration speed',
        category: 'defensive',
        sortOrder: 9,
      },
      {
        name: 'Discipline',
        slug: 'discipline',
        description: 'Grenade cooldown',
        category: 'ability',
        sortOrder: 10,
      },
      {
        name: 'Intellect',
        slug: 'intellect',
        description: 'Super ability cooldown',
        category: 'ability',
        sortOrder: 11,
      },
      {
        name: 'Strength',
        slug: 'strength',
        description: 'Melee ability cooldown',
        category: 'ability',
        sortOrder: 12,
      },
    ];

    const insertedStats = await db.insert(stats).values(statData).returning();
    console.log(`✅ Inserted ${insertedStats.length} stats`);

    console.log('🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed().catch((error) => {
  console.error('❌ Seed script failed:', error);
  process.exit(1);
});