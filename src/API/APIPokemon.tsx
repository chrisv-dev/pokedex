import RequestHandler from './RequestHandler';

export default class APIPokemon{
    static baseUrl = 'https://pokeapi.co/api/v2';

    static async getList(){
        const res = await RequestHandler.get(this.baseUrl + '/pokemon');
        console.log(res);
        return res;
    }

    static async getOne(url:string) {
        const res = await RequestHandler.get(url);

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