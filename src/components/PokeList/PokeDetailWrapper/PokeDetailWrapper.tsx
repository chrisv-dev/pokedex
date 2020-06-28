import React from 'react';
// import styles from './PokeDetailWrapper.module.css';
import APIPokemon from '../../../API/APIPokemon';
import PokeDetail from './PokeDetail/PokeDetail';
import {TPokeDetail} from './TPokeDetail';

type Props = {
    match:{params:{name:string}}
}
type State = {
    details: TPokeDetail,
    loaded: boolean
}

class PokeDetailWrapper extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            details: {
                name: '',
                order: 0,
                sprites:{},
                types: [],
                abilities: [],
                stats: [],
                moves: [],
                evolutions: { chain: { species: { name: '' }, evolves_to: [] } },
                species: {name: '', url: ''}
            },
            loaded: false
        };
    }

    async componentDidMount() {
        const name = this.props.match.params.name;
        let pokemon = await APIPokemon.getOne(name);
        const species = await APIPokemon.getSpecies(pokemon);
        pokemon.evolutions = await APIPokemon.getEvolutionChain(species);
        
        this.setState({details:pokemon, loaded:true});
    }

    render() {
        const { details } = this.state;
        return (
            this.state.loaded?
                < PokeDetail
                {...details}
                    />
                    :null
        );
    }
}
export default PokeDetailWrapper;