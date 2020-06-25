export type Evolution = {
    species: { name: string },
    evolves_to:Evolution[]
}

export type TPokeDetail = {
    name: string,
    order: number,
    sprites: {[key:string]: string},
    types: { type: { name: string } }[],
    abilities: { ability: { name: string } }[],
    stats: { base_stat: number, effort: number, stat: { name: string } }[],
    moves: { move: { name: string } }[],
    evolutions: { chain: Evolution }
};