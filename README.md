# Mugen Craft
![ogp_5](https://github.com/0xbaratie/MugenCraft/assets/8872443/d48e34da-804c-4507-9099-aff823b74f76)

Mugen Craft is an endless crafting onchain game that allows players to create, craft, and mint recipes. Join the game now at https://mugencraft.vercel.app/.


## Specifications

### Main system
1. Combine a recipe with another recipe
2. If already combined, the recipe is automatically generated
3. If it is a new combination, you can define the recipe
4. Each recipe can be minted unlimitedly 

### Point system
Earn points based on your actions! 
- Minting a Recipe: You'll earn 400 points when you mint a recipe.
- Creating a Recipe: You'll earn 200 points when you define a new recipe.
- Recipe Minting: Each time someone mints your recipe, you'll receive 100 points, with no limit on the number of mints.
- Recipe Assistance: If your recipe is used in the creation of another recipe, and that recipe gets minted, you'll earn 50 points.

## Get Started

```
cd frontNext
cp .env.sample .env
```

```
bun install
bun dev
```

## Tech stack
- Vercel KV (https://vercel.com/docs/storage/vercel-kv )
- Base (https://base.org/ )
- React flow (https://reactflow.dev/ )

## Great reference
Our work is inspired by the wonderful games.

- https://foodformer.com/ 
- https://neal.fun/infinite-craft/
