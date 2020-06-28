import RequestHandler from './RequestHandler';
import { TPokeDetail } from '../components/PokeList/PokeDetailWrapper/TPokeDetail';

type Species = {
    evolution_chain:{url: string}
}

export default class APIPokemon{
    static baseUrl = 'https://pokeapi.co/api/v2';

    static async getSpecies(pokemon: TPokeDetail) {
        return await RequestHandler.get(pokemon.species.url);
    }

    static async getEvolutionChain(species: Species) {
        return await RequestHandler.get(species.evolution_chain.url);
    }

    static async getList() {
        const res = await RequestHandler.get(`${this.baseUrl}/pokemon`);
        console.log(res);
        return res;
    }

    static async getOne(name:string) {
        const res = await RequestHandler.get(`${this.baseUrl}/pokemon/${name}`);

        Object.keys(res.sprites).map((key) => {
            if (res.sprites[key] === null) {
                delete res.sprites[key];
            }
        })

        return res;
    }

    static async getEvolutions(id: number) {
        const res = await RequestHandler.get(this.baseUrl + '/evolution-chain/' + id);
        return res;
    }
}